# Anatomy for websites and video

Load the sibling `anatomy/SKILL.md` when inventing an explanatory mechanism. This repository includes its complete source kit, scripts, reference material and eight examples under its original MIT licence. Generated example HTML is excluded because it is rebuilt from those sources.

For an existing collection figure in a website, the publisher also offers [`anatomy-figures`](https://skills.wheresryan.sh/anatomy/collection). Install it in that website and import the specific figure:

```tsx
import {Watch} from 'anatomy-figures';
import Turbofan from 'anatomy-figures/turbofan';
export function Mechanism() {
  return <Watch theme="paper" tokens={{'--anatomy-lit':'#cd5738'}} />;
}
```

Use the upstream skill to create a new figure tailored to the concept; use the package to reuse a published one. Neither requires Remotion for normal website use. Check the installed package's actual exports and prop types before choosing a figure. Preserve keyboard interaction and reduced motion, and verify at phone and desktop sizes.

For video, choose between two valid paths:

1. **Record the working figure.** Build/serve it, script a meaningful keyboard/pointer journey with observable readout assertions, capture to WebM, then compose the clip with Snapcn `ScreenRecording`. This preserves the actual behavior and works with the existing collection and WebGL figures.
2. **Expose a deterministic renderer.** Separate the pure model and drawing from the live `requestAnimationFrame` runtime. Feed `time = frame / fps` plus a scripted input schedule; compute every readout from that same model. Precompute fixed-step simulation if needed, seed randomness, and verify seeking forward, backward and directly to the same frame produces identical output. Canvas/WebGL rendering must signal completion before Remotion captures the frame.

Do not put an uncontrolled Anatomy `useLoop`, timer or live iframe into a Remotion composition and assume it animates correctly. A still export is suitable for a still beat; label it accordingly. A recording is generally the fastest reliable integration.

Smoke-test the kit without authoring a new figure:

```bash
node <anatomy-dir>/examples/dial-indicator/build.mjs --light
node <anatomy-dir>/examples/dial-indicator/build.mjs
```

Serve the resulting directory, focus `[tabindex="0"]`, and press Home/End. The readout changes between the 18 and 10 px gauge blocks. Verify that behavior before using the capture in a demo. The upstream Anatomy verification tools and their prerequisites are documented in its `references/verify.md`.
