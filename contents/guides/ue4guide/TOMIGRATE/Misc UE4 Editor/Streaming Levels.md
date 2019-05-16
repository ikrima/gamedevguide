Outstanding question: what effect does "should block on load" have. Sounds like it would interrupt the event loop, which sounds like a bad thing for OR, don't want to interrupt head tracking.

 

Two ways to do it:

1.  Set a streaming volume.

2.  Wire it up with a Blueprint.



The latter is probably more useful, as well as being a bit more user-friendly, but takes more steps to set up. The techniques can also be used together.

 

Levels need to be positioned relative to one another, even within their own file. You can't offset a level when it is streamed in, even though there is a place to set a level's position, it has no effect.

 

If you wanted to stream in levels dynamically and offset them, for example to make a procedurally generated map, you should create the level as a blueprint Class instead (so technically, it isn't a level in that case, but it works in pretty much the exact same way).

 

Streaming volume method: 

![image1](C:\devguide\conversion\FINISHED\assets\image1.jpg)

 ![image2](C:\devguide\conversion\FINISHED\assets\image2.jpg)

 

### Blueprint Method:

It is required that the level was added in the Levels panel, or nothing will happen!

![image3](C:\devguide\conversion\FINISHED\assets\image3.png) 

 

Seamless Travel between Levels:
-------------------------------

At the moment there are few ways to keep actors alive between levels, and we are discussing a new idea to help this going forward.

 

For now you'll want to use "seamless travel", which keeps network connections alive between server/clients while loading the next map/level. On the AGameMode there is a boolean "bUseSeamlessTravel", that will make sure calls to ServerTravel will go a different path when loading maps. Seamless travel basically loads a small map as a transition so that it can garbage collect the previous map. It then continues to load the destination map afterward. This way, we can prevent a memory high watermark and possible out of memory conditions on limited memory platforms (ie console). You'll need to specify a small transition map in DefaultEngine.ini

 

\[/Script/EngineSettings.GameMapsSettings\]

TransitionMap=/Game/Maps/SmallTransitionMap

 

With seamless travel, there is a call GetSeamlessTravelActorList which will allow you to add actors to an array of AActors to preserve between levels. It guarantees they won't garbage collected and will be "renamed" into the next level. I don't know why it's called Rename, but basically it moves the AActor into the next UWorld and in fact the name does change (the FName gets its \_ number incremented).

 

Now, not many things get preserved across travel, the point being that whatever object had a pointer to the object you're preserving is probably getting garbage collected, so the direct reference to your AActor is going to be lost. APlayerController typically survives longer than other AActors (unless the class of controller is changing). You can always do a TActorIterator&lt;ClassToSave&gt; to find the object(s) again and reestablish the linkage. There are a couple of places at this transition where you still have the old AGameMode and AGameState and could theoretically hand off a pointer, but I just looked and it isn't well exposed in an overload fashion (ie you'd have to modify the engine code a little).

 

The GetSeamlessTravelActorList function will be called twice, once when the transition map is reached, and again when the destination map is reached.

 

Hope this helps, let me know any addition questions you have as you work through this.

 

*From &lt;<https://forums.unrealengine.com/showthread.php?3435-Keeping-Actors-Between-Levels>&gt;*
