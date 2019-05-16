Make sure to perf profile under the right conditions:

-   Never "Debug". "Development" is convenient, but "Test" is closer to shipping

-   Never in Editor (Slate UI renders each frame & some thumbnails update more irregularly)

-   Make sure lighting is built; unbuilt lighting uses a slower path

 

<https://answers.unrealengine.com/questions/17151/what-are-the-in-engine-tools-for-cpu-and-gpu-profi.html?sort=newest>

 

Controlling Quality Settings:
-----------------------------

1.  **r.ScreenPercentage 25**

2.  **r.ViewDistanceScale 0.4**

3.  **r.PostProcessAAQuality 0**

4. r.PostProcessingQuality 0

5. r.ShadowQuality 0

6. r.TextureQuality 0

7. r.EffectsQuality 0



1.  **sg.ResolutionQuality 25**

2.  **sg.ViewDistanceQuality 0**

3.  **sg.AntiAliasingQuality 0**

4.  **sg.PostProcessQuality 0**

5.  **sg.ShadowQuality 0**

6.  **sg.TextureQuality 0**

7.  **sg.EffectsQuality 0**

 

hmd vsync on/off/reset: Self-explanatory

 

*From &lt;<https://answers.unrealengine.com/questions/23023/trouble-configuring-game-settings.html>&gt;*

 

Texture Quality Settings

 

\[SystemSettings\]/\[SystemSettingsEditor\]  
; NOTE THAT ANY ITEMS IN THIS SECTION WILL AFFECT ALL PLATFORMS!!!

TEXTUREGROUP\_World=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_WorldNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_WorldSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Character=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_CharacterNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_CharacterSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Weapon=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_WeaponNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_WeaponSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Vehicle=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_VehicleNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_VehicleSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Cinematic=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Effects=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=linear,MipFilter=point)  
TEXTUREGROUP\_EffectsNotFiltered=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Skybox=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_UI=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Lightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Shadowmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point,NumStreamedMips=3)  
TEXTUREGROUP\_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_MobileFlattened=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Terrain\_Heightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Terrain\_Weightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP\_Bokeh=(MinLODSize=1,MaxLODSize=256,LODBias=0,MinMagFilter=linear,MipFilter=linear)

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Content/Types/Textures/SupportAndSettings/index.html>&gt;*

 

![PerformanceProfiling_CPUProfiling](C:\devguide\conversion\FINISHED\assets\PerformanceProfiling_CPUProfiling.png)

![PerformanceProfiling_RenderThread](C:\devguide\conversion\FINISHED\assets\PerformanceProfiling_RenderThread.png)

![PerformanceProfiling_GPUVisualizer](C:\devguide\conversion\FINISHED\assets\PerformanceProfiling_GPUVisualizer.png)
