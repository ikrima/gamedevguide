---
sortIndex: 1
sidebar: ue4guide
---

Things to note:

- Launch the game with this command: Insurgent.exe -fps=60 -usefixedtimestep -notexturestreaming -log

- Make sure DefaultEngine.ini config has these settings:

   [SystemSettingsEditor]

   TEXTUREGROUP_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0)

  [SystemSettings]

  TEXTUREGROUP_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0)

  r.SceneRenderTargetResizeMethod=2

//NOTE: ikrimae: Ensure that the main gameview is > CaptureWidth x CaptureHeight. Bug in UE4 that won't re-alloc scene render targets to the correct size
//               when the scenecapture component > current window render target. <https://answers.unrealengine.com/questions/80531/scene-capture-2d-max-resolution.html>

- Launch with console command: SP.PanoramicMovie 0 \[EndFrame]

![](../_assets/stereo-capture-plugin.PNG)
