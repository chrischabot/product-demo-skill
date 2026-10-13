import {cpSync, existsSync, mkdirSync, readdirSync} from 'node:fs';
import {resolve, dirname, join, basename} from 'node:path';
import {fileURLToPath} from 'node:url';
const target = process.argv[2];
if (!target) throw new Error('Usage: node scaffold.mjs <new-video-directory>');
const out = resolve(target);
if (existsSync(out) && readdirSync(out).length) throw new Error(`Refusing nonempty destination: ${out}`);
mkdirSync(out, {recursive: true});
cpSync(join(dirname(fileURLToPath(import.meta.url)), '../assets/starter'), out, {
  recursive: true,
  filter: source => !['node_modules', 'out', '.cache', '.DS_Store'].includes(basename(source)),
});
console.log(`Created ${out}\nNext: npm ci, then edit src/story.ts and run npm run render && npm run verify.`);
