---
sortIndex: 6
---

Delegate fires whenever a client cheater is detected in the networking code

```cpp
* @param PlayerId net id of the cheating client

* @param PunishType type of punishment to apply to a cheating client

* @param ReasonStr why the client is being punished due to cheating

* @param InfoStr extra info about the punishment to be applied (eg. ban received, etc)

*/

 DECLARE_DELEGATE_FourParams(FNetworkCheatDetected, const class FUniqueNetId& /*PlayerId*/, ECheatPunishType /*PunishType*/, const FString& /*ReasonStr*/, const FString& /*InfoStr*/);

 static FNetworkCheatDetected OnNetworkCheatDetected;

 /**

* Delegate fired when a pending net game has created a UNetConnection to the server but hasn't sent the initial join message yet.
*
* @param PendingNetGame pointer to the PendingNetGame that is initializing its connection to a server.

*/

 DECLARE_MULTICAST_DELEGATE_OneParam(FOnPendingNetGameConnectionCreated, UPendingNetGame* /*PendingNetGame*/);

 static FOnPendingNetGameConnectionCreated OnPendingNetGameConnectionCreated;
```

