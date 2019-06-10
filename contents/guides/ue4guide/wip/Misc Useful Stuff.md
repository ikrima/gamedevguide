---
sortIndex: 30
---

Debug Drawing Utilities:

**DrawDebugHelpers.h contains a lot of helper draw functions**

**Set a function call on the next tick:**

```cpp
GetWorldTimerManager().SetTimerForNextTick(this, &AUTGameMode::StartMatch);
```
