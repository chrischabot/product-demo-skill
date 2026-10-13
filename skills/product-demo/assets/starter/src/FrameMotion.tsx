import type {CSSProperties} from 'react';
import {Easing, interpolate} from 'remotion';

// Original seek-safe adapter. Recipe values are inputs, not a bundled transition library.
export type Motion = {durationMs: number; distance: number; blur: number; easing: [number, number, number, number]};
export function motionStyle(frame: number, fps: number, motion: Motion, direction: 'enter' | 'exit' = 'enter'): CSSProperties {
  const duration = Math.max(1, Math.round(motion.durationMs * fps / 1000));
  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(...motion.easing),
  });
  const hidden = direction === 'enter' ? 1 - progress : progress;
  return {opacity: 1 - hidden, transform: `translateY(${hidden * motion.distance * (direction === 'enter' ? 1 : -1)}px)`, filter: `blur(${hidden * motion.blur}px)`};
}
