export type Shot = {
  title: string;
  caption: string;
  frames: number;
  media?: string;
  sourceAspect?: number;
  trimBefore?: number;
  crop?: {top?: number; right?: number; bottom?: number; left?: number};
  camera?: {at: number; duration?: number; zoom?: number; x?: number; y?: number}[];
};

// This is a renderer demonstration, not evidence of any product's behavior.
// Media paths are relative to public/. Replace this story with your actual captures.
export const story = {
  title: 'Show the working product',
  label: 'PRODUCT DEMO · RENDERER EXAMPLE',
  width: 1920,
  height: 1080,
  fps: 30,
  transitionFrames: 12,
  background: '#f3f1ea',
  foreground: '#202a32',
  accent: '#cd5738',
  narration: undefined as string | undefined,
  shots: [
    {title: 'Start with the real thing', caption: 'Capture the interaction that matters.', frames: 105},
    {title: 'Explain what changes', caption: 'Use actual footage, then make the result easy to see.', frames: 150},
    {title: 'Give reviewers the evidence', caption: 'A playable film, editable source and a clear account of what was tested.', frames: 120},
  ] satisfies Shot[],
};
