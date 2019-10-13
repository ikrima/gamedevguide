---
sortIndex: 3
---

We have a dedicated server for our game, and want to specify the session name, number of players, Is LAN, and some custom variables like password, game version, and selected map.

The best way would be with DefaultGame.ini or DefaultEngine.ini

Looking through the UE4.18.2 source code I see various config=Engine style settings.

I'm not sure that .ini files are necessarily the right choice here. You may be better off using CVars, as they can be passed in on the console. Therefore, changing server settings wouldn't mean changing anything you have checked in to your VCS but just modifying a command line with whatever system you use.

However, if you wanted to use INIs, I'd recommend Game.ini (as this is a game specific setting). Really, the naming of the ini files doesn't really dictate what can be placed in them. They're really split for organization.

For starters, take a look at these docs:

<https://docs.unrealengine.com/latest/INT/Programming/Development/Tools/ConsoleManager>

<https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles>

Those should get you started with Console Variables and INI Properties. What you choose is ultimately up to you.

But in dedicated server I can not create a session, and there is no local player, and docs say a session is already created.

A doc says the session is already created, or a log file? By default, I don't believe a session is automatically created for you.

I'll point out that with no local player, there won't be a valid player controller. If there's no valid player controller, creating a session will fail.

In UCreateSessionCallbackProxy and your UCustomCreateSession, the call to QueryIDFromPlayerController with a null PlayerController will cause the Helper to be invalid, and therefore it will trigger the OnFailure broadcast immediately.

What I'd suggest trying is modifying your code like this:

```cpp
void UCustomCreateSession::Activate()
{
  FCustomOnlineSubsystemBPCallHelper Helper(TEXT("CustomCreateSession"), GEngine->GetWorldFromContextObject(WorldContextObject));

  // !!!CHANGE!!! Get the session interface and set the settings first.
  auto Sessions = Helper.OnlineSub->GetSessionInterface();
  if (Sessions.IsValid())
  {
      CreateCompleteDelegateHandle = Sessions->AddOnCreateSessionCompleteDelegate_Handle(CreateCompleteDelegate);
      SessionSettings = MakeShareable(new FOnlineSessionSettings());
      SessionSettings->NumPublicConnections = NumPublicConnections;
      SessionSettings->bShouldAdvertise = true;
      SessionSettings->bAllowJoinInProgress = true;
      SessionSettings->bIsLANMatch = bUseLAN;
      SessionSettings->bUsesPresence = true;
      SessionSettings->bAllowJoinViaPresence = true;
      SessionSettings->Set("password", DSS_password, EOnlineDataAdvertisementType::ViaOnlineService);
      SessionSettings->Set("lobbyName", DSS_lobbyName, EOnlineDataAdvertisementType::ViaOnlineService);
      SessionSettings->Set("selectedMap", FString("Echo"), EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("currentStatus", FString("ok"), EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("currentBots", FString("5"), EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("maxPlayers", FString("32"), EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("currentPlayers", FString("1"), EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("motd", FString("Hello World"), EOnlineDataAdvertisementType::ViaOnlineService);
      SessionSettings->Set("versionNumber", DSS_versionNumber, EOnlineDataAdvertisementType::ViaOnlineService);
      // SessionSettings->Set("gametype", FString("Normal"), EOnlineDataAdvertisementType::ViaOnlineService);

      Helper.QueryIDFromPlayerController(PlayerControllerWeakPtr.Get());
      if (Helper.IsValid())
      {
          Sessions->CreateSession(*Helper.UserID, GameSessionName, *SessionSettings);
          return;
      }
      // Helper isn't valid, try creating the session anyway.
      // This can happen if there's no player controller, but the underlying OSS may
      // still be able to handle it (like steam).
      else if (Sessions->CreateSession(0, GameSessionName, *SessionSettings))
      {
          return;
      }
      else
      {
          FFrame::KismetExecutionMessage(TEXT("Unable to create session."), ELogVerbosity::Warning);
      }
  }
  else
  {
      FFrame::KismetExecutionMessage(TEXT("Sessions not supported by Online Subsystem"), ELogVerbosity::Warning);
  }

  // Fail immediately
  OnFailure.Broadcast();
}
```

**How do I find the current session created by the dedicated server?**

- You can try IOnlineSession::GetNamedSession. Unfortunately, that will only return the session if you already know the name. Usually, calling DestroySession should be enough (it will use GetNamedSession under the hood to grab the correct one).
  What I'd recommend is actually debugging to see whether or not any sessions actually do exist. All OSSs should have some array or map so they can implement GetNamedSession. For example, in FOnlineSessionSteam there's a Sessions array. Putting a breakpoint somewhere in the interface and then inspecting that list would tell you for certain whether or not something was created.

**How do I get dedicated server to use my session variables and settings on startup?**

- Take a look at AGameNetworkManager. We use this to access INI settings in multiple places. Basically, we mark the settings up that we need as either Config or GlobalConfig. Then, when we need to access them we do something like this:

  GetDefault&lt;AGameNetworkManager>()->bUseDistanceBasedRelevancy

  What this will do is grab the Class Default Object (CDO) and read the settings from it. In the case where no CDO exists already, one will be created.
  If you take the CVar approach, then all it would require would be for you to just query the CVars.

*From <https://udn.unrealengine.com/questions/410222/specifying-net-session-name-and-other-vars-dedicat.html>*
