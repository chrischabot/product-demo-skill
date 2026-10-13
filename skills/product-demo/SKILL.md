---
name: product-demo
description: Create a finished product video, demo, feature walkthrough, change-review video, presentation or technical explainer from a working project, screenshots, recordings or a brief. Use for requests such as “show off the project”, “create a product video”, “make these changes and show me a video”, or “show the issue fix in a video”. Capture real behavior, compose with Snapcn and Remotion, add transitions.dev motion, and use Anatomy when a mechanism needs explaining. Deliver a playable video and editable source.
license: MIT
---

# Product demo

Turn the requested story into a rendered, inspected video. A storyboard or a Remotion project alone is unfinished when the user asked for a video. Use this workflow for `/product-demo`, `$product-demo`, and ordinary language; no exact keyword is required.

The local workflow needs Node.js 22+, npm, Chromium, FFmpeg and ffprobe. Paid video-provider accounts are optional.

## Choose the story from the request

| Request | What to show |
| --- | --- |
| Show off a product or project | A short promise, a real user journey, and its useful result. Usually 20–45 seconds. |
| Make changes, then show them | Implement and test first; capture each requested change at the resulting revision. |
| Review an issue fix | Reproduction context, the fixed interaction and observable outcome. Show a genuine baseline if available; never reconstruct a failure as evidence. |
| Presentation | A connected argument using the supplied material, with readable charts and deliberate pacing. |
| Explainer | Explain the mechanism with Anatomy or a clear purpose-built visual, then connect it to the real product where relevant. |

Infer duration, aspect and audience from context. Default to 1920×1080, 30 fps, concise on-screen captions and deliberate silence when no voice or music was requested. State meaningful assumptions and start; do not turn routine creative choices into a questionnaire. Preserve an existing video project and its renderer when practical.

## Gather evidence and capture

Read the project, relevant issue/diff and available assets. Run the product and exercise the named journey. If access is available, capture it yourself; do not ask for a recording the agent can make. Read [capture-and-review.md](references/capture-and-review.md) for browser recording and review evidence.

Use actual footage or screenshots as the product plate. Keep authentic labels, values and result states. Scripted replicas belong only in clearly labelled conceptual demonstrations. Do not make a passing video stand in for tests or claim a local recording proves deployment.

Write a small `video-plan.md` beside the video source: viewer and purpose, ordered beats, approximate durations, asset provenance, revision/environment, and what each beat proves. For change reviews, map every requested change to a timestamp and evidence. Record unavailable evidence explicitly.

## Compose and render

Use the included starter to avoid rebuilding a renderer:

```bash
node <skill-dir>/scripts/scaffold.mjs <new-video-directory>
cd <new-video-directory>
npm ci
npx playwright install chromium
# Put approved recordings/images into public/ and edit src/story.ts.
npm run typecheck
npm run render
npm run verify
```

The initializer refuses a nonempty destination. It copies a locked Remotion project, actual MIT Snapcn components, an original frame-driven motion adapter, and capture/verification tools. The initial composition is explicitly a renderer demonstration; replace its story and source media before calling it a product demo. See [composition.md](references/composition.md) for extension points, narration, captions, charts and aspect variants.

Use Snapcn's catalogue before writing a shot from scratch. [The component index](references/snapcn/components/index.md) routes to the relevant prop reference. Read only the components you need. `text-reveal` and `screen-recording` are already included; add other verified free components through the official registry. Respect Pro access rather than assuming every catalogue entry is free.

For transitions.dev motion, read [motion.md](references/motion.md). Fetch the selected free recipe from upstream into the generated project, retain its terms and attribution, and translate its timing into `frame / fps`. Do not run wall-clock CSS transitions, timers or live spring loops inside a Remotion render. Readability decides where motion belongs: status changes, focus shifts and scene boundaries, not every element.

For a technical mechanism or reusable website illustration, load the sibling `anatomy` skill. Read [anatomy-integration.md](references/anatomy-integration.md) before embedding it in video. Its interactive runtime needs either a real recording or an explicitly seekable frame adapter; mounting an uncontrolled live figure in Remotion is not sufficient.

## Verify and hand over

Render the complete MP4, run `npm run verify`, and **open the resulting contact sheet**. Inspect the key action, each scene and both sides of cuts at full resolution; watch the completed playback, including audio when present. Confirm captions remain readable, important UI is uncropped, pointer emphasis matches footage and there are no missing fonts/assets or black gaps. Fix problems and rerender the affected result.

Deliver the playable MP4, poster/contact sheet, editable source and a concise statement of what was shown and tested. Keep local captures separate from live deployment claims. For reviews, include revision, environment, timestamps and remaining limitations. Include attribution for third-party material.

Do not post a GitHub comment, publish to social media or enable recurring issue monitoring just because a video was requested. An explicit issue-completion workflow can invoke this same skill after the fix and tests, using its already-authorized posting destination. Without that configured workflow, the skill handles the current request only. Read [optional-providers.md](references/optional-providers.md) only when narration, generated footage or another renderer is useful; ordinary product recording and rendering need no provider credentials.
