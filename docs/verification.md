# Verification

The October 13, 2026 acceptance run used a fresh scaffold, Node.js 26.8.2, Remotion 4.0.532, local Chrome, and FFmpeg on macOS. These results establish the local rendering path; they do not claim that every optional provider or every Anatomy figure has been tested.

## Observed results

The following checks passed:

| Check | Observed result |
| --- | --- |
| Fresh project installation | `npm ci` completed from the copied lockfile. |
| TypeScript | The starter and the example composition passed `tsc --noEmit`. |
| transitions.dev | The fetcher retrieved the pinned text-state recipe, retained its license, and generated the adapter's input parameters. |
| Default starter | A complete 11.7-second film rendered and decoded. |
| Anatomy figure | Both light and dark dial-indicator pages built from the bundled source. |
| Failed interaction | An intentionally failed assertion returned a nonzero exit and retained the failure in `evidence.json`, including when no frames were produced. |
| Real interaction | The recorder pressed Home, End, and Home, asserting readouts of 18 px, 10 px, and 18 px. No page errors were reported. |
| Combined film | The resulting recording rendered inside Snapcn `ScreenRecording` between title scenes. Output: 456 frames, 30 frames per second, 1,920 × 1,080 pixels, 15.2 seconds, H.264. |
| Artifact verification | FFmpeg decoded the complete file; ffprobe confirmed dimensions and duration. The contact sheet and full-size mechanism frame were inspected. |
| Anatomy regression checks | Six projection checks, eight capture-geometry checks, and four React readout checks passed. |
| Fabric package format | Fabric's actual normalizer and validator accepted the two-skill source package. |

The example is deliberately a demonstration of the video toolchain using an upstream Anatomy figure. It is not footage of Fabric or evidence for an unrelated product change. The capture is silent.

## Reproduce the example

Start from a checkout of this repository. In the first terminal, build and serve the Anatomy page:

```bash
node skills/anatomy/examples/dial-indicator/build.mjs --light
python3 -m http.server 4319 --bind 127.0.0.1 \
  --directory skills/anatomy/examples/dial-indicator
```

In a second terminal, create the video project. The following commands assume the current directory is the repository root:

```bash
node skills/product-demo/scripts/scaffold.mjs /tmp/anatomy-video
cp examples/anatomy-video/journey.mjs /tmp/anatomy-video/journey.mjs
cp examples/anatomy-video/story.ts /tmp/anatomy-video/src/story.ts
cd /tmp/anatomy-video
npm ci
npx playwright install chromium
npm run capture -- \
  http://127.0.0.1:4319/dial-indicator-light.html journey.mjs public/anatomy
npm run transition
npm run typecheck
npm run render
npm run verify
```

Open the contact sheet and play the video. Stop the local server when finished. If you use an existing Chromium binary, set `CHROME_PATH`; Playwright's recording support also needs its FFmpeg binary, installed with `npx playwright install ffmpeg`.

For the checked-in acceptance artifacts, see the [video](assets/anatomy-demo.mp4), [contact sheet](assets/anatomy-contact-sheet.jpg), [render metadata](assets/render.json), and [capture evidence](assets/capture-evidence.json). The capture evidence records approximate wall-clock offsets; use the footage itself for precise edits.

Anatomy's React regression test needs the consumer project's React, ReactDOM, and esbuild dependencies. The acceptance run supplied them from the video project's dependency directory. They are not prerequisites for building the framework-independent example.
