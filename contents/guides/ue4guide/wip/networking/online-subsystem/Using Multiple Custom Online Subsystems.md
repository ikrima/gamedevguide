---
sortIndex: 2
---

<https://udn.unrealengine.com/questions/404339/accessing-oculussteam-apis-without-respective-oss.html>

FWIW, the way we handle crossplatform on Paragon and Fortnite is using a Single backend (like I mentioned before) for the match making / connection stuff. This is implemented as an OSS. Then, on platforms we will still enable the necessary subsystems, but disable stuff.

For example, if you take a look at FOnlineSubsystemPS4, you'll notice there are a bunch of flags like bAreRoomsEnabled, bAreAchievementsEnabled, etc:

1. /\** true by default, this enables room creation. Can be disabled to use third party matchmaking. */
1. bool bAreRoomsEnabled;

Then, in the OSS we've just guard any calls into related methods.

We haven't done anything cross platform with Oculus internally, and we don't currently have any internal UE4 titles on Steam, so I don't know that internal work has been done to make those support similar cross-platform type things.

So, the process for us would look a bit more like this:

1. Create OSSPlayFab.

1. Grab the platform specific backend / NetDriver.

1. Disable any features we don't want to use.

*Reference From <https://udn.unrealengine.com/questions/404339/accessing-oculussteam-apis-without-respective-oss.html>*

To do this, it sounds like we need to create a custom OSS that communicates with PlayFab for match making, make calls into Steam/Oculus APIs for handling stuff like Friend Invites/Authentication, and use GameNetDriver for clients to join servers via IPs?

- Yes, that's probably going to be the easiest way to do it. Then, you could directly use any of the normal OSS interfaces and not worry too much.

Additionally, is there a way to dynamically switch OSS? Sometimes we might not want to use PlayFab's matchmaker, and switch to say Steam matchmaker. So we will need to dynamically switch OSS in game. Is this possible?

- As I already pointed out, we do this in our games. We use our internal OSS for handling matchmaking, etc. Then we have the PS4 / XBoxLive OSSs enabled. You can do the same thing by specifying which OSSs to use in your Engine.ini file.

```cpp
; In your case, you may want to have some other way (like packaging specific scripts / inis) that enable / disable OSS.

; Here, I'll just have them all enabled.

[OnlineSubsystemSteam]

bEnabled=true

; other options

[OnlineSubsystemOculus]

bEnabled=true

; other options

; You'd need to create this, or another OSS.

[OnlineSubsystemPlayFab]

bEnabled=true

; other options

; Here, you specify global options that other OSSs can override.

; Also, you specify which OSS will be the default.

[OnlineSubsystem]

; This is going to be the default OSS used.

DefaultPlatformService=PlayFab
```

In the scenario where you want to use a different OSS at runtime, you'd just interact with the FOnlineSubsystemModule normally. I'll point out that the interface is set up so you can pass in the name of OSS you want. E.G.:

```cpp
/**

* Main entry point for accessing an online subsystem by name

* Will load the appropriate module if the subsystem isn't currently loaded

* It's possible that the subsystem doesn't exist and therefore can return NULL

*

* @param InSubsystemName - name of subsystem as referenced by consumers

*

* @return Requested online subsystem, or NULL if that subsystem was unable to load or doesn't exist

*/

virtual class IOnlineSubsystem\* GetOnlineSubsystem(const FName InSubsystemName = NAME_None);

/**

* Destroys an online subsystem created internally via access with GetOnlineSubsystem

* Typically destruction of the subsystem is handled at application exit, but

* there may be rare instances where the subsystem is destroyed by request

*

* @param InSubsystemName - name of subsystem as referenced by consumers

*/

virtual void DestroyOnlineSubsystem(const FName InSubsystemName);
```

If you wrapped your calls to the Online Subsystem stuff in some other manager class, it should be fairly easy to have multiple enabled and use different backend services without much hassle. Like I said, for games like Fortnite we take a similar approach so that we can use our OSS for match making and still use features like invitations, voice, friends, etc. from the underlying platform.
