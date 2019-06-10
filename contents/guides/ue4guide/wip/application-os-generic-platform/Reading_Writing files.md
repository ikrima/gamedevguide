---
sortIndex: 4
---

#### Useful properties that expose FilePickers:

```cpp
FFilePath (can use meta property to filter by asset type meta=(FilePathFilter="py"))

FDirectoryPath

// Get File Info  
        FNullReplayInfo Info;

const FString DemoPath = FPaths::Combine(*FPaths::GameSavedDir(), TEXT("Demos/"));  
        const FString StreamDirectory = FPaths::Combine(*DemoPath, *ReplayName);  
        const FString StreamFullBaseFilename =e FPaths::Combine(*StreamDirectory, *ReplayName);  
        const FString InfoFilename = StreamFullBaseFilename + TEXT(".replayinfo");

TUniquePtr<FArchive> InfoFileArchive(IFileManager::Get().CreateFileReader(*InfoFilename));

if (InfoFileArchive.IsValid() && InfoFileArchive->TotalSize() != 0)  
        {  
                FString JsonString;  
                *InfoFileArchive << JsonString;

Info.FromJson(JsonString);  
                Info.bIsValid = true;

InfoFileArchive->Close();  
        }

// Set FriendlyName  
        Info.FriendlyName = NewFriendlyReplayName;

// Write File Info  
        TUniquePtr<FArchive> ReplayInfoFileAr(IFileManager::Get().CreateFileWriter(*InfoFilename));

if (ReplayInfoFileAr.IsValid())  
        {  
                FString JsonString = Info.ToJson();  
                *ReplayInfoFileAr << JsonString;

ReplayInfoFileAr->Close();  
        }
```

*Reference From <https://wiki.unrealengine.com/Replay_System_Tutorial>*
