---
sortIndex: 1
---

Make sure to perf profile under the right conditions:

- Never "Debug". "Development" is convenient, but "Test" is closer to shipping

- Never in Editor (Slate UI renders each frame & some thumbnails update more irregularly)

- Make sure lighting is built; unbuilt lighting uses a slower path

<https://answers.unrealengine.com/questions/17151/what-are-the-in-engine-tools-for-cpu-and-gpu-profi.html?sort=newest>

## Controlling Quality Settings:

1. **r.ScreenPercentage 25**
1. **r.ViewDistanceScale 0.4**
1. **r.PostProcessAAQuality 0**
1. r.PostProcessingQuality 0
1. r.ShadowQuality 0
1. r.TextureQuality 0
1. r.EffectsQuality 0


1. **sg.ResolutionQuality 25**

1. **sg.ViewDistanceQuality 0**

1. **sg.AntiAliasingQuality 0**

1. **sg.PostProcessQuality 0**

1. **sg.ShadowQuality 0**

1. **sg.TextureQuality 0**

1. **sg.EffectsQuality 0**

hmd vsync on/off/reset: Self-explanatory

*Reference From <https://answers.unrealengine.com/questions/23023/trouble-configuring-game-settings.html>*

Texture Quality Settings

```cpp
[SystemSettings]/[SystemSettingsEditor] 
; NOTE THAT ANY ITEMS IN THIS SECTION WILL AFFECT ALL PLATFORMS!!!

TEXTUREGROUP_World=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point) 



TEXTUREGROUP_WorldNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_WorldSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Character=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_CharacterNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_CharacterSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Weapon=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_WeaponNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_WeaponSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Vehicle=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_VehicleNormalMap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_VehicleSpecular=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Cinematic=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Effects=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=linear,MipFilter=point)  
TEXTUREGROUP_EffectsNotFiltered=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Skybox=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_UI=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Lightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Shadowmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point,NumStreamedMips=3) 

TEXTUREGROUP_RenderTarget=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_MobileFlattened=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Terrain_Heightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Terrain_Weightmap=(MinLODSize=1,MaxLODSize=4096,LODBias=0,MinMagFilter=aniso,MipFilter=point)  
TEXTUREGROUP_Bokeh=(MinLODSize=1,MaxLODSize=256,LODBias=0,MinMagFilter=linear,MipFilter=linear)
```

*Reference From <https://docs.unrealengine.com/latest/INT/Engine/Content/Types/Textures/SupportAndSettings/index.html>*

![PerformanceProfiling_CPUProfiling](.........\assets\PerformanceProfiling_CPUProfiling.png)

![PerformanceProfiling_RenderThread](.........\assets\PerformanceProfiling_RenderThread.png)

![PerformanceProfiling_GPUVisualizer](.........\assets\PerformanceProfiling_GPUVisualizer.png)
