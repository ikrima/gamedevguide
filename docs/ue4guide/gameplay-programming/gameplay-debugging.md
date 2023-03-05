---
sortIndex: 7
sidebar: ue4guide
---

## Gameplay Debugger Capabilities:

- Look at FGameplayDebugger module

- Contains GameplayDebuggingComponent, GameplayDebuggingControllerComponent, GameplayDebuggingReplicator, GameplayDebuggingHUDComponent

- You can specify debug bindings by adding this to DefaultInput.ini

```cpp
 \[/Script/Engine.PlayerInput]

 +DebugExecBindings=(Key=L,Command="ToggleInfiniteAmmo")

 +DebugExecBindings=(Key=L,Command="ToggleInfiniteClip", Control=True)

 +DebugExecBindings=(Key=T,Command="ToggleMatchTimer")

 +DebugExecBindings=(Key=T, Command="ForceMatchStart", Control=True)
```

- BaseInput.ini has debugexecbindings that control the debug viewmodes through the F1-F7 keys

- You can extend GameplayDebugger: <https://docs.unrealengine.com/latest/INT/Gameplay/Tools/GameplayDebugger/index.html>

- Turn off/on the GameDebugger by the ' key or by EnableGDT cheat

- Console command "cheat " allows you to enable a bunch of server cheats

  - Roll your own by extending UCheatManager

## Useful Gameplay Debugging Console Commands:

ViewSelf / ViewActor

Debug Collision:

    show collision

ShowDebug …

ShowDebugForReticleToggle …

ShowDebug DebugType

Show … /ShowFlag …

ToggleDebugCamera

Debug Input:

    showdebug input.
