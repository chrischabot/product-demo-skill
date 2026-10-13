# Real capture and review evidence

Use the user's working project and existing authorization. Inspect the route, test fixtures and selectors before scripting. Prefer a dedicated test account and synthetic data. Keep authentication state outside the source tree and video output; never commit tokens, passwords or browser profiles. The renderer should use staged local media, not fetch private application pages.

The starter includes Playwright as a **capture dependency**, independent of the user's everyday browser. In a Fabric sandbox, install Chromium with `npx playwright install chromium`; Linux may also need `npx playwright install --with-deps chromium` if package installation is allowed. `CHROME_PATH` can name an existing compatible Chromium binary. Use an existing authenticated browser tool when the environment requires it, then export the resulting media into `public/`.

Create a journey module based on the actual application:

```js
import assert from 'node:assert/strict';
export default async function({page, record, hold}) {
  await page.getByRole('heading', {name: 'Inbox'}).waitFor();
  await record('Inbox loaded');
  await hold(1200);
  await page.getByRole('button', {name: 'New message'}).click();
  await page.getByLabel('Message').fill('A harmless demonstration message');
  await page.getByRole('button', {name: 'Send'}).click();
  await page.getByText('A harmless demonstration message', {exact:true}).waitFor();
  assert.equal(await page.getByRole('status').innerText(), 'Sent');
  await record('Message appears with the Sent status');
  await hold(2200);
}
```

These selectors are illustrative, not a claim about the target UI. Sending a message is a mutation: use a local fixture or an authorized test destination. Use read-only journeys otherwise.

```bash
npm run capture -- http://127.0.0.1:3000 journey.mjs public/message-stream
```

Capture writes a playable WebM, per-step PNGs and `evidence.json`. Its timestamps are approximate browser wall-clock offsets, useful for editing but not guaranteed frame alignment. Inspect the actual footage before trimming; trim navigation/loading frames. Use `CAPTURE_STORAGE_STATE=/private/path/auth.json` only if needed. The helper reads it without copying it into the output.

For a fix video, retain the issue identifier, tested revision, environment, commands/test results and each acceptance criterion. Capture the baseline only if already available or safely reproducible without disturbing another checkout. Label a missing baseline plainly. Do not invent “before” footage. A review handoff should say, for example, “00:07–00:13: retry preserves the typed message; local revision abc123; retry interaction test passed.”

A standing issue workflow needs a real configured trigger. Put “after implementing and validating the fix, invoke product-demo and attach the video to the authorized review destination” into that workflow when requested. Merely installing this skill does not create a GitHub webhook or watch issues.
