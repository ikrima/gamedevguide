PreComputed Visibility

 

If you are building a large environment you're not going to want to use precomputed visibility. It doesn't scale up well in either processing time or memory to large numbers of objects and view cells. It's mostly for smaller levels and platforms that don't have occlusion queries (mobile). 

 

Sadly there are no UE4 docs on these systems, but the UE3 docs are mostly relevant:

[[http://udn.epicgames.com/Three/Preco...isibility.html](https://api.unrealengine.com/udk/Three/PrecomputedVisibility.html)]

 

Dynamic occlusion culling is on automatically, it tests the bounding box of each object against the depth buffer from last frame to determine visibility. The default method right now is called HZB (Hierarchical Z Buffer) but there's also the standard occlusion query method if HZB is disabled. You can test efficiency with 'stat sceneocclusion'.

 

*From &lt;<https://forums.unrealengine.com/showthread.php?18323-Visual-occlusion-and-viz-boxes>&gt;*

 

