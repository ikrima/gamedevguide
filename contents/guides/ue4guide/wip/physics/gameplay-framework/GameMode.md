---
sortIndex: 2
---

GameMode contains a state machine that tracks the state of the Match

- You can override the match state for custom game modes. Look at Unreal Tournament

- Managed in GameMode but then set in the GameState class

1. EnteringMap = initial state. Actors not yet ticking & world not initialized. Transition on =>

   a) things are fully loaded

1. WaitingToStart: HandleMatchIsWaitingToStart() called when entering this state. Actors are ticking, players have not yet spawned. Transitions on =>

1. ReadyToStartMatch() returns true
   2. Someone calls StartMatch()

1. InProgress: HandleMatchHasStarted called on enter. Calls BeginPlay() on all Actors just incase it wasn’t called in HandleMatchIsWaitingToStart(). Normal gameplay. Transitions on =>

   1. ReadyToEndMatch() == true
   1. Someone calls EndMatch()

1. WaitingPostMatch: HandleMatchHasEnded() on enter. Actors still ticking but new players not accepted. Transitions on =>
   1. Map transfer starts

1. LeavingMap: HandleLeavingMap() on enter. Match stays in this state while transferring to a new map

1. Aborted: failure state. Started from AbortMatch()

Events that are fired:

- OnPostLogin: Called every time a player joins the Game

  - Passes valid PlayerController owned by connecting Player's connection

  - Can be used to Spawn new player pawn

OptionsString: contains options, delimetted by ?, that can be passed via OpenLevel() or ServerTravel()

- UGameplayStatics::ParseOption( can extract passed Options

GameState maintains list of connected Players (PlayerState)

- PlayerArray

- MatchState

- ElapsedTime

- AuthorityGameMode (only server has this)

PlayerState: holds current information about the current Player

- Replicated to everyone so other clients can know details about the Player

- GameState->PlayerArray\[] easy way to access all PlayerStates

- Example of things to store: PlayerName, Score, Ping, GuildID

- Also used to make data persistent between Level Changes or reconnecting dropped Players

  - Does this by copying current PlayerState into the new PlayerState

  - Override CopyProperties() & OverrideWith()

Pawns

- Possession only happens on the server

- Event Possessed() & Unpossessed()

AActor::IsNetRelevantFor() - Determines relevancy for a playercontroller/actor

1. If the Actor is 'bAlwaysRelevant', is owned by the Pawn or PlayerController, is the Pawn, or the Pawn is the Instigator of some action like noise or damage, it is relevant
1. If the Actor is 'bNetUserOwnerRelevancy' and has an Owner, use the Owner's relevancy
1. If the Actor is 'bOnlyRelevantToOwner', and does not pass the first check, it is not relevant
1. If the Actor is attached to the Skeleton of another Actor, then its relevancy is determined by the relevancy of its base
1. if the Actor is hidden ('bHidden == true') and the root component does not collide then the Actor is not relevant
   1. If there is no root component, 'AActor::IsNetRelevantFor()' will log a warning and ask if

the Actor should be set to 'bAlwaysRelevant = true'

6. If 'AGameNetworkManager' is set to use distance based relevancy, the Actor is relevant if it is closer than the net cull distance

AActor::GetNetPriority()- determines how much relative bandwidth actor receives compared to others. NetPriority=2.0 => 2x more bandwidth

- Actor->NetPriority is the base net priority

- GetNetPriority() multiplies NetPriority property based on time since last replication and relative location/distance between Actor & Viewer to avoid starvation

- You can override GetNetPriority()

AActor->NetUpdateFrequency determines replication update frequency

- ROLE_SimulatedProxy: Client will extrapolate actor position based on last known velocity

- ROLE_AutonomousProxy: More complicated extrapolation (storing moves, etc)

GameSession: Server side only interface that manages online game session (e.g. dedicated or lan, number of players, private or advertised,)

- Only one GameSession active at a time but there could be multiple types (dedicated vs listen, coop or FFA, ranked vs unranked)

- Life Time

  - **Create** new session

  - **Wait** for Players to request to join Match

  - **Register** Players who want to join

  - **Start** the session

  - **Play** the Match

  - **End** the session

  - **Un-register** the Players

  - **Either**

    - **Update** the session if you want to change type of Match and go back to **Wait** for Players to join

    - **Destroy** the Session
