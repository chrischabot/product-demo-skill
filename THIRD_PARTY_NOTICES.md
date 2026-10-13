# Third-party notices

This repository preserves the following source attributions. Exact revisions are in [sources.json](sources.json).

## Anatomy

`skills/anatomy` comes from [wheresryan22/anatomy](https://github.com/wheresryan22/anatomy), under the [upstream MIT license](skills/anatomy/LICENSE). The skill, kit, scripts, references, examples, tests, and evaluation cases retain their source content, apart from whitespace normalization in three files. Prebuilt example HTML and repository promotional assets are omitted; build scripts recreate the HTML. The video integration documentation is original to this repository.

## Snapcn

`skills/product-demo/references/snapcn` and the starter's `src/snapcn` files come from [shadcn-labs/snapcn](https://github.com/shadcn-labs/snapcn), copyright 2026 Sri Nath, under the [upstream MIT license](skills/product-demo/references/snapcn/LICENSE).

The starter includes `text-reveal/index.tsx`, `screen-recording/index.tsx`, and `snap-cn-ui/core/theme.ts`. Component imports point to the colocated theme module. An original minimal font resolver replaces the barrel's external Google Fonts loading; the composition bundles Inter locally. These are the only source adaptations at initial publication. The workflow uses Snapcn's product-demo guidance as a foundation, with independent capture, review, and Anatomy integration instructions.

## External dependencies

The transitions.dev library and skills are not redistributed in this repository. The generated-project fetcher downloads one recipe and its license from a pinned publisher revision, records provenance, and derives parameters for an original deterministic adapter. Its [license and terms](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE) apply to that downloaded material; this repository's MIT license does not replace them.

Remotion packages have their own [license terms](https://www.remotion.dev/docs/license). React, Playwright, TypeScript, and Inter also retain their package licenses. Installations resolve runtime dependencies through the checked-in lockfile. The repository does not grant rights to footage, logos, music, voices, or fonts supplied by a project.

HyperFrames and the 101-skills AI video generation workflow were evaluated and linked. Their code and skills are not bundled.
