I'm trying to implement quick match functionality in our game. Currently I have it working like so:

1. Player 1 searches for a Steam game lobby, if none is found, Player 1 creates one and waits for Player 2 to join.

1. Player 2 finds Player 1's Steam game lobby, then joins it.

1. Player 2 then connects to Player 1 via Unreal networking, and once Player 2 logs into Player 1's listen server, this seems to be when they are registered as being in the session.

1. At this point Player 1 seamless travels to the correct level, bringing Player 2 along.

This mostly works, but the problem I am trying to solve is when Player 1 hits the cancel button between step 2 and 3. We'd like for Player 1 to reject the connection (via some code in PreLogin), but there doesn't seem to be a nice way to figure out who should be allowed to connect (if we break the OnlineSubsystem abstraction, we can see who is in the Steam lobby, but I'd prefer not to do that if possible), since players are not registered with the game session until they actually log into the server.

​ From &lt;<https://udn.unrealengine.com/questions/215236/steam-lobbies-vs-ue4-game-session.html>>\*

The Steam lobby and the players in it aren't meant to be exposed at the game layer.

Player registration in general works at the Login time frame when a APlayerState is created with the APlayerController, its FUniqueNetId is assigned and then registered with the AGameMode/AGameSession via RegisterPlayer. So while players who are using the session interface are actually in the platform session, this book keeping is handled by the players themselves as long as they call CreateSession/JoinSession/DestroySession.

So on to your issue. If the player is cancelling the game then they should be destroying their session and their hosting net driver for the game when they return to main menu via LoadMap and HandleDisconnect. Any players that are connecting during this time will be disconnected and any future players will be refused as unable to connect at all. When this happens, these clients should DestroySession which will remove them from the Steam lobbies as well.

PreLogin is a fine place to add code that rejects all players if the host is in a state that is not ready to receive players. I don't think you need to know who is actually in the lobby.

From &lt;<https://udn.unrealengine.com/questions/215236/steam-lobbies-vs-ue4-game-session.html>>\*
