import {mkdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

// Fetch a single recipe for this generated video. Do not vendor the library in this skill.
const revision = 'a0c6e7bbf603a0a46588e37c6c6a4d0af3290d52';
const base = `https://raw.githubusercontent.com/Jakubantalik/transitions.dev/${revision}`;
async function get(path) {
  const response = await fetch(`${base}/${path}`, {signal: AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
}
const recipe = await get('skills/transitions-dev/04-text-states-swap.md');
const license = await get('LICENSE');
const values = Object.fromEntries([...recipe.matchAll(/--text-swap-([a-z-]+):\s*([^;\n]+);/g)].map(m=>[m[1],m[2].trim()]));
const unit = (name, suffix) => {
  const value = values[name];
  if (!value || !new RegExp(`^\\d+(?:\\.\\d+)?${suffix}$`).test(value)) throw new Error(`Unexpected upstream token ${name}: ${value}`);
  return parseFloat(value);
};
if (values.ease !== 'ease-in-out') throw new Error('Upstream easing changed: review before adapting.');
mkdirSync('.cache/transitions-dev', {recursive:true});
writeFileSync('.cache/transitions-dev/text-states-swap.md', recipe);
writeFileSync('.cache/transitions-dev/LICENSE', license);
const source = `${base}/skills/transitions-dev/04-text-states-swap.md`;
writeFileSync('src/motion.json', JSON.stringify({source, durationMs:unit('dur','ms'), distance:unit('translate-y','px'), blur:unit('blur','px'), easing:[0.42,0,0.58,1]}, null, 2)+'\n');
writeFileSync('.cache/transitions-dev/receipt.json', JSON.stringify({source, revision, sha256:createHash('sha256').update(recipe).digest('hex')},null,2)+'\n');
writeFileSync('TRANSITIONS-NOTICE.txt', `This video uses motion timing adapted from the transitions.dev text-state swap recipe.\nSource: ${source}\nRecipe and licence: .cache/transitions-dev/\nThe upstream transitions library has its own terms: https://transitions.dev/terms.html\nIt is not distributed under this project's MIT licence.\n`);
console.log('Fetched the pinned text-state swap recipe and adopted its timing in src/motion.json.');
