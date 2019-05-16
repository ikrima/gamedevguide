-&gt; ServerTravel()

-&gt; Check if can server travel

-&gt; Get game mode

-&gt; GameMode-&gt;ProcessServerTravel()

-&gt; GameModeBase::ProcessServerTravel()

-&gt; StartToLeaveMap()

-&gt; Sets match state to leaving map

-&gt; ProcessClientTravel()

-&gt; Iterates through list of player controllers and calls their client travel if they are Remote players and PreClientTravel if a local player

-&gt; If playing in editor both player controllers are considered local controllers and they get PreClientTravel() called and not ClientTravel()

-&gt; LocalPlayerController-&gt;PreClientTravel()

-&gt; Calls delegate broadcast notifying the new level, type of travel and whether it is seamless

-&gt; if(bSeamless)

-&gt; Do Seamless travel

-&gt; else (we are not seamless so we do this)

-&gt; Set World-&gt;NextSwitchCountdown = 0 so that switch happens immediately on next Tick in TickWorldTravel()

After the TickWorldTravelI(), the PlayerControllers ClientRestart() and ClientRestart_Implementation get called
