Overview Documentation:

https://docs.unrealengine.com/latest/INT/Programming/Online/index.html>

Getting PS4 Online Subsystem To Work (only needed to network multiple devkits through PSN):

- <https://answers.unrealengine.com/questions/339741/problem-while-connecting-ps4-game-client-to-a-wind.html>

- <https://forums.unrealengine.com/showthread.php?82928-Setup-UE4-game-for-PS4-online-multiplayer&highlight=networking>

**How to show Steam Login UI or external UI**

Register with IOnlineExternalUI

**Overview:**

The online subsystem is meant, as you know, as an abstraction layer between all the common services available from all the major platforms, both PC and console. In UE3, much of the hookup code sat inside the GameInfo and PlayerController. Nothing inherently wrong with that, except that there was a bunch of network/online related code intertwined with the rest of the gameplay. A more subtle problem was the lifespan of the PlayerController and the need to talk between the online system and the game during times when the PlayerController may be out of scope (level loads and such).

In UE4 we are making a conscience decision to have better code separation. This has necessitated the GameSession and OnlineSession class hierarchies.

The GameSession class is intended to encapsulate functionality that the host would care about when talking to an online platform (creating/starting/ending sessions, joinability, etc).

The OnlineSession (bad name I'm trying to come up with a better one) class is intended to encapsulate anything clients (including a listen client) would care about when talking to an online platform (invites, joins, presence, matchmaking).

The LocalPlayer was chosen as the location for the OnlineSession due to its lifespan existing across server travel, able to intercept online messaging at any time and hopefully simplify the handling of disconnects and other such async callbacks.

These classes will be maintained and expanded as we introduce the OSS into our games here. Any feedback is appreciated.

From &lt;<https://udn.unrealengine.com/questions/168944/best-way-to-interface-with-onlinesubsystem.html>&gt;\*

**Here's our current layout (in broad strokes):**

- Matching Server M, which does matching making but also player lobbies

- Dedicated Server DS which the clients connect to after matching. These are spawned on demand with session information passed in via command line.

- Clients C, which communicate with the Matching Server and the connect to the DS based on the info the matching server passes back

so until M has matched players, the players are not "connected" to the DS or anyone else. As far as I can tell:

Client: Needs a custom UOnlineSession which has a "loginToMatchingServer()", "BeginMatching()" and such. This would interact with our custom IOnlineSessionInterface which would communicate with the M's APIs. Q: since I don't care about the platform-specific session things for the client (I will always go through M), do I even need a custom OnlineSessionInterface?

Dedicated Server: Needs a custom AGameSession which handles the "game" session. The session data is gotten when RegisterServer() is called, and this data will be authenticated against the values the client passes to it from Login, etc.

Is my understanding correct? As far as I can tell, there is no reason for the DedicatedServer to worry about the OnlineSessionInterface in my case, as the Dedicated Server doesn't care about the matching server information. I need to be able to handle seamless travels that persist the session-specific information on both client and server (the client's infor is authenticated with the server's).

_From &lt;<https://udn.unrealengine.com/questions/264223/proper-way-to-use-uonlinesession-agamesession-and.html>&gt;_

It sounds like you've worked out the basics, but your code doesn't have to follow such a rigid pattern. Online games will typically create a custom class derived from UOnlineSessionClient, but my first thought on how to implement this would be to implement IOnlineSession::FindSessions() and the related functions in your custom online subsystem such that that's where the communication with your matchmaking server takes place. But if it makes more sense for your use case to do that in a UOnlineSession subclass, then no, you probably don't need a custom OnlineSessionInterface.

One potential benefit of doing matchmaking in the session interface is that you can more easily swap in another implementation (such as OnlineSubsystemNull) for testing purposes.

You will want a custom AGameSession, but you can probably use the same class on both the dedicated server and the client, and just wrap the server (or client) specific functionality in runtime checks, if that's easier.

Typically in our games the dedicated server does maintain a session with the OnlineSessionInterface, but I suppose this doesn't have to be the case if your matching server maintains the state you need.

_From &lt;<https://udn.unrealengine.com/questions/264223/proper-way-to-use-uonlinesession-agamesession-and.html>&gt;_

Rationalize between Steam & Oculus Online Subsystem or Platform Services:

<https://udn.unrealengine.com/questions/396718/how-much-work-is-needed-to-get-oculus-matchmaking.html>
