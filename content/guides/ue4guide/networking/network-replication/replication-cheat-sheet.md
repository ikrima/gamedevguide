---
sortIndex: 9
---

**RPC invoked from the server**

| **Actor ownership**    | **Not replicated** | **NetMulticast**               | **Server**     | **Client**                    |
| ---------------------- | ------------------ | ------------------------------ | -------------- | ----------------------------- |
| **Client-owned actor** | Runs on server     | Runs on server and all clients | Runs on server | Runs on actor's owning client |
| **Server-owned actor** | Runs on server     | Runs on server and all clients | Runs on server | Runs on server                |
| **Unowned actor**      | Runs on server     | Runs on server and all clients | Runs on server | Runs on server                |

**RPC invoked from a client**

| **Actor ownership**             | **Not replicated**      | **NetMulticast**        | **Server**     | **Client**              |
| ------------------------------- | ----------------------- | ----------------------- | -------------- | ----------------------- |
| **Owned by invoking client**    | Runs on invoking client | Runs on invoking client | Runs on server | Runs on invoking client |
| **Owned by a different client** | Runs on invoking client | Runs on invoking client | Dropped        | Runs on invoking client |
| **Server-owned actor**          | Runs on invoking client | Runs on invoking client | Dropped        | Runs on invoking client |
| **Unowned actor**               | Runs on invoking client | Runs on invoking client | Dropped        | Runs on invoking client |

*Reference From <https://docs.unrealengine.com/latest/INT/Gameplay/Networking/Actors/RPCs/index.html>*
