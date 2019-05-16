---
sortIndex: 1
---

## Overview

CLI is like git. It takes the form of \[scriptname.py\] options &lt;group&gt; options &lt;subcommand&gt;

ex: bcr -c debug -r iterate build bbr

_TLDR_:

After you run through \[Setup\] section, for a full proof Clean, Rebuild, & Cook:

bcr -c debug -r clean script fullbuild

bcr -c debug -r iterate script fullbuild

bcr -c debug -r iterate -t standalone cook bybook --maps=0-Lobby+U-Master-Goldfingers

bcr -c debug -r iterate -t server cook bybook --maps=0-Lobby+U-Master-Goldfingers

## Setup

1. Installation: these libs on your machine from an admin console:

Python is packaged in ThirdParty folder

ftype Python.File="E:\\GameDev\\knl\\src\\Bebylon\\ThirdParty\\Python3\\python.exe" "%1" %\*

assoc .py=Python.File

Add PATHEXT system variable and append ".PY" extension to the list.

refreshenv

_Optional: I have explorer set so that running launching a python script will automatically open it through the terminal._

Here are details how you can use assoc .py & ftype Python.File to set it up

<https://stackoverflow.com/questions/1934675/how-to-execute-python-scripts-in-windows>

After setting assoc and ftype via cmd verify it by launching regedit and checking this key
Computer\\HKEY_CLASSES_ROOT\\Python.File\\shell\\open\\command
it should read :
"&lt;path to Bebylon&gt;\\ThirdParty\\Python3\\python.exe" "%1" %\*
with &lt;path to Bebylon&gt; replaced with the correct path for your drive.

2. Configure Machine: Go to Bebylon\\Devops\\BuildAutomation\\BuildAutomation\\ in a terminal and execute:

setupmachine config_envars

setupmachine switch_engver

## Help

Just pass --help at the end of any command/subcommand string

```
bcr --help

bcr build --help

bcr build bbr -help
```

## Build

3 main targets to build.

1. tools (usually not necessary)

2. engine aka plain UE4Editor (this is actually what's used for cooking & building Game/Server/Client, not BBREditor. This is only needed to build if you make code changes in the base engine)

3. bbr (bebylon specific targets: BBR (standalone game), BBREditor (editor), BBRServer (server), BBRClient(client))

You can pass a configuration: debug, debuggame, development, test, shipping to build the corresponding variant

You can also choose the rebuild method: iterate (incremental), rebuild (clean+rebuild), clean (just deletes the files)\

The 'rebuild' option is still flakey because UAT sometimes deletes downstream dependencies but doesn't rebuild them. If you want to do a rebuild, do the command with -r clean and then again with -r iterate

###### Here are the main commands for building:

bcr -c debug -r iterate -t server build tools

bcr -c debug -r iterate -t editor build engine

bcr -c debug -r iterate -t editor build bbr

bcr -c debug -r iterate -t standalone build bbr

bcr -c debug -r iterate -t server build bbr

###### Here's a script utility that does a full clean + build on all targets:

bcr -c debug -r clean script fullbuild

bcr -c debug -r iterate script fullbuild

## Cook

Here's the command for cooking

bcr -c debug -r iterate -t standalone cook bybook --maps=0-Lobby+U-Master-Goldfingers

## Run

## Notes

When using tuple arguments in click, you must provide a default value for the option; otherwise, you will get an error if you do not specify the argument on the command line. It will not choose to pass None or a tuple of None.
