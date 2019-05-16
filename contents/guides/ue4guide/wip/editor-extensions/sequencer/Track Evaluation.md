    sortIndex: 4

MovieScenePlayer:

- PlayToFrame

Low-level call to set the current time of the player by evaluating from the current time to the specified time, as if the sequence is playing.

- Triggers events that lie within the evaluated range. Does not alter the persistent playback status of the player (IsPlaying).


- ScrubToFrame

Low-level call to set the current time of the player by evaluating only the specified time. Will not trigger any events.

- Does not alter the persistent playback status of the player (IsPlaying).


- JumpToFrame

Low-level call to set the current time of the player by evaluating only the specified time, as if scrubbing the timeline. Will trigger only events that exist at the specified time.

- Does not alter the persistent playback status of the player (IsPlaying).

THIS IS WHERE YOU SPECIFY WHAT HAPPENS BETWEEN SEGMENTS (ie force evaluation in empty sections, blending, etc)

```cpp
- virtual FMovieSceneTrackRowSegmentBlenderPtr GetRowSegmentBlender() const;

- virtual FMovieSceneTrackSegmentBlenderPtr GetTrackSegmentBlender() const;
```
