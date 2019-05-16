Execute console commands on startup through command line:

UE4Editor.exe GAMENAME -ExecCmds="r.BloomQuality 12,vis 21,Quit"

_From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Development/Tools/ConsoleManager/#loadingconsolevariables>&gt;_

Turn on logging

-LogCmds=\\"foo verbose, bar off\\"

_From &lt;<https://wiki.unrealengine.com/Logs,_Printing_Messages_To_Yourself_During_Runtime>&gt;_

Turn on stats

-StatCmds="startfile"

_From &lt;<https://udn.unrealengine.com/questions/445587/long-initial-load-times.html>&gt;_

\* \*

-NoVerifyGC

-Vr

-Game

-log LOG=logfile.txt

-FORCELOGFLUSH

-Deterministic (shortcut for -fixedtimestep/-fixedseed)

-fixedtimestep

-FixedSeed

-D3DDEBUG

-d3dbreakonwarning

-ONETHREAD

-DEBUG

-usefixedtimestep

-fps

-emulatestereo

-nohmd

-nosound

-windowed

-Multiprocess (multiprocess tells unreal in general we shouldn't do things like save ddc, clean shader working directory, and other various multiprocess unsafe things)

-MultiprocessSaveConfig

-MultiprocessOSS

NOTE: Do not pass '-' prefix for these

WinX=5 WinY=495

SAVEWINPOS=1

### **Override Config Ini files with command line argument:**

Override INI (note, no '-' prefix):

GameUserSettingsINI="D:/Ikrima/src/Assembla/Bebylon/BBR/Saved/Config/Windows/PIEGameUserSettings0.ini"

<table><thead><tr class="header"><th><strong>Commandline Argument</strong></th><th><strong>INI Override</strong></th></tr></thead><tbody><tr class="odd"><td>DEFEDITORINI=</td><td>Default Editor</td></tr><tr class="even"><td>EDITORINI=</td><td>Editor</td></tr><tr class="odd"><td>DEFEDITORUSERSETTINGSINI=</td><td>Default EditorUserSettings</td></tr><tr class="even"><td>EDITORUSERSETTINGSINI=</td><td>EditorUserSettings</td></tr><tr class="odd"><td>DEFCOMPATINI=</td><td>Default Compat</td></tr><tr class="even"><td>COMPATINI=</td><td>Compat</td></tr><tr class="odd"><td>DEFLIGHTMASSINI=</td><td>Default Lightmass</td></tr><tr class="even"><td>LIGHTMASSINI=</td><td>Lightmass</td></tr><tr class="odd"><td>DEFENGINEINI=</td><td>Default Engine</td></tr><tr class="even"><td>ENGINEINI=</td><td>Engine</td></tr><tr class="odd"><td>DEFGAMEINI=</td><td>Default Game</td></tr><tr class="even"><td>GAMEINI=</td><td>Game</td></tr><tr class="odd"><td>DEFINPUTINI=</td><td>Default Input</td></tr><tr class="even"><td>INPUTINI=</td><td>Input</td></tr><tr class="odd"><td>DEFUIINI=</td><td>Default UI</td></tr><tr class="even"><td>UIINI=</td><td>UI</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/en-us/Programming/Basics/CommandLineArguments>&gt;_

\* \*
