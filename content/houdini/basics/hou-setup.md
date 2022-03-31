# Houdini Setup

## Common
- Install license server on each machine
- Install HQueue Client [Reference](http://kunani.com/how-to-setup-hqueue-for-sidefx-houdini-indie-on-your-windows-10-local-network/)
  - Directory in D:\knl\hou\HQClient
  - Server: ${env:EDEV_HOUSERVER}:5000 (ex: ikrima-ryzen:5000)
  - Logon Account: ${env:EDEV_HOUSERVERACCOUNT} (ex: sa_server_account)
  - Make sure firewall is accessible
- Update `MachineSetup-Config.ps1:${env:EDEV_HOUDIR}` to point to new path and rerun
- Make sure `HOUDINI_USER_PREF_DIR` is set (e.g. `HOUDINI_USER_PREF_DIR=${env:EDEV_HOUPSITEDIR}/prefs/houdini__HVER__`)
- Change symlink of C:\Program Files\Side Effects Software\Latest to point to new directory

### Optional
- Update git repos in tp directory
- Update binary plugins (Redshift, optix)

## For Major Updates
For major-minor version updates (i.e. from 17.0 to 17.5)
- Copy previous version prefs folder to new one (eg: `${env:EDEV_HOUPSITEDIR}\prefs\houdini17.5`)
- Update the new houdini.env Version envars. Ex:
  - HOU_MAJOR_VER = 17
  - HOU_MINOR_VER = 5
  - REDSHIFT_VER = 17.5.173
- Create a new version specific dso folder (eg: `${env:EDEV_HOUPSITEDIR}\personal\dso-17.5`)
- Compile dso's with new HDK (ex: SOP_ComputeTangents)
  - ~~mikktspace-for-houdini: Update the visual studio HDK props file to point to new HDK location~~
  - Not needed anymore as PolyFrame node has builtin support for mikktspace
- Follow instructions for nightly build updates

## For Nightly Updates
- Run `${env:EDEV_DEVOPSDIR}/MachineConfig/Houdini-Setup.ps1:Update-HythonVenv`
- Change nvidia graphics custom 3d settings for new hindie.exe

## Houdini.env
Use `$HSITE` and `$HFS` to point site specific configuration & houdini install directory
The problem is that no one seems to understand the fully correct syntax, while some slightly bad variations happen to work depending on the platform/method.

Let me try to lay out some of the rules: [Reference](https://www.sidefx.com/forum/topic/26537/?page=1#post-122495)
- Houdini only expands environment variables in the hscript syntax. ie. $HOME, not the DOS syntax like %HOME%.
- The path separators should be semi-colon (;) instead of colon (:). This works on all platforms. Linux/OSX happen to also accept colon (:) as well.
- When you override a variable, you should have “&” in there somewhere so that the default path is still used. Depending on your shell, this is sometimes a special character, in which case you need to ensure that you set it with the correct escaping.
- On Windows especially, make sure you launch Houdini from the shell you set the environment variable. You cannot set it into a shell and then expect the Start Menu > Houdini to see it.
- You must set your environment variable *BEFORE* Houdini is loaded.
- If you're using houdini.env (as an alternative), then you must use double quotes if your variable value contains spaces.
- [List of environment variables](http://www.sidefx.com/docs/houdini/ref/env.html)
