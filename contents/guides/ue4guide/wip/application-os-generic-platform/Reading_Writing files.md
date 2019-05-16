Useful properties that expose FilePickers:

FFilePath (can use meta property to filter by asset type meta=(FilePathFilter="py"))

FDirectoryPath

// Get File Info  
        FNullReplayInfo Info;

const FString DemoPath = FPaths::Combine(\*FPaths::GameSavedDir(), TEXT("Demos/"));  
        const FString StreamDirectory = FPaths::Combine(\*DemoPath, \*ReplayName);  
        const FString StreamFullBaseFilename =e FPaths::Combine(\*StreamDirectory, \*ReplayName);  
        const FString InfoFilename = StreamFullBaseFilename + TEXT(".replayinfo");

TUniquePtr&lt;FArchive&gt; InfoFileArchive(IFileManager::Get().CreateFileReader(\*InfoFilename));

if (InfoFileArchive.IsValid() && InfoFileArchive-&gt;TotalSize() != 0)  
        {  
                FString JsonString;  
                \*InfoFileArchive &lt;&lt; JsonString;

Info.FromJson(JsonString);  
                Info.bIsValid = true;

InfoFileArchive-&gt;Close();  
        }

// Set FriendlyName  
        Info.FriendlyName = NewFriendlyReplayName;

// Write File Info  
        TUniquePtr&lt;FArchive&gt; ReplayInfoFileAr(IFileManager::Get().CreateFileWriter(\*InfoFilename));

if (ReplayInfoFileAr.IsValid())  
        {  
                FString JsonString = Info.ToJson();  
                \*ReplayInfoFileAr &lt;&lt; JsonString;

ReplayInfoFileAr-&gt;Close();  
        }

_From &lt;<https://wiki.unrealengine.com/Replay_System_Tutorial>&gt;_
