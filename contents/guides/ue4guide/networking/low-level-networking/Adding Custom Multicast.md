---
sortIndex: 5
---

# Networking server call from unauthenticated client

HasNetOwner
GetNetOwner
GetNetConnection
GetNetOwningPlayer

<https://udn.unrealengine.com/questions/192402/rmi-on-non-controlled-actors.html>

# Functions To Override

**These are the functions to change client vs server networking checks:**
- AActor::GetFunctionCallspace
- UObject::ProcessEvent
- UNetDriver::ProcessRemoteFunction
- UObject::CallRemoteFunction

*Look at GameplayAbility.cpp & GameplayDebugger:*
- You can also turn on LogNet verbose logging and follow the output messages when you try to call a non- owned object server function

*Other useful functions:*
- virtual void PostNetReceive() override;
