---
sortIndex: 29
---

Execute console commands on startup through command line:

```cpp
UE4Editor.exe GAMENAME -ExecCmds="r.BloomQuality 12,vis 21,Quit"
```

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Development/Tools/ConsoleManager/#loadingconsolevariables>*

Turn on logging

```cpp
-LogCmds=\"foo verbose, bar off\"
```

*Reference From <https://wiki.unrealengine.com/Logs,_Printing_Messages_To_Yourself_During_Runtime>*

Turn on stats

```cpp
-StatCmds="startfile"
```

*Reference From <https://udn.unrealengine.com/questions/445587/long-initial-load-times.html>*

\-NoVerifyGC

\-Vr

\-Game

\-log LOG=logfile.txt

\-FORCELOGFLUSH

\-Deterministic (shortcut for -fixedtimestep/-fixedseed)

\-fixedtimestep

\-FixedSeed

\-D3DDEBUG

\-d3dbreakonwarning

\-ONETHREAD

\-DEBUG

\-usefixedtimestep

\-fps

\-emulatestereo

\-nohmd

\-nosound

\-windowed

\-Multiprocess (multiprocess tells unreal in general we shouldn't do things like save ddc, clean shader working directory, and other various multiprocess unsafe things)

\-MultiprocessSaveConfig

\-MultiprocessOSS

NOTE: Do not pass '-' prefix for these

WinX=5 WinY=495

SAVEWINPOS=1

### Override Config Ini files with command line argument:

Override INI (note, no '-' prefix):

GameUserSettingsINI="UnrealEngine/Saved/Config/Windows/PIEGameUserSettings0.ini"

| **Commandline Argument**  | **INI Override**           |
| ------------------------- | -------------------------- |
| DEFEDITORINI=             | Default Editor             |
| EDITORINI=                | Editor                     |
| DEFEDITORUSERSETTINGSINI= | Default EditorUserSettings |
| EDITORUSERSETTINGSINI=    | EditorUserSettings         |
| DEFCOMPATINI=             | Default Compat             |
| COMPATINI=                | Compat                     |
| DEFLIGHTMASSINI=          | Default Lightmass          |
| LIGHTMASSINI=             | Lightmass                  |
| DEFENGINEINI=             | Default Engine             |
| ENGINEINI=                | Engine                     |
| DEFGAMEINI=               | Default Game               |
| GAMEINI=                  | Game                       |
| DEFINPUTINI=              | Default Input              |
| INPUTINI=                 | Input                      |
| DEFUIINI=                 | Default UI                 |
| UIINI=                    | UI                         |

*Reference From <https://docs.unrealengine.com/en-us/Programming/Basics/CommandLineArguments>*
