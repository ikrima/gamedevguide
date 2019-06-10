---
sortIndex: 3
---

Look at

- DumpFrame(int64 Frame)

- DumpHistoryFrame(Stats, Latest, DumpCull, MaxDepth, \*NameFilter);

- DumpCPUSummary()

- GetPermanentStats()

Detailed UDN Answer:

- <https://udn.unrealengine.com/questions/302333/accessing-stat-values-in-c.html>

Well, you will have to do a bit of threading work. This is a good thing if you plan on doing "a bit of analysis" because this tends to be a firehose of data.

GetPermanentStats() is an example of a synchronous call. It sends something to the stats thread and then waits to get the results back. That is one way to do it, but it will be slow if you need to do it every frame.

You can use the same approach and just not block for the results; this is what DirectStatsCommand usually does.

For example, one simple command is "stat dumpcu". That ends up calling this on the stats thread:

```cpp
StatsMasterEnableAdd(); // make sure we are collecting data

DumpCPUDelegateHandle = Stats.NewFrameDelegate.AddStatic(&DumpCPU);
```

And that registers a call back on the stats thread so whenever a frame happens, you are informed. This is a fairly simple command, which does this on every frame....which turns out to be only one frame:

```cpp
 static void DumpCPU(int64 Frame)

 {

 FStatsThreadState& Stats = FStatsThreadState::GetLocalState();

 int64 Latest = Stats.GetLatestValidFrame();

 check(Latest > 0);

 DumpCPUSummary(Stats, Latest);

 Stats.NewFrameDelegate.Remove(DumpCPUDelegateHandle); // don't listen any more

 StatsMasterEnableSubtract(); // don't keep recording stats (unless someone else is looking)

 }
```

Actually parsing the stats is fairly complicated, but there are lots of examples in this file. You might have to ask questions about what specifically you would like to do.

If you need to get your data back to the game thread (as opposed to just logging some stuff), then send a task back to the game thread like the "HUD stats" do:

```cpp
FSimpleDelegateGraphTask::CreateAndDispatchWhenReady

 (

 FSimpleDelegateGraphTask::FDelegate::CreateRaw(&FHUDGroupGameThreadRenderer::Get(), &FHUDGroupGameThreadRenderer::NewData, ToGame),

 GET_STATID(STAT_FSimpleDelegateGraphTask_StatsHierToGame), nullptr, ENamedThreads::GameThread

 );
```

Depending on what you want to do, it might be easier to just hack the hud stats to display what you want instead setting up a different display from scratch.

Let me know if you need more help on this. It is tedious and hard to understand, but you should be able to do anything you like.

\-Gil

*Reference From <https://udn.unrealengine.com/questions/302333/accessing-stat-values-in-c.html>*

The description is part of the stat declaration:

1. DECLARE_CYCLE_STAT(TEXT("Step: steering"), STAT_AI_Crowd_StepSteeringTime, STATGROUP_AICrowd);

1. TEXT("Step: steering") is the description and all stat types have them. This is Item.NameAndInfo.GetDescription().

Another potential way to find what you are looking for is to put that stuff in a special (hardcoded) group....that is STATGROUP_AICrowd. Item.NameAndInfo.GetGroupName().

And you can also look at the short name of the stat: STAT_AI_Crowd_StepSteeringTime. Item.NameAndInfo.GetShortName().

The "RawName" is an FName that encodes all of these things, which is why you don't see it in the AddMessage stuff. FStatId is just the raw name with some other junk encoded in there. This complexity is related to making stat messages small and fast.

In all cases, realize that you may be filtering quite a lot of data and string operations could be slow.

DECLARE*FNAME_STAT is something it looks like we use in only one place. That is a stat type that has a FName as the \_payload* (in all other cases it is a number). If you just need a string and no other payload, this might be a winner.

*Reference From <https://udn.unrealengine.com/questions/302333/accessing-stat-values-in-c.html>*
