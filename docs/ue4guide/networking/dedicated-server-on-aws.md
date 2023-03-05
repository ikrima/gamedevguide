---
sortIndex: 10
sidebar: ue4guide
---

For Fortnite, we actually run multiple instances of the engine on single Amazon E3 instances. That is, we actually just spawn and run multiple UE4 server applications. In cases where the server isn't doing a lot of strenuous animation or physics calculations, you can even force it to run in a single threaded mode (which may be the default).

The trick with this sort of approach is properly routing connections to the right port, but luckily that's not too hard. The engine already uses code (like ISocketSubsystem::BindNextPort) that will find the next available port. So, if your default port is 7000, then as you spawn more instances they will just take the next available port (7001, 7002, ...). Then, as long as your server instances register with some sort of backend (your own matchmaking, steam, w/e) things will mostly just work.

Now, this does mean that you'll need enough IO / Memory to support this, but those are typically cheaper and easier to scale.

*Reference From <https://udn.unrealengine.com/questions/440313/multiple-game-instances-on-one-server.html>*

The nomenclature below is my own, nothing official really

1. VM Instance - Third party service (AWS/GCE) hosting a game.

1. Dedicated Server Instance - a single running executable of the Unreal Engine dedicated server

1. Game Instance - a single instance of the game rules / etc (1 World)

1. Forked Instance - one dedicated server instance (2) that hosts multiple game instances in multiple sub processes

1. MultiWorld Instance - one dedicated server instance (2) that hosts multiple game instances in one process

Right now (2) and (3) are 1:1 as Jon describes. Fortnite is working on (4) for a 1:N ratio. We are not trying (5) because the engine doesn't work this way at present and if anything crashed it would bring down all the games inside.

A VM Instance (1) typically runs many of (2) and therefore (3) right now. The comments about ports and such from the other answer becomes relevant.

Forking is being evaluated based on the idea that it shares memory between the sub processes. There was some work to not garbage collect various things as well as some startup and shutdown changes to prevent UObject system cleanup. I can't speak to the implementation details or its current performance wins, but you could try this as well.

As another data point, Gears of War was actually 7 instances per core. I don't have Fortnite specific details, but it depends on our Save the World and Battle Royale modes. Clearly it is based on the game CPU demands. You may have a simpler/faster/better game that can run more instances.

*Reference From <https://udn.unrealengine.com/questions/440313/multiple-game-instances-on-one-server.html>*
