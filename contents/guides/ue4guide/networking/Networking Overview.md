---
sortIndex: 1
---

<https://udn.unrealengine.com/questions/446465/expense-analysis-for-networkingvariable-replicatio.html>

Networking Guide Compendium

<http://cedric.bnslv.de/Downloads/UE4_Network_Compendium_by_Cedric_eXi_Neukirchen.pdf>

Networking Replication Guide:

<https://wiki.unrealengine.com/Replication>

<https://wiki.beyondunreal.com/Everything_you_ever_wanted_to_know_about_replication_(but_were_afraid_to_ask)>

<https://wiki.beyondunreal.com/What_happens_at_map_startup>

Survival Game - C++ Networking Sample

<https://wiki.unrealengine.com/Survival_Sample_Game:_Section_5>

#### Different types of replication:

- Actor Replication

- Variable Replication

- Subobject/Component replication

- Function Replication (RPC, can only mark UFUNCTION to be replicated in C++ but are BP callable)

- Event Replication

#### Gamestate vs Game Instance

- Gamestate is replicated extension of GameMode b/c GameMode only exists on the server for security. GameMode contains the win/loss rules of the games. Should not hav emuch data that changes during Play

- GameState would hold the positions of the chess pieces on the board. GameState tracks current state of the game (player kills/team kills)

- Gamestate allows clients to access game data like scores & match time, scoreboard stuff. Freely replicated

- GameInstance is data that's persisted between levels. E.g. You want to keep track of what a player did in this level to affect the next level

Gamemode contains rules/logic e.g. conditions for a touchdown, first down in football. Gamestate is state that's replicated to everyone freely e.g. the scoreboard

Playercontroller/playerstate is the equivelent. E.g. playerstate contains score, name, etc while setting those variables and when and routing input is through Playercontroller

GameSession is meant to handle interactions with OnlineSubsystem like accepting login, checking ban lists/server capacity, spectator permissions, starting/ending session with platform

## Objects Can Be In One of these Categories

- Server Only

- Server & Clients

- Server & Owning Client

- Owning Client

![NetworkingOverview_ObjectsCategories](../assets/NetworkingOverview_ObjectsCategories.png)

![NetworkOverview_VennDiagram](../assets/NetworkOverview_VennDiagram.png)

#### Engine Practicalities:

- Network debugging/testing - Launch network version of game through command line shortcut: <https://docs.unrealengine.com/latest/INT/Programming/Basics/CommandLineArguments/index.html>

```batch
UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe "UnrealEngine\BBR\BBR.uproject" 0-LevelStart?listen -Game
UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe "UnrealEngine\BBR\BBR.uproject" -Game 192.168.0.17
UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor.exe
UnrealEngine\\BBR\\BBR.uproject 0-LevelLockArena?listen -Game
UnrealEngine\\Engine\\Binaries\\Win64\\UE4Editor-Win64-Debug.exe "UnrealEngine\\BBR\\BBR.uproject" 1-SimpleMasterArenaFlow?listen -Game -log
```

Launch server mode in standalone build:

```cpp
 ?listen -server
```
