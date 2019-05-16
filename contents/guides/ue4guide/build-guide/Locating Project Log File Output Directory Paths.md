---
sortIndex: 10
---

## Editor Session Log\*\*

This log will be generated while running UE4Editor.exe or in a specific project. This file is almost always going to be included when needing a log.

<table><thead><tr class="header"><th><strong>Log Name</strong></th><th><strong>Windows location</strong></th><th><strong>Mac Location</strong></th></tr></thead><tbody><tr class="odd"><td><p>UE4.log</p><p>UE4-backup-YYYY.DD.MM-HR.Mn.Sc.log</p></td><td>Engine\Saved\Logs\</td><td>~/Library/Logs/Unreal Engine/Editor/</td></tr><tr class="even"><td><p>ProjectName.log</p><p>ProjectName-backup-YYYY.DD.MM-HR.Mn.Sc.log</p></td><td>ProjectName\Saved\Logs\</td><td>~/Library/Logs/Unreal Engine/ProjectNameEditor/</td></tr></tbody></table>

# **Game Logs**

This log will be generated while running a Cooked/Packaged Project (ProjectName.exe or ProjectName.app) Always include this if there is an issue with running the packaged game.

<table><thead><tr class="header"><th><strong>Log Name</strong></th><th><strong>Windows location</strong></th><th><strong>Mac Location</strong></th></tr></thead><tbody><tr class="odd"><td>ProjectName.log</td><td>WindowsNoEditor/ProjectName/Saved/Logs</td><td>~/Library/Logs/ProjectName/</td></tr></tbody></table>

# **Build/Cook/Package Logs**

These logs are generated any time you Build/Cook/Package a project. File &gt;Package &gt; Platform, Editor Launch On, UFE sessions.

<table><thead><tr class="header"><th><strong>Log Name</strong></th><th><strong>Windows location</strong></th><th><strong>Mac Location</strong></th></tr></thead><tbody><tr class="odd"><td><p>Cook.txt</p><p>UAT_Log.txt UnrealBuildTool-YYYY.MM.DD-HH.mm.ss.txt</p></td><td><p><strong>P4</strong> - Engine\Programs\AutomationTool\Saved\Logs</p><p><strong>Binary</strong> - %USERPROFILE%\AppData\Roaming\Unreal Engine\AutomationTool\Logs\</p></td><td>~/Library/Logs/Unreal Engine/LocalBuildLogs/</td></tr></tbody></table>

# **Crash Logs**

These are the logs that created and uploaded to CrashReporter.

<table><thead><tr class="header"><th><strong>Log Name</strong></th><th><strong>Windows location</strong></th><th><strong>Mac Location</strong></th></tr></thead><tbody><tr class="odd"><td><p>diagnostics.txt</p><p>minidump.dmp ProjectName.log</p></td><td> %USERPROFILE%\AppData\Local\Microsoft\Windows\WER\ReportQueue (Note: C:\Users\UserName\AppData is invisible, just type the path on the address bar)</td><td><p><strong>P4</strong> - Engine/Saved/Crashes/CrashReport-ProjectName/</p><p><strong>Binary:</strong> ~/Library/Application Support/Epic/Unreal Engine/4.X/Saved/Crashes/CrashReport-ProjectName/ (Note that /Users/yourusername/Library is invisible. Hold the alt-key and from the finder menu select Go-&gt;Library)</p></td></tr></tbody></table>

# **Compile Logs**

Any time a compile fails in Visual Studio or Xcode, copy all of the Output and paste into a txt file. Often times we only copy the last few lines that say it failed, which really doesn’t give the information that devs need.

_From <https://wiki.unrealengine.com/Locating_Project_Logs>_
