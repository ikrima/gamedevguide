# VSCode Troubleshooting

## Install

- install paths
  - [portable mode](https://code.visualstudio.com/docs/editor/portable): wherever you unzip
  - system installer: `C:/Program Files/Microsoft VS Code`
  - user installer: `C:/Users/%USERNAME%/AppData/Local/Programs/Microsoft VS Code`
- data directory:`%APPDATA%/Code`
- extension install dir: `%USERPROFILE%/.vscode`
- user settings: `%APPDATA%/Code/User`
- persisted workspace settings (e.g. extension states, _Don't Show Again..._ prompts,etc) stored in sql database
  - global: `%APPDATA%/Code/User/globalStorage/state.vscdb`
  - workspace: `%APPDATA%/Code/User/workspaceStorage/<workspace ID>/state.vscdb`
  - can view with [SQLite Browser](https://sqlitebrowser.org/)

## Troubleshooting Tips

- Performance
  
  - [Perf Tools](https://github.com/microsoft/vscode/wiki/%5BDEV%5D-Perf-Tools-for-VS-Code-Development)
  - `application.experimental.rendererProfiling`: automatically profile slow renderer-processes
- Diagnostics
  
  |Diagnostics CLI||
  |---------------|--|
  |`-v`,`--version`|print version|
  |`--verbose`|print verbose output (implies --wait)|
  |`--log <level>`|enable global log level (`off`,`critical`,`error`,`warn`,`info`,`debug`,`trace`); default is `info`|
  |`--log <ext-id>:<level>`|enable per extension log level|
  |`-s`,`--status`|print process usage and diagnostics information|
  |`--prof-startup`|run CPU profiler during startup|
  |`--disable-extensions`|disable all installed extensions|
  |`--disable-extension <ext-id>`|disable an extension|
  |\`\--sync \<on|off>\`|
  |`--inspect-extensions <port>`|allow debugging and profiling of extensions|
  |`--inspect-brk-extensions <port>`|allow debugging and profiling of extensions with the extension host being paused after start|
  |`--disable-gpu`|disable GPU hardware acceleration|
  |`--max-memory <memory>`|max memory size for a window (in Mbytes)|
  |`--telemetry`|shows all telemetry events which VS code collects|
  |`-p, --performance`|Start with the **Developer: Startup Performance** command enabled|

- Extensions
  
  - [VSCode Discussions](https://github.com/microsoft/vscode-discussions)

## CLI

|App Management CLI||
|------------------|--|
|`-h`, `--help`|print usage|
|`-v`, `--version`|print VS Code version|
|`-n`, `--new-window`|starts new session of VS Code instead of restoring the previous session (default)|
|`-r`, `--reuse-window`|forces opening a file or folder in the last active window|
|`--locale <locale>`|set display language e.g. `en-US` or `zh-TW`|
|`--extensions-dir <dir>`|Set the root path for extensions. Has no effect in _portable mode_|
|`--user-data-dir <dir>`|Specifies the directory that user data is kept in, useful when running as root. Has no effect in _portable mode_|

|File Management CLI||
|-------------------|--|
|`-g`, `--goto`|used with _file:line{:character}_ to open file at specific line and optional character position|
|`-d`, `--diff <file1> <file2>`|diff two files|
|`-m`, `--merge  <path1> <path2> <base> <result>`|three-way merge|
|`-w`, `--wait`|wait for the files to be closed before returning|
|`file`|file to open; will be created and marked as edited if doesn't exist. can specify multiple files using space separator for each|
|`file:line[:character]`|used with the `-g` argument. Name of a file to open at the specified line and optional character position|
|`folder`|name of a folder to open. You can specify multiple folders and a new Multi-root Workspace is created|
|`--add <dir>`|add folder(s) to the last active window for a multi-root workspace|

|Extension Management CLI||
|------------------------|--|
|`--install-extension <ext>`|Install an extension. Provide the full extension name `publisher.extension` as an argument. Use `--force` argument to avoid prompts|
|`--uninstall-extension <ext>`|Uninstall an extension. Provide the full extension name `publisher.extension` as an argument|
|`--disable-extensions`|Disable all installed extensions. Extensions will still be visible in the **Disabled** section of the Extensions view but they will never be activated|
|`--list-extensions`|List the installed extensions|
|`--show-versions`|Show versions of installed extensions, when using `--list-extensions`|
|`--enable-proposed-api <ext>`|Enables proposed api features for an extension. Provide the full extension name `publisher.extension` as an argument|
