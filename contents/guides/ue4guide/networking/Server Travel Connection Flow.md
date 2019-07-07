---
sortIndex: 4
---

\-> ServerTravel()

- \-> Check if can server travel
- \-> Get game mode
- \-> GameMode->ProcessServerTravel()
  - \-> GameModeBase::ProcessServerTravel()
    - \-> StartToLeaveMap()
      - \-> Sets match state to leaving map
    - \-> ProcessClientTravel()
      - \-> Iterates through list of player controllers and calls their client travel if they are Remote players and PreClientTravel if a local player
      - \-> If playing in editor both player controllers are considered local controllers and they get PreClientTravel() called and not ClientTravel()
      - \-> LocalPlayerController->PreClientTravel()
        - \-> Calls delegate broadcast notifying the new level, type of travel and whether it is seamless
    - \-> if(bSeamless)
      - \-> Do Seamless travel
    - \-> else (we are not seamless so we do this)
      - \-> Set World->NextSwitchCountdown = 0 so that switch happens immediately on next Tick in TickWorldTravel()

After the TickWorldTravelI(), the PlayerControllers ClientRestart() and ClientRestart_Implementation get called
