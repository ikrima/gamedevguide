---
sidebar: ue4guide
---
Registry Key developer settings:

- Obscurely worded, but this seems to disable the Health and safety warning:

  HKLM\\Software\\WOW6432Node\\Oculus DWORD: ShowStartupPanelBackup = 1

​ HKEY_LOCAL_MACHINE\\SOFTWARE\\Oculus VR, LLC\\LibOVR\\PurgatoryHudEnabled", REG_DWORD or REG_SZ values of 0 or 1.

- Keep the screen on (may cause burn in):

  HKLM\\Software\\WOW6432Node\\Oculus: AllowScreenBurnIn = 1


- Debug console:

  HKLM\\Software\\WOW6432Node\\Oculus: ShowServiceConsole = 1


- Disable Oculus Home from auto-launching:

  Rename the .exe (C:\\Program Files (x86)\\Oculus\\Support\\oculus-home\\PC_OculusHome.exe)


- Disable updates

  \[HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Oculus VR, LLC\\Oculus\\Config]

  "CoreChannel"="Rift18" (change it to LIVE to continue updates)

## Distributed Shader Compilation

r.XGEShaderCompile=1

Enable HMD head tracking without being in VR mode:

Set Editor Settings->Player->ViewportGetsHMDControl to true & console command "hmdpos enforce on" to enable head tracking in Unreal's Viewport or PIE mode without enabling stereo. Very useful for debugging multiplayer or testing hmd functionality like avatars.

Don't minimize the editor window while in VR Mode

- You can maintain the Editor window during VR Preview mode by commenting out this line in PlayLevel.cpp:

//TODO: ikrimae: Pipe disabling this based on a config variable. Not sure if this will crash the editor & also it's a perf hit
//RootWindow->Minimize();

Rename Oculus Home exe to get rid of it (C:\\Program Files (x86)\\Oculus\\Support\\oculus-home\\PC_OculusHome.exe)

Get rid of purgatory UI (L,C,F):

- HKEY_LOCAL_MACHINE\\SOFTWARE\\Oculus VR, LLC\\LibOVR\\PurgatoryHudEnabled", REG_DWORD or REG_SZ values of 0 or 1.

How to detect if VR Headset is Vive or Oculus

if (GEngine->HMDDevice.IsValid() && GEngine->HMDDevice->IsHMDEnabled())
        {
                if (GEngine->HMDDevice->GetHMDDeviceType() == EHMDDeviceType::DT_SteamVR)
                {
                        // BLAH!

*From <https://forums.unrealengine.com/showthread.php?87727-How-to-Detect-if-using-Rift-or-Vive>*

Useful Oculus console commands:

Stereo/HMD Configuration

* * *

stereo on|off|toggle                Stereo mode on/off

stereo hmd                                        Turns stereo on and re-direct rendering to the Rift.

hmd enable|disable                        Completely disables or re-enables HMD

hmd pd 0.8                                        Sets pixel density in the center (default is 1.0).

hmd sp 125                                        Overrides default screenpercentage for stereo mode. Deprecated, use 'hmd pd xxx' instead.

hmd sp reset                                Resets to original r.ScreenPercentage value. Deprecated, use 'hmd pd 1' instead.

hmd mirror \[on|off|toggle]        Enables/disables/toggles mirroring in a window (for "Application Only" mode only).

hmd mirror 800x600                        Sets mirror window dimension (for Direct mode only).

hmd mirror mode 0|1|2                Sets mirror window mode: 0 - standard stereo distorted view, 1 - stereo undistorted view, 2 - mono viewa (a single eye)

hmd qahead \[on|off]                        Turns QueueAhead on / off or toggles it. Use 'hmd stats' to check its current state.

stereo e=0.064                                Eye distance (m). Use 'stereo reset' to restore original value.

stereo w2m=100                                Overrides default worldunits-to-meters scale. Use 'stereo reset' to restore original value.

stereo ncp=10 fcp=10000                Overrides near clipping and/or far clipping planes for stereo rendering (in cm). Use 'stereo reset' to restore original value.

stereo show                                        Shows current ipd and head model offset

stereo reset                                Resets stereo settings

hmdpos on|off                                Enables/disables positional tracking.

hmdpos reset                                Resets forward direction and 'zero' position

hmdpos reset -37                        Resets forward direction and apply yaw rotation (in degrees) and 'zero' position

hmdpos show                                        Shows status of positional tracking.

hmdpos enforce                                Toggles head tracking even if not in stereo (for testing purposes).

Stereo/HMD Internals

* * *

hmdmag on|off                                Turns magnetometer on/off

hmdmag show                                        Shows state of magnetometer

Misc

* * *

hmd stats                                        Shows HMD-related stats.

hmd grid                                        Toggles lens-centered grid.

hmd setint PerfHudMode \[0..4]                         Turns on \[1..x] or off \[0] builtin Performance HUD, modes 1-4.

hmd setint DebugHudStereoMode \[0..3]         Turns on \[1..x] or off \[0] builtin debug stereo HUD, modes 1-3.

hmddbg showcamera \[off | toggle] Draws a tracking camera frustum in the game's world.

hmddbg cubes \[on | off | toggle] Draws a 'sea of cubes' over the existing scene.

hmd updateongt on|off                Turns on/off update-on-gamethread mode (for debugging). On by default.

hmd updateonrt on|off                Turns on/off update-on-renderthread mode for lower latency. On by default.

hmdversion                                        Prints Oculus SDK version used and Oculus Plugin info

uncapfps                                         Uncaps FPS (allows FPS > 62); to restore cap - "set Engine bSmoothFrameRate 1"; t.maxfps could also be used for the same purpose.
