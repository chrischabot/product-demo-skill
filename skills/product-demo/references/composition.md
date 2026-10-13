# Building beyond the starter

Edit `src/story.ts` for ordered shots, durations in frames, media paths, camera moves, colours and dimensions. Recordings and images live in `public/`; Remotion resolves them through `staticFile`. The starter is deliberately small: replace or add React scenes when the story calls for charts, diagrams, a presentation or an Anatomy figure.

The included Snapcn `TextReveal` and `ScreenRecording` are pinned upstream source, with their MIT notice. Their import path points to a bundled theme module; the font resolver uses local fonts instead of making six Google Fonts requests at render time. Inter is installed through `@fontsource/inter` and packaged by Webpack. Load any alternative font locally before measuring text.

For other shots, read the [Snapcn index](snapcn/components/index.md) and the matching component reference. Confirm the live registry name before installing. See [Snapcn installation](https://snapcn.dev/docs/getting-started/installation). The source belongs in the video project, not the application being demonstrated unless that application actually needs it.

Presentation scenes should make one point at a time. Draw charts from supplied data; keep scales and units explicit. For explainers, alternate a mechanism and the consequence it explains instead of filling a timeline with title cards. Keep technical claims tied to source material.

For narration, stage the actual audio first, probe its duration and budget shots around it. `story.narration` accepts a path in `public/`; it plays across the film. Add timed captions from the actual words and timestamps, using Snapcn's word/karaoke captions or Remotion captions. Do not pretend approximate script timings are transcription. Use supplied or licensed audio and check the mix through playback; silence is a valid default.

The starter letterboxes its design safely when the aspect changes. A polished vertical or square deliverable should reframe the layout, captions and product crop for that aspect rather than merely shrinking the landscape design. Render and inspect every requested variant.

The verification script uses FFmpeg/ffprobe to decode the entire output, check its duration and dimensions, and create a nine-frame contact sheet. This catches broken files, not every visual defect: manually inspect key actions, scene boundaries, small text, branding and audio. Keep the editable project and lockfile with the final media.
