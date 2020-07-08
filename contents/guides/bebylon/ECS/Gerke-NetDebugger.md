<!-- markdownlint-disable -->

# Tasks

## Game Debugger/Net Debuggers

## Build system perf capture


# Gerke Notes

Get to zero warnings

Cook & package
  - Functional test at epic
  - AutomationTest framework
    - Unit tests that are content based & C++
    - Load all levels
      - Screenshot comparison
Gauntlet????


Epic P4:
  - QAGame project
  - Samples of automation
  - Session frontend
Automation Framework
  - Automation Framework Server/Client Workers
  - Can have multiple instances of the editor

Look up our p4 access on udn from epic

Automation Tool/Orchestration

UAT
- Build Lighting
- Commandlets
- Check resave packages


Plugin for reference checkin of assets/unused assets

* AlexU for cleaning up

 -

P4Ignore

Lighting

Network:
- Caps at 10k per second
- Clientss are sending 22k
- Server sending 36k

Network connection was saturated


Replication:
 - UE4 was not sending anything LoadPropertyReplication
 - Broadcast history/frames
 - Motion controller states
 - No drops???
   - Skipped through all the calls
   - Added LOG to sequence
   - ReplayLogic
   - Twenty Tests, only two proper incrementing framenumbers
 - Only way multiple game
   - -Game
 - Verbose Logging => force framerate to 10fps

Standalone game

CookOnTheFly server
 - Editor Setting: Incremental Cooking
 -

GameState Network Ini settings

Percolate

CustomNetworkDriver:
  - Replay()

Multicast:
 - Throttled to two calls per actor per NetUpdate
 -

NetUse


Gerke Part2:

Actn Items for Ikrima:
- outline pain points/features
- fixup python to showcase tool
- arch suggestions? path from small to big?
- deliverables before he travels
- features
  - serialization
  - network transport
  -

- VisData:
  - Thresholding Networking/Highlight frames
  - Network stream vis
  - Markers for when stuff happens
  - Rollback
  - UWorld


# Feature

Left Hand Panel =>
  - Entity List
  - Entity Admin
  - Component List

- Be able to diff between two components

Actions:
- Replay Transactions
- Serialize
- Load

Next Steps
- Entity List


ESComponentTrackViz
- OnSelect
- Tick()


# Feature sets

Timeline + Simple Detail View
  - Track for each simulation frame

DetailView


UWorld Viewer
  - Duplication UWorld
  -


==============================================================================================================

- Ring buffer mode
- Inline detail view of structs/objects