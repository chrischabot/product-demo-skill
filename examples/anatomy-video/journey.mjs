import assert from 'node:assert/strict';
export default async function({page, record, hold}) {
  const stage=page.locator('[tabindex="0"]');
  await stage.focus();
  await stage.press('Home');
  await page.waitForFunction(()=>document.querySelector('[data-readout]')?.textContent.includes('18.0'));
  assert.match(await page.locator('[data-readout]').innerText(),/18\.0/);
  await record('Home selects the 18 px gauge block');
  await hold(2200);
  await stage.press('End');
  await page.waitForFunction(()=>document.querySelector('[data-readout]')?.textContent.includes('10.0'));
  assert.match(await page.locator('[data-readout]').innerText(),/10\.0/);
  await record('End moves the carriage and needle to the 10 px gauge block');
  await hold(2500);
  await stage.press('Home');
  await page.waitForFunction(()=>document.querySelector('[data-readout]')?.textContent.includes('18.0'));
  await record('Home returns the gauge to 18 px');
  await hold(2500);
}
