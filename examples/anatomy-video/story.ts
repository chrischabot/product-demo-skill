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
  title: 'Anatomy in a product video',
  label: 'ANATOMY × PRODUCT DEMO',
  width: 1920,
  height: 1080,
  fps: 30,
  transitionFrames: 12,
  background: '#f3f1ea',
  foreground: '#202a32',
  accent: '#cd5738',
  narration: undefined as string | undefined,
  shots: [
    {title: 'Explain it in motion', caption: 'A working Anatomy figure, captured and composed with Snapcn.', frames: 105},
    {title: 'The mechanism is the explanation', caption: 'Real keyboard input moves the gauge from 18 px to 10 px and back.', frames: 255, media: 'anatomy/recording.webm', sourceAspect: 1600 / 900, crop: {top: 0.06, bottom: 0.38, left: 0.28, right: 0.28}, camera: []},
    {title: 'Ready for the review', caption: 'Actual interaction. Verified readouts. Editable video source.', frames: 120},
  ] satisfies Shot[],
};
