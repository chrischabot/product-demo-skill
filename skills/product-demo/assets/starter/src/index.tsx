import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import {AbsoluteFill, Audio, Composition, registerRoot, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {TextReveal} from './snapcn/text-reveal';
import {ScreenRecording} from './snapcn/screen-recording';
import {motionStyle, type Motion} from './FrameMotion';
import motion from './motion.json';
import {story, type Shot} from './story';

const duration = story.shots.reduce((sum, shot) => sum + shot.frames, 0) - (story.shots.length - 1) * story.transitionFrames;
if (!story.shots.length || story.shots.some(s => !Number.isInteger(s.frames) || s.frames <= 2 * story.transitionFrames)) throw new Error('Each shot must be longer than its adjacent transitions.');
const recipe = {...motion, easing: motion.easing as Motion['easing']};

function Scene({shot, index}: {shot: Shot; index: number}) {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  // Scale a 1920 × 1080 design together, preserving safe margins in other aspects.
  const scale = Math.min(width / 1920, height / 1080);
  return <AbsoluteFill style={{background: story.background, color: story.foreground, fontFamily: 'Inter', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{position: 'relative', width: 1920, height: 1080, flexShrink: 0, transform: `scale(${scale})`}}>
      <div style={{position: 'absolute', top: 64, left: 80, fontSize: 20, letterSpacing: 3, color: story.accent}}>{story.label}</div>
      <div style={{position: 'absolute', top: 64, right: 80, fontSize: 20}}>{String(index + 1).padStart(2, '0')} / {String(story.shots.length).padStart(2, '0')}</div>
      {shot.media ? <>
        <div style={{position: 'absolute', top: 142, left: 80, right: 80, fontSize: 52, fontWeight: 600, letterSpacing: -2, ...motionStyle(frame, fps, recipe)}}>{shot.title}</div>
        <div style={{position: 'absolute', top: 210, left: 320, width: 1280, height: 720, borderRadius: 18, overflow: 'hidden', boxShadow: '0 20px 70px #202a3220'}}>
          <ScreenRecording src={staticFile(shot.media)} sourceAspect={shot.sourceAspect} trimBefore={shot.trimBefore ?? 0} crop={shot.crop} fit="contain" entrance="none" camera={shot.camera ?? []} backdropColor={story.background} />
        </div>
      </> : <div style={{position: 'absolute', top: 300, left: 80, width: 1760, height: 430}}>
        <TextReveal text={shot.title} fontSize={68} fontFamily="Inter" initialScale={1.35} mode="light" theme={{background: story.background, foreground: story.foreground}} />
      </div>}
      <div style={{position: 'absolute', bottom: 72, left: 80, right: 80, fontSize: 27, lineHeight: 1.5, ...motionStyle(frame - 12, fps, recipe)}}>{shot.caption}</div>
    </div>
  </AbsoluteFill>;
}

function Film() {
  return <AbsoluteFill>
    <TransitionSeries>{story.shots.flatMap((shot, index) => [
      ...(index ? [<TransitionSeries.Transition key={`t${index}`} presentation={fade()} timing={linearTiming({durationInFrames: story.transitionFrames})} />] : []),
      <TransitionSeries.Sequence key={index} durationInFrames={shot.frames}><Scene shot={shot} index={index} /></TransitionSeries.Sequence>,
    ])}</TransitionSeries>
    {story.narration && <Audio src={staticFile(story.narration)} />}
  </AbsoluteFill>;
}
registerRoot(() => <Composition id="ProductDemo" component={Film} durationInFrames={duration} fps={story.fps} width={story.width} height={story.height} />);
