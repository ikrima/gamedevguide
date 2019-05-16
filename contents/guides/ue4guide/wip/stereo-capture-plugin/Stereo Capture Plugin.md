Things to note:

- Launch the game with this command: Insurgent.exe -fps=60 -usefixedtimestep -notexturestreaming -log

- Make sure DefaultEngine.ini config has these settings:

  \[SystemSettingsEditor]

  TEXTUREGROUP_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0)

​ \[SystemSettings]

​ TEXTUREGROUP_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0)

​ r.SceneRenderTargetResizeMethod=2

//NOTE: ikrimae: Ensure that the main gameview is > CaptureWidth x CaptureHeight. Bug in UE4 that won't re-alloc scene render targets to the correct size  
//               when the scenecapture component > current window render target. <https://answers.unrealengine.com/questions/80531/scene-capture-2d-max-resolution.html>

- Launch with console command: SP.PanoramicMovie 0 \[EndFrame]

![img](file:///C:/Users/KITELI~1/AppData/Local/Temp/msohtmlclip1/02/clip_image001.png)

<img src="C:/devguide/conversion/INPROG/Stereo%20Capture%20Plugin/process_markdown/assets/media/image1.png" alt="C:\F47A0CA5\577CB74F-B5F5-4B8D-86CF-2004A3F8F2AD_files\image001.png" style="width:4.89583in;height:0.64583in" />
