---
sortIndex: 1
sidebar: houdini
---

# Houdini Setup Instructions

## Common

- Install license server on each machine
- Install HQueue Client (<http://kunani.com/how-to-setup-hqueue-for-sidefx-houdini-indie-on-your-windows-10-local-network/>)
  - Directory in D:\knl\hou\HQClient
  - Server: ${env:EDEV_HOUSERVER}:5000 (ex: ikrima-ryzen:5000)
  - Logon Account: ${env:EDEV_HOUSERVERACCOUNT} (ex: sa_server_account)
  - Make sure firewall is accessible
- Update klcommon.py:KLRefPlatform.HOU_Version to new version. Also search replace the old version with new version in that project
- Re-run SetupMachine.ps1 from KL depot to refresh environment vars
- Change symlink of C:\Program Files\Side Effects Software\Latest to point to new directory

### Optional

- Update git repos in tp directory
- Update binary plugins (Redshift, optix)

## For Major Updates (a new houdini major-minor version like going from 17.0 to 17.5)

- Copy previous version prefs folder to new one (eg: ${env:EDEV_HOUPSITEDIR}\prefs\houdini17.5)
- Update the new houdini.env Version envars. Ex:
  - HOU_MAJOR_VER = 17
  - HOU_MINOR_VER = 5
  - REDSHIFT_VER = 17.5.173
- Create a new version specific dso folder (eg: ${env:EDEV_HOUPSITEDIR}\personal\dso-17.5)
- Compile dso's with new HDK (ex: SOP_ComputeTangents)
  - ~~mikktspace-for-houdini: Update the visual studio HDK props file to point to new HDK location~~ Not needed anymore as PolyFrame node has builtin support for mikktspace
- Follow instructions for nightly build updates

## For Nightly Updates

- Run make-hython-venv.ps1
- Change nvidia graphics custom 3d settings for new hindie.exe
