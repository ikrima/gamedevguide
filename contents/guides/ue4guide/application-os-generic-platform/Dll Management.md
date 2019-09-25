---
sortIndex: 11
---

# Setting the DLL binary path

```cpp
FModuleManager::SetGameBinariesDirectory(const TCHAR* InDirectory)
{
#if !IS_MONOLITHIC
  // Before loading game DLLs, make sure that the DLL files can be located by the OS by adding the
  // game binaries directory to the OS DLL search path.  This is so that game module DLLs which are
  // statically loaded as dependencies of other game modules can be located by the OS.
  FPlatformProcess::PushDllDirectory(InDirectory);

  // Add it to the list of game directories to search
  PendingGameBinariesDirectories.Add(InDirectory);
#endif
}

void FModuleManager::AddBinariesDirectory(const TCHAR *InDirectory, bool bIsGameDirectory)
```