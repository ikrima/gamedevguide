**Rotating/Translating Indirect Lighting Cache/Volume Lightmaps for streamed level instances or sublevels:**

- Some performance functions to transform the stadium world or streamed levels: Loading level instances:


- ApplyWorldOffset

- StaticMeshDrawListApplyWorldOffset

- ApplyWorldOffset_RenderThread


- Level streaming + applying world offset to precomputed lighting:

  <https://answers.unrealengine.com/questions/604070/brushes-stay-in-place-in-transformed-level-instanc.html>>  
  <https://github.com/EpicGames/UnrealEngine/pull/3627>

Each level has a FPrecomputedLightVolume object, which is used to sample pre-computed lighting. This class has a method called "ApplyWorldOffset", which is used for world origin rebasing. The FPrecomputedLightVolume internal world offset is then subtracted to light sample query coordinates, so the data itself doesn't need to be actually moved around. It doesn't support rotation, so that would require modifications to the FPrecomputedLightVolume class.

Streaming levels are transformed using <s>FLevelUtils</s>::ApplyLevelTransform() in LevelUtils.cpp after they are loaded or made visible. All it does is loop through all Actors in the level and adjust their transforms accordingly.

Levels have a multicast delegate called OnApplyLevelTransform which is broadcast after FLevelUtils::ApplyLevelTransform(), which can be used so other parts of code can react to level transformations without the need to modify LevelUtils.cpp.

Since all that stuff is marked as ENGINE_API, I did a quick test which doesn't involve modifying the engine (because I didn't download the source for 4.16 yet). I created an actor class with a SceneComponent root and added this to its BeginPlay:

GetLevel()->PrecomputedLightVolume->ApplyWorldOffset(GetActorLocation());

- Rotate/scale/translate rotation matrix

- Change reflection captures to take their rotation data of their transform

- <https://udn.unrealengine.com/questions/329303/load-level-instance-volume-lighting-samples-not-of.html>

- <https://udn.unrealengine.com/questions/352438/indirect-light-cache-with-respect-to-load-level-in.html>

- Volumetric Lightmaps: <https://udn.unrealengine.com/questions/394256/offsetting-volumetric-lightmap-in-streamed-levels.html>

There's only one volumetric lightmap, since the feature does not currently support sublevel streaming.

WorldOffset probably needs to be applied here: ViewUniformShaderParameters.VolumetricLightmapWorldToUVAdd = -VolumeBounds.Min \* InvVolumeSize;

Something like

i. FVector WorldOffset = Scene->VolumetricLightmapSceneData.GetLevelVolumetricLightmap()->WorldOffset;

ii. ViewUniformShaderParameters.VolumetricLightmapWorldToUVAdd = -(VolumeBounds.Min + WorldOffset) \* InvVolumeSize;

*From &lt;<https://udn.unrealengine.com/questions/394256/offsetting-volumetric-lightmap-in-streamed-levels.html>>*

- Streaming Volumetric Lighting Maps:

I don't think it would be difficult to swap volumetric lightmaps at all, in fact that's what lighting scenarios are doing already. If you can just use lighting scenarios then you are done =)

Otherwise, you need to: 1) Have lightmass generate all the different volumetric lightmaps 2) Import each and store in the right spot 3) Activate the one you want to use by setting it on the FScene, and initializing its rendering resources (create volume textures)

More detail: 1) How you tell lightmass to generate the different volumetric lightmaps depends on what you want to change in between. If you want full lightmaps generated, that's the same as lighting scenarios and you can look at FStaticLightingManager::CreateStaticLightingSystem, it makes a whole different FStaticLightingSystem for each scenario, which will calculate all static lighting.

2. Importing volumetric lightmap happens in FLightmassProcessor::ImportVolumetricLightmap, and normally it goes into the UMapBuildDataRegistry of System.GetWorld()->PersistentLevel, but you could put it anywhere.

2. Finally, the volumetric lightmap is made active on the FScene in ULevel::InitializeRenderingResources. You can select your custom volumetric lightmaps here. Normally it just selects from the active LightingScenario level's MapBuildData.

*From &lt;<https://udn.unrealengine.com/questions/394256/offsetting-volumetric-lightmap-in-streamed-levels.html>>*
