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

## Troubleshooting

[Perf Tools](https://github.com/microsoft/vscode/wiki/%5BDEV%5D-Perf-Tools-for-VS-Code-Development)

## CLI

|**Core**||
|----|--|
|`-h`, `--help`|print usage|
|`-v`, `--version`|print VS Code version|
|`-n`, `--new-window`|starts new session of VS Code instead of restoring the previous session (default).|
|`-r`, `--reuse-window`|forces opening a file or folder in the last active window.|
|`-g`, `--goto`|used with _file:line{:character}_ to open file at specific line and optional character position|
|`-d`, `--diff <file1> <file2>`|diff two files|
|`-m`, `--merge  <path1> <path2> <base> <result>`|three-way merge|
|`-w`, `--wait`|wait for the files to be closed before returning|
|`--locale <locale>`|set display language e.g. `en-US` or `zh-TW`|

|**Opening Files/Folders**||
|---------------------|--|
|`file`|file to open; will be created and marked as edited if doesn't exist. can specify multiple files using space separator for each|
|`file:line[:character]`|used with the `-g` argument. Name of a file to open at the specified line and optional character position.|
|`folder`|name of a folder to open. You can specify multiple folders and a new Multi-root Workspace is created.|
|`--add <dir>`|add folder(s) to the last active window for a multi-root workspace.|

|**Extensions**||
|----------|--|
|`--install-extension <ext>`|Install an extension. Provide the full extension name `publisher.extension` as an argument. Use `--force` argument to avoid prompts.|
|`--uninstall-extension <ext>`|Uninstall an extension. Provide the full extension name `publisher.extension` as an argument.|
|`--disable-extensions`|Disable all installed extensions. Extensions will still be visible in the **Disabled** section of the Extensions view but they will never be activated.|
|`--list-extensions`|List the installed extensions.|
|`--show-versions`|Show versions of installed extensions, when using `--list-extensions`|
|`--enable-proposed-api <ext>`|Enables proposed api features for an extension. Provide the full extension name `publisher.extension` as an argument.|

|**Advanced**||
|--------|--|
|`--extensions-dir <dir>`|Set the root path for extensions. Has no effect in _portable mode_|
|`--user-data-dir <dir>`|Specifies the directory that user data is kept in, useful when running as root. Has no effect in _portable mode_|
|`-s, --status`|Print process usage and diagnostics information.|
|`-p, --performance`|Start with the **Developer: Startup Performance** command enabled.|
|`--disable-gpu`|Disable GPU hardware acceleration.|
|`--verbose`|Print verbose output (implies `--wait`).|
|`--prof-startup`|Run CPU profiler during startup.|
|`--upload-logs`|Uploads logs from current session to a secure endpoint.|
