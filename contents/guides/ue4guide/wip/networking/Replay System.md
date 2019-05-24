---
sortIndex: 15
---

<https://udn.unrealengine.com/questions/403084/some-guidance-on-the-replay-system.html>

<https://udn.unrealengine.com/questions/395835/replay-playback-stuck-at-origin.html>

<https://udn.unrealengine.com/questions/320000/im-looking-at-the-fhttpnetworkreplaystreamer-class.html>

<https://udn.unrealengine.com/questions/400129/in-memory-replay.html>

<https://udn.unrealengine.com/questions/332388/getting-an-instant-replay-in-a-network-game.html>

<https://udn.unrealengine.com/questions/379831/cant-get-replay-to-work-in-415.html>


## Duplicating Levels:

<https://udn.unrealengine.com/questions/417480/finmemorynetworkreplaystreamer-killcam.html>

Yes, this is likely a known issue. <https://issues.unrealengine.com/issue/UE-48320>

The ticket doesn't elaborate heavily, but it comes down to how we manage level collections. Basically, if you try to start / stop / playback recording at certain times the underlying NetDriver may get switched out from underneath you.


###### How can I stay connected with the same controller?

We did this for Paragon, and also UT.

Generally speaking, the process looks like this.

1. Determine you need to do a replay.

1. Create a duplicate LevelCollection with appropriate levels (see UWorld::DuplicateRequestedLevels)

1. Set the LevelPrefixOverride (passed in as a URL / Additional option to PlayReplay).

1. Detect once the replay has actually begin (via a PostLoadMap).

1. Grab the demo time, and track it.

   The comments imply TimeBufferHintSeconds determines how long the replay will be

Actually, that has nothing to do with how long the replay is. It's to help limit memory usage. In other ReplayStreamers, we just read the data directly from disk and don't keep anything in persistent memory (except for some buffered up packets).

However, the memory streamer will try to keep things loaded up. The problem is that currently checkpoints store basically the entire state of the game, and so they get quite large. The TimeBufferHintSeconds helps us by allowing us to throw away checkpoints that may be unnecessary and instead rely on streaming data directly for the replay.

###### Is this a bug? Is there a better way to teleport instantly without interpolating position in the first place?

How are you Teleporting? There are explicit Teleport functions on AActor (TeleportTo) that should play nice with movement components. When it detects a teleport (via TeleportSucceeded) the Character Movement Component code should detect this and set the mode appropriately. I would expect that to work in replays.

*Reference From <https://udn.unrealengine.com/questions/417480/finmemorynetworkreplaystreamer-killcam.html>*