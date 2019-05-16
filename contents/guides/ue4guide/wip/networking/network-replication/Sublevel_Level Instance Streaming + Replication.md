**Sublevels aren't directly associated with ULevels. Instead, they are associated with UWorlds**. See UWorld::StreamingLevels.

Because of that, when you load in a Sublevel, there's no way to know what it's Sublevels are (unless you figure out the owning UPackage, load that, grab the UWorld, and then grab the levels).

As far as how this typically works:

1.  When a Client joins a Networked game, it does a bunch of handshaking.

2.  As a part of that, it's told the Level that it should load as the Persistent Level. This actually calls LoadMap and loads it as the World.

3.  Typically, Clients are responsible for managing which levels they will Stream in / out, and just notify the Server via ServerUpdateLevelVisbility.

In the approach above, it's common for the Server to have all sublevels always loaded. Ultimately, how to determine what levels should be streamed in / out is almost always a Game level decision, and the engine just has some tools to help.

While ServerUpdateLevelVisibility notifies the Server of what levels a Client has loaded, if the Server is driving which levels should be loaded, it can use ClientUpdateLevelStreamingStatus. As the name implies, that will cause the Client to change what levels it has streamed in, and to what states. Notice, though, that it's a Unicast RPC, so you'd need to manage that for all clients.

As far as loading in Sublevels of Sublevels, that's not technically supported by the engine, but it can actually be approximated. In that case, you'll need to use something closer to Level Instances. I cover how we approach a similar issue for Fortnite in this thread:

<https://udn.unrealengine.com/questions/399764/load-level-instance-with-replicated-actors.html>

Basically, what you'd do is have some sort of Actor / Manager in each level. This manager would know the names of the sublevels it wanted. This would be something done at Editor Time.

When the Client / Server loads a Sublevel, that Manager would then be responsible for creating instances of ULevelStreaming objects (really, some subobject thereof like ULevelStreamingKismet). Clients would still need to send ServerUpdateLevelVisibility RPCs to the server to Allow / Prevent replication of Actors in those nested Sublevels.

You also need to be careful with naming, making sure that the Server and Client have consistent names for the sublevels without clashing. Also, be careful of circular nested sublevels.

 

*From &lt;<https://udn.unrealengine.com/questions/426339/stream-sublevels-of-a-streamed-level.html>&gt;*

 

 

**Fortnite detailed approach:**

<https://udn.unrealengine.com/questions/399764/load-level-instance-with-replicated-actors.html>

 

**Multiplayer issues with sublevel streaming/toggling visibility:**

 

​	[Level streaming client crash]

​	[Network streaming level visibility, disconnect]

​	There is also an unresolved ticket related to this issue:

​	[Toggling ULevelStreaming::bShouldBeVisible causes replication errors]

 

Level streaming definitely should (and does generally) work with Multiplayer. For example, we use Level Streaming in Fortnite. That said, there are a few important things to note (I'll try not to rehash too much of what was in those tickets).

The biggest issues arise when the Server tries to unload a level that Clients still have streamed in. The Server should trigger APlayerControllerLevelStreamingStatusChanged RPC which should cause the level to Stream Out / Unload. However, the Server will also send close bunches for any replicated actors within that sublevel.

If the level is completely unloaded before the close bunches occur, there's no real problem. The associated actors won't be found and the bunches are effectively ignored. However, if the level isn't completely unloaded (e.g., if it's just changing visibility), what happens is the Actors end up getting destroyed. This isn't a problem for Dynamic actors, but any Static actors (e.g., actors placed in the map) will not get respawned, and you end up in an inconsistent state.

The other problem is that you could still end up in situations where the Server quickly "toggles" level visibility in a few frames, sends multiple RPCs to the client, as well as those close bunches. In that case, what can happen is the client may process the RPCs on the same frame, not change level status at all, but still end up destroying all of those actors.

​	Another important thing to note is that I have not been able to reproduce this issue using level streaming volumes.

Streaming volumes use the same streaming systems underneath. The key differences are that *they* manage when levels stream in and out instead of it being up to game code.

The way the volumes work is by iterating over the available Player Controllers and determining which levels are relevant based on the player viewpoints. As long as one player is within a volume, the level will remain streamed in.

By default, this logic runs on the Server, so what you end up with is a situation where the both the Server and Clients have *every* level loaded that *any* Player has relevant.

This approach generally avoids all of the problems I described above, because (generally) the Server never attempts to unload levels the Client has loaded. I say generally, because there's still technically timing / network connectivity issues that could crop up and cause the issue to appear, but it's generally harder.

Another typical approach, at least when using Dedicated Servers, is to have the Server have all sublevels always loaded, and then just have the clients stream in and out the levels as they need. Again, this bypasses a lot of the same issues that Streaming Volumes do, for similar reasons.

There are other issues even with potential fixes to the above. Any networking related functions on Actors in sublevels would effectively stop because they wouldn't be receiving Net Updates. Similarly, the Client wouldn't have anyway of notifying / requesting the Server to make changes to those Actors (imagine there's some Button or Lever that triggers an RPC that's only valid in a sublevel). Finally, we'd still likely need to destroy Dynamic Actors, otherwise we'd risk having duplicates created or weird behavior when getting initial replication on level stream in.

TL;DR:

Streaming should definitely work in multiplayer, and using BP vs. Streaming Volumes vs. Something else doesn't *really* matter. The biggest thing to make sure is that the Server doesn't unload levels Clients may need (which Streaming Volumes does inherently).

 

*From &lt;<https://udn.unrealengine.com/questions/429527/issue-with-level-streaming-in-multiplayer.html>&gt;*

 

**Notification (in C++) on all Streaming Levels loaded via World Composition in a multiplayer scenario**

 

Whenever Clients have loaded levels (their persistent level, sublevels loaded via World Composition, or sublevels loaded in other ways), they have to notify the server via APlayerController::ServerUpdateLevelVisibility (and ServerUpdateMultipleLevelsVisibility in newer versions).

I'll point out that it's a SealedEvent, meaning that it cannot be overridden in subclasses, but it would be extremely trivial to add in a delegate or virtual method that gets invoked there to allow you to do whatever you need.

Depending on what you're actually trying to do, though, there may be better alternatives to getting around this type of thing. Are you trying to do this to control game state, to trigger events, something else?

 

*From &lt;<https://udn.unrealengine.com/questions/443407/notification-in-c-on-all-streaming-levels-loaded-v.html>&gt;*

 

 

 

 

[Level streaming client crash]: https://udn.unrealengine.com/questions/365920/level-streaming-client-crash.html
[Network streaming level visibility, disconnect]: https://udn.unrealengine.com/questions/350813/network-streaming-level-visibility-disconnect.html
[Toggling ULevelStreaming::bShouldBeVisible causes replication errors]: https://issues.unrealengine.com/issue/UE-43042
