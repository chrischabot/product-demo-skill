import {chromium} from 'playwright';
import {mkdirSync, writeFileSync, existsSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {pathToFileURL} from 'node:url';

const [url, journeyFile, output = 'public/capture'] = process.argv.slice(2);
if (!url || !journeyFile) throw new Error('Usage: npm run capture -- <url> <journey.mjs> [new-output-directory]');
if (!/^https?:\/\//.test(url)) throw new Error('Serve the target over HTTP(S).');
const dir = resolve(output);
if (existsSync(dir)) throw new Error(`Refusing to overwrite capture directory: ${dir}`);
mkdirSync(dir, {recursive:true});
const journey = await import(pathToFileURL(resolve(journeyFile)).href);
if (typeof journey.default !== 'function') throw new Error('Journey must export default async function({page, record, hold}).');
const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
const errors = [];
const evidence = [];
let context;
let start;
let video;
let passed = false;
try {
  context = await browser.newContext({viewport:{width:1600,height:900}, deviceScaleFactor:1, recordVideo:{dir, size:{width:1600,height:900}}, ...(process.env.CAPTURE_STORAGE_STATE ? {storageState:process.env.CAPTURE_STORAGE_STATE} : {})});
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);
  video = page.video();
  page.on('pageerror', e=>errors.push(e.message));
  start = Date.now();
  await page.goto(url, {waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  let timer;
  try { await Promise.race([journey.default({page,
    record: async (label) => {const seconds=(Date.now()-start)/1000; const image=`step-${evidence.length+1}.png`; await page.screenshot({path:join(dir,image)}); evidence.push({label,seconds,image});},
    // Pacing is for footage, never the condition used to prove success.
    hold: async (ms) => {if (!Number.isFinite(ms)||ms<0||ms>30000) throw new Error('Hold must be 0–30000ms'); await page.waitForTimeout(ms);},
  }), new Promise((_, reject) => {timer = setTimeout(() => reject(new Error('Journey exceeded 120 seconds')), 120000);})]); }
  finally { clearTimeout(timer); }
  if (!evidence.length) throw new Error('Journey produced no evidence. Assert outcomes and call record(label).');
  if (errors.length) throw new Error(`Browser errors: ${errors.join('; ')}`);
  passed = true;
} finally {
  try {
    if (context) await context.close();
    if (video) await video.saveAs(join(dir,'recording.webm'));
  } finally { await browser.close(); }
  // Strip query and fragment; they may contain session-specific data.
  const safeUrl = new URL(url); safeUrl.search=''; safeUrl.hash=''; safeUrl.username=''; safeUrl.password='';
  writeFileSync(join(dir,'evidence.json'), JSON.stringify({url:safeUrl.href,passed,recording:'recording.webm',viewport:{width:1600,height:900},seconds:start?(Date.now()-start)/1000:0,steps:evidence,errors},null,2)+'\n');
}
console.log(`Captured and verified ${dir}/recording.webm`);
