Playfab OnlineSubsystem Plugin by a dev:

- <https://gitlab.com/mtuska/OnlineSubsystemPlayFab>

- Corresponding thread on UE4 + Playfab + Custom servers: <https://community.playfab.com/questions/9761/integration-with-unreal-dedicated-servers.html?childToView=10515#comment-10515>

Connecting To UE4 Server on Playfab:

<https://community.playfab.com/comments/10515/view.html>

For connecting, the console command should be "open ipaddress:port". As I have ran this many times with success within the Unreal Engine, I don't believe there is any issues there.

Now, as for RedeemMatchmakerTicket, this is something a bit more tricky that requires a bit of fangling. So, for now I'll assume you're using the C++ SDK. Unreal Engine doesn't have any real Authentication functions past the client side login. You you run "open 127.0.0.1:7777" you should as provide parameters for the ticket. i.e. "open 127.0.0.1:7777?ticket=XXX?playfabid=XXX" We want both the ticket and the PlayFabId as without the provided PlayFabId, there's no way to make sure that ticket is valid with that client. Now as I haven't tried this in Blueprint, I'm not sure what GameMode functions are available. So, what you can do is on AGameMode::Login, you can parse the Options parameter and use that info to send the RedeemMatchmakerTicket request. When it sends the info back, you compare the two PlayFabIds just to make sure they're equal. If equal, the player should be valid, yay! If not equal, something is either wrong or the client is trying to spoof something.

<https://community.playfab.com/questions/5530/can-i-get-a-conceptual-explanation-of-how-a-custom.html>

Correct, the Matchmaker API set is for developers who want to build their own custom matchmaking server. In general, the way one would work is:

- Player sends request to match to your server

- Your server

- Manages active game server info (you need to have your game servers communicate status to it, so that it knows what's available)

- If you're hosting custom game servers with PlayFab, that may include using StartGame to start game instances

- The "match score" is entirely up to you - it's any logic you need (and the whole reason you want to run your own matchmaking)

- Validates the player is good with AuthUser, and optionally uses UserInfo to get any info needed

- Replies to client with info on the server it should connect to

- Player joins that session

- Your custom game server tells your matchmaker that the player joined (you'll want to use some form of validation on this, like our matchmaker receipt), and if it's valid, your matchmaker calls PlayerJoined to let our service know

- Player plays in the game session, and eventually either disconnects or leaves cleanly

- Your server determines when players have left servers and calls PlayerLeft to let our service know

So for your model, for players who can't get into a game right away (which I'm curious about - if games must be exactly 8 people, how could they ever join one that's already going - join in progress if someone leaves a game?), you would need to maintain a connection to the players until you've got the set needed to start a game session, start that session, and then send the players the info on that session so that they can join it.

I will say that what some titles are doing is a basic matchmaking call in PlayFab to join players to a "lobby" server, which they use for persistent connections to the player while they decide how to group up players for actual gameplay. They then call StartGame and send the info on the session to those players, as described above. Some of those games are even using the lobby as another part of the game - a place for players to chat or even interact with parts of the world which require much less compute power than the action part of the game, so that they can have a smaller number of lobby servers

The StartGame and Matchmake calls return the information for the server instance the player should connect to, and that info is returned immediately after the game wrangler service starts the executable for your game server. If your server has to load extra libraries or do other processing when it is run, that could mean that your client would try connecting before it is ready, so it's important to ensure you have a process running that listens for players as soon as your executable launches.

\* \*

_From &lt;<https://community.playfab.com/questions/5530/can-i-get-a-conceptual-explanation-of-how-a-custom.html>&gt;_

The way the PlayFab matchmaker works is that it finds all sessions that have available slots, which match the "must have" criteria - Build Version, Game Mode, and Region - and filters that based on Tags. If there's no statistic provided for the match, it just picks randomly from that list. If there is a statistic provided, it orders the available sessions by the ABS difference between the input statistic, and that of the active session, returning a session from the top of the list (closest to the input score). But it never waits - it always immediately returns the closest match, or if one cannot be found, either "no match found" or a new session, depending on whether you start sessions on calls to matchmake or not.

I can think of somewhat convoluted schemes that would allow you to use our matchmaker the way you describe - joining the session, checking the stat difference, leaving, getting another search result, etc. - but you would need to make sure you're throttling the Matchmake calls from the client so that you're not hitting the service with many calls per user, introducing delays in the process. Also, since players would be "locking" slots in sessions briefly (as a result of the Matchmake call, the slot is "claimed" for a minute), that would also reduce the efficiency of the operation.

What you're really looking for is "queue" matchmaking, in which the player asks for a match and waits for one to be found that's within the range requested - the match call doesn't return until it finds one, or hits a timeout. We do have a backlog item for such a matchmaker, but it is not something that's on our schedule for the near-term. For now, if you have a requirement for this type of matchmaking, I would have to recommend using a custom matchmaker.

_From &lt;<https://community.playfab.com/questions/969/211662267-Matchmaking-for-racing-games.html>&gt;_
