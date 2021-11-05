# Houdini Python

## Overview
Using houdini python libs in normal python
  - Hython.exe is a python shell wrapper that automatically sets env variables (http://www.sidefx.com/docs/houdini/hom/commandline)
  - Call the houdini script setup to set necessary env variables (look at command line tools shortcut)

## Cheatsheet
- Execute Python Script internal to HDA:
  - CallbackScript: source opdef:.?force_update.cmd
    ![](../assets/hou_exec_pyscript1.png)
    ![](../assets/hou_exec_pyscript2.png)
- Houdini Python Snippets: Look in vscode project
