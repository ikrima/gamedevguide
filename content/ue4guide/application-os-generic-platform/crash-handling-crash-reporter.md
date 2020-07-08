---
sortIndex: 12
sidebar: ue4guide
---

####  Delegates:

// Callback when an ensure has occurred

static FOnHandleSystemEnsure OnHandleSystemEnsure;

// Callback when an error (crash) has occurred

static FOnHandleSystemError OnHandleSystemError;

**Useful Functions:**

/\** Whether we should generate crash reports even if the debugger is attached. */

extern CORE_API bool GAlwaysReportCrash;

/*\* Whether to use ClientReportClient rather than AutoReporter. */

extern CORE_API bool GUseCrashReportClient;

/\*\* Whether we should ignore the attached debugger. \*/

extern CORE_API bool GIgnoreDebugger;

// @third party code - BEGIN Bebylon

//Force no-handleing of exceptions so standard WER dialog comes up

extern CORE_API bool GBBForcePostMortemDebugging;

// @third party code - END Bebylon

extern CORE_API TCHAR MiniDumpFilenameW\[1024];

**Here is a typical timeline for a single crash:**

- An exception (or an assert) is triggered while running game application on the target system.

- A crash folder is generated with log and dump files

- CrashReportClient(**CRC**) is launched

- **CRC** sends HTTP request to the crash report server with crash files

- The crash files are received by CrashReportReceiver(**CRR**) on the server

- The crash files are written to the LandingZone folder

- CrashReportProcess(**CRP**) scans Landing Zone Folder and discover \*new\* crash folders

- For every crash **CRP**:

  - If callstack is not symbolized, CRP executes the request to MinidumpDiagnostics (**MDD**)

  - Make an HTTP request to CrashReportWebsite(**CRW**) to add the crash

  - CRW add the crash to the CrashReportDatabase (**CRD**)

  - Move the crash report files to Processed Folder

When the crash has gone through this chain, developer could go to the crash report website in the browser and find the crash.

Note that for **MDD** to symbolize the callstack, a process need to upload the symbols to the server.

*Reference From <https://wiki.unrealengine.com/Unreal_Engine_Crash_Reporter>*

#### **Setup Custom Crash Reporter Client & MinidumpDiagnostics**

<http://www.teal-game.com/blog/customcrashreporter>

\[Engine.CrashDebugHelper]
DepotRoot=\[PathToSourceCode]
PDBCachePath=\[PathToCacheFolder]
PDBCacheSizeGB=250
MinDiskFreeSpaceGB=25
DaysToDeleteUnusedFilesFromPDBCache=3
PDBCache_0_Branch=++UE4+Release
PDBCache_0_ExecutablePathPattern=\[PathToExecutableFolder]
PDBCache_0_SymbolPathPattern=\[PathToPdbFolder]
