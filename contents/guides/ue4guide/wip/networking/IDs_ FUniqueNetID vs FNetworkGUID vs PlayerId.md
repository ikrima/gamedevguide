**GetUniqueID()** is a UObject framework feature that is only unique while the object is active, and could be different on the client vs the server, so it's not a good candidate for identifying objects if you need these values to be the same across all machines.

**FNetworkGUID -** The method we use to identify objects across machines.

This value isn't easily accessible though, and is more of a low level way of allowing objects to be referenced as RPC parameters, or replicated property values. These values are also only initialized when the object in question is replicating (which will likely be true for characters though). This value can be obtained through the **NetGUIDLookup** map that is on that **FNetGUIDCache** class (which is in turn stored on the **UNetDriver** object).

If you truly need this exposed more readily, this is definitely something we can explore, or walk you through the steps to expose this from the **FNetGUIDCache** class.

\* \*

**APlayerState.PlayerId -** This value is assigned by the server, and is replicated to all clients. This value is consistent for the duration of play. This might be the way to go if you only need this for players.

**APlayerState.UniqueID -** This is a **FUniqueNetID**, and is only valid though if you connect through matchmaking using the online subsystems, so is a bit more involved to explain here. Used for online subsystem communication

\* \*

_From &lt;<https://udn.unrealengine.com/questions/232509/about-testing-multiplayer.html>&gt;_
