**Control messages are handled in UWorld::NotifyControlMessage (mostly for server) and UPendingNetGame (mostly for client)**. The general flow looks like this:

1. Client sends Hello,

1. Server receives Hello, sends Challenge.

1. Client receives Challenge, sends Login.

1. Server sees login, attempts to log player in (AGameModeBase::PreLogin). If that's successful, then server sends Welcome.

1. The client gets the welcome message (this has info about the Game / Level the server is on). Client sends a NetSpeed message which reports the NetSpeed the client has, and starts loading the map.

1. Server receives NetSpeed, and clamps the speed according to the Game's actual netspeed. Server waits for Client to load map

1. Once the client has loaded the map, it sends the Join message to actually join the game.

1. After load, server locally calls AGameMode::PreLogin()

   - Gives GameMode chance to reject the connection

   - ShooterGame checks for if the match has already ended during prelogin to reject people.

   - UT Lobby GameMode checks to make sure they're rankings are within the bounds of the lobby game mode (not too weak, not too strong)

1. If accepted, server calls AGameMode::Login

   - Role of this function is to create a PlayerController that will be replicated to connected client

   - Once received, PlayerController will replace the client's temporary placeholder PlayerController

   - PlayerController::BeginPlay will be called here

   - **It's not safe to call RPC functions on this actor yet; must wait until AGameMode::PostLogin**

1. PostLogin is called, **now safe for the Server to start calling RPC** functions on the PlayerController

​ **Client Connection Events:**

- To catch the moment when a new connection is made is by hooking into the NotifyAcceptedConnection method of UWorld or AOnlineBeacon. They both manage an UNetDriver and inherit from FNetworkNotify.


- Another point to catch when a new connection is being linked to a player controller could be OnActorChannelOpen from AActor. This one is the client side place where the PC binds itself to a local viewport, so from there you could notify the server about the connection.


- Yet another way is to use the login chain within the GameMode, there you got PreLogin, Login and PostLogin, those are commonly used to reject entering players and do some initial setup. You can start calling replication methods on the PlayerController from PostLogin but not in PreLogin nor Login, while you can reject an entering player in PreLogin or Login specifying an error if you like, for example if the game is full.


- On the client's Player controller, these calls happen:

SetPlayer()

\->ReceivedPlayer();

*From &lt;<https://answers.unrealengine.com/questions/161894/c-networking-how-to-get-a-client-connection-event.html>>*

Connections are not actually established until after the challenge is sent and passes to help protect against DDoS attacks (e.g., it's significantly cheaper to handle incoming packets without fully establishing a UNetConnectiong and having to do cleanup if things fail).

At that point, the client should be loaded into the correct map and the server should fully log the player in and assign them a PlayerController.

There are a few things you can do to debug this. First, make sure LogNet is set to at least Log (\`log lognet log\`). Control messages are only printed at that level.

If you still don't see any messages, try to put a breakpoint in either UIpNetDriver::TickDispatch, or the TickDispatch of whatever NetDriver you're using. This is where packets will be processed.

*From &lt;<https://udn.unrealengine.com/questions/404339/accessing-oculussteam-apis-without-respective-oss.html>>*

NetDrivers are distinct from OSSs.

OSSs ultimately aim to provide a platform agnostic interface to the *features* that a given back end can support (achievements, friends, matches / lobbies / sessions, etc.)

NetDrivers are more focused around the direct communication (e.g., managing connections / sockets, handling hand shakes, reading and writing packets, etc.)

With that said, most of the NetDrivers inherit from IPNetDriver. Things like Oculus and Steam do allow a "PassThrough" mode that will have them more or less rely directly on the implementations of the IpNetDriver.

Looking at the SteamNetDriver, it looks like it does have some special case code to handle Steam IDs (like the one you ran into). However, it can also handle "normal" IP addresses and in that case functions as a PassThrough.

The Oculus net driver seems a bit less flexible. Instead of having a Pass Through mode and will immediately exit out in the case of the Subsystem not being enabled.

*From &lt;<https://udn.unrealengine.com/questions/404339/accessing-oculussteam-apis-without-respective-oss.html>>*
