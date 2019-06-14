---
sortIndex: 4
---

# Questions

- What's the networking architecture?
  - How do you do rollback? Rollforth? How do you implement that in abilities?
  - Are only locally predicted cues predicted?
- Has it been used in melee combat setting?
  - How would you implement input buffering? Cancelling? Waiting for server to ack/nack hold down button & charge?

# BBR Specific

For rollback/rollforth:

- C:\\ikrima\\src\\knl\\Bebylon\\UnrealEngine\\Engine\\Source\\Runtime\\MovieScene\\Public\\MovieSceneTimeController.h

- TSharedPtr<FMovieSceneTimeController> TimeController; on level sequence

- UTimecodeProvider

- FMovieSceneTimeController

- PlaybackSettings.TimeController,

- FMovieSceneTimeController,

- FMovieSceneTimeController_AudioClock

- FMovieSceneTimeController_PlatformClock

- FMovieSceneTimeController_Tick

- FMovieSceneTimeController_FrameStep

- UAutomatedLevelSequenceCapture::FMovieSceneTimeController_FrameStep

- class TIMEMANAGEMENT_API UFixedFrameRateCustomTimeStep : public UEngineCustomTimeStep

  UMovieScene::EUpdateClockSource ClockSource;
  MovieScene->GetTickResolution();
  MovieScene->GetDisplayRate();
  PlayPosition.SetTimeBase(DisplayRate, TickResolution, EvaluationType);

      {
        // Set up the default frame range from the sequence's play range
        TRange<FFrameNumber> PlaybackRange   = MovieScene->GetPlaybackRange();

        const FFrameNumber SrcStartFrame = MovieScene::DiscreteInclusiveLower(PlaybackRange);
        const FFrameNumber SrcEndFrame   = MovieScene::DiscreteExclusiveUpper(PlaybackRange);

        const FFrameNumber StartingFrame = ConvertFrameTime(SrcStartFrame, TickResolution, DisplayRate).FloorToFrame();
        const FFrameNumber EndingFrame   = ConvertFrameTime(SrcEndFrame,   TickResolution, DisplayRate).FloorToFrame();

        SetFrameRange(StartingFrame.Value, (EndingFrame - StartingFrame).Value);
      }
