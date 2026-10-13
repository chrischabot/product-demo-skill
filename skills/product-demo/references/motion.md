# transitions.dev motion in a frame-based renderer

[transitions.dev](https://github.com/Jakubantalik/transitions.dev) is a set of interaction recipes, not a Remotion scene-transition package. Its CSS uses browser time and class changes; video frames may render out of order and in separate browser tabs. Translate the selected recipe into a pure function of the current frame.

The starter's `npm run transition` fetches one pinned free recipe, `04-text-states-swap.md`, directly from its publisher. It saves the original and licence under `.cache/transitions-dev/`, records a SHA-256 receipt, and sets `src/motion.json` from the recipe's duration, displacement, blur and easing. `FrameMotion.tsx` consumes these parameters for enter/exit styles. The starter uses the entrance phase on headings and captions; for a genuine text-state swap, sequence the outgoing and incoming states with both phases and their respective text.

To adapt another recipe, open the upstream skill's index and fetch the exact named recipe. Preserve the selected recipe's attribution and terms with the generated video source. Free recipes need no account; Pro recipes need the user's applicable access. This MIT repository deliberately does not bundle the transitions library or its skills.

Map milliseconds to frames as `round(milliseconds * fps / 1000)`. CSS `ease-in-out` maps to cubic Bézier `[0.42, 0, 0.58, 1]`. Derive opacity, translation, scale, blur and clip geometry from progress. Preserve the direction and meaning of the interaction; do not apply a menu-opening overshoot to a chart value simply because it looks lively. For recordings, preserve the app's native transitions inside the footage.

Remotion's `TransitionSeries` handles scene overlap. Total frames equal the sum of scene frames minus transition frames. Each scene must outlast its adjacent overlaps. Inspect the middle of the overlap as well as the settled frames. For an interactive web version, retain upstream reduced-motion behavior; for video, use a restrained alternate render if requested.
