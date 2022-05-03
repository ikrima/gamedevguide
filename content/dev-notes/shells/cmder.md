# Cmder Cheat Sheet

## VSCode

* `vscode_init_args.cmd`: user profile script to configure vscode terminal
  * called by `cmdermini\vendor\bin\vscode_init.cmd` which looks in `%cmder_user_bin%\vscode_init_args.cmd` or `%CMDER_ROOT%\bin\vscode_init_args.cmd`

## Make it fast

`git status` is abysmal on windows; disable the cmder from using it by adding to git config

````ini
[cmder]
  status    = false  # Opt out of Git status for 'ALL' Cmder supported shells.
  cmdstatus = false  # Opt out of Git status for 'Cmd.exe' shells.
  psstatus  = false  # Opt out of Git status for 'Powershell.exe and 'Pwsh.exe' shells.
  shstatus  = false  # Opt out of Git status for 'bash.exe' shells.
````
