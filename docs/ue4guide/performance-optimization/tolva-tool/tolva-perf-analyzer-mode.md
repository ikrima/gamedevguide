---
sortIndex: 1
sidebar: ue4guide
---

# Quick Profiling Guide

## Game Thread

### General

1. Display RenderBudget:
   - `#!ue4c Budget BebylonPerf`

1. Freeze Game Thread
   - `#!ue4c Pause`

1. Check Game Thread Perf
   - `#!ue4c stat Game`

1. Pause Rendering
   - `#!ue4c show Rendering`

### Animation

1. Skeletal Meshes

   ```ue4c
   show SkeletalMeshes
   r.EnableMorphTargets
   r.SkinCache.Mode
   a.URO.Enable
   a.URO.ForceAnimRate
   a.URO.ForceInterpolation
   ```

### Physics

1. Toggle All Collision

   Might need to implement these.

1. Toggle Generate All Overlap Events

   Might need to implement this either in python or you might be able to the editor commands to set on all actors/objects: `#!ue4c set <classname> <propertyName> <value>`

1. Toggle Anim Dynamics

   ```ue4c
   p.AnimDynamics
   p.AnimDynamicsWind
   p.AnimDynamicsRestrictLOD
   p.RagdollPhysics
   ```

1. Visualize by:

   `#!ue4c TraceTag` or `#!ue4c TraceTagAll`

## GPU Profiling

`#!ue4c pause` - pauses game thread and then use `#!ue4c show` command to profile rendering

`FreezeFrame 0.5` - Freezes/Pauses game after a delay. Custom function in UCheatManager

1. Test if GPU Bottleneck:

   - `#!ue4c r.screenpercentage=20` => fast test to see if GPU is bottleneck
   - `#!ue4c show Rendering` ***(verify this this actually disables rendering)***

1. Test if Texture Bandwidth is problem:

   - Replace all textures with 2x2 textures ***(need to implement)***

1. Test if Texture MipMaps are appropriate
   - `#!ue4c Visualize mipmap scale`
   - `#!ue4c Visualize UV scale`

1. Test quad overdraw/small triangle size

   - `#!ue4c show QuadOverdraw`

1. Test Overdraw is problem
   - `#!ue4c show Translucency`
   - `#!ue4c show SeparateTranslucency`

1. Test Meshes bottleneck

   - `#!ue4c show StaticMeshes`
   - `#!ue4c show InstancedStaticMeshes`
   - `#!ue4c show SkeletalMeshes`
   - `#!ue4c r.ForceLOD`
   - Animation Compute Shaders:
     - `#!ue4c r.SkinCache.Mode`
     - `#!ue4c r.MorphTarget.Mode`

1. Test if Lighting is bottleneck

   - Toggle All Lighting
     - `#!ue4c show Lighting` ***(verify this this actually disables rendering)***
     - `#!ue4c ToggleLight` ***(verify this this actually disables rendering)***
     - `#!ue4c show DeferredLighting` ***(verify this this actually disables rendering)***
     - `#!ue4c show VisualizeLightCulling`

   - Toggle Static Lighting
     - `#!ue4c r.AllowStaticLighting`
     - `#!ue4c show DirectLighting` ***(verify this this actually disables rendering)***

   - Toggle Dynamic Lighting
     - `#!ue4c show DirectionalLights`
     - `#!ue4c show PointLights`
     - `#!ue4c show SpotLights`
     - `#!ue4c show SkyLighting`

   - Toggle Lighting Components
     - Direct Lighting
       - `#!ue4c show DirectLighting`
       - `#!ue4c r.SimpleDynamicLighting`
     - Ambient Occlusion
       - `#!ue4c show AmbientOcclusion`
       - `#!ue4c show Diffuse`
       - `#!ue4c show Specular`
     - Global Illumination
       - `#!ue4c show GlobalIllumination`
       - `#!ue4c show SubsurfaceScattering`
     - Indirect Lighting Cache
       - `#!ue4c r.IndirectLightingCache`
       - `#!ue4c show IndirectLightingCache` ***(verify)***
     - Reflection Environment
       - `#!ue4c show ReflectionEnvironment`

1. Test if Shader Complexity Bound:
   - `#!ue4c ToggleForceDefaultMaterial`
   - `#!ue4c show Materials`

1. Test FX System

   - Toggle Particles
     (find all commands to turn them off completely)

   - Toggle Particle Simulation
     - `#!ue4c r.GPUParticle.Simulate`
     - `#!ue4c r.GPUParticle.FixDeltaSeconds`
     - `#!ue4c FX.FreezeGPUSimulation`
     - `#!ue4c FX.FreezeParticleSimulation`
     - `#!ue4c FX.RestartAll`

   - Toggle Particle Rendering
     - `#!ue4c show Particles`

   - Turn Off CPU Particles

   - Turn Off GPU Particles
     - `#!ue4c FX.AllowGPUParticles`

   - Misc Particle Commands
     - `#!ue4c PARTICLE`
     - `#!ue4c KILLPARTICLES`
     - `#!ue4c DUMPPARTICLEMEM`
     - `#!ue4c CountDisabledParticleItems`
     - `#!ue4c LISTPARTICLESYSTEMS`
     - `#!ue4c PARTICLEMESHUSAGE`
     - `#!ue4c DUMPPARTICLECOUNTS`
     - `#!ue4c TRACKPARTICLERENDERINGSTATS`

   - `#!ue4c Toggle Decals`

1. Test If Post Processing

   - show PostProcessing
   - show PostProcessMaterial (this is for toggling custom postprocessing materials which are usually very expensive)
   - show AntiAliasing
   - show Decals

1. Disable rendering features in order of priority by `#!ue4c r.LimitRenderingFeatures=FeatureLevel`. Feature Levels:
   1. AntiAliasing
   1. EyeAdaptation
   1. SeparateTranslucency
   1. DepthOfField
   1. AmbientOcclusion
   1. CameraImperfections
   1. Decals
   1. LensFlares
   1. Bloom
   1. ColorGrading
   1. Tonemapper
   1. Refraction
   1. ReflectionEnvironment
   1. AmbientCubemap
   1. MotionBlur
   1. DirectLighting
   1. Lighting
   1. Translucency
   1. TextRender
   1. Particles
   1. SkeletalMeshes
   1. StaticMeshes
   1. BSP
   1. Paper2DSprites

## Draw Thread

1. Look at Draw Call Counter and make sure it's within budget

   - stat RHI
   - stat SceneRendering
   - Look at triangle counts. You can do show \[object category] to turn off big groups of objects to see where triangle counts are coming from
     - show shadows
     - show dynamicshadows

1. Freeze Rendering
   - r.RenderTimeFrozen
   - FreezeRendering
   - FREEZESTREAMING
   - FREEZEALL (freezes rendering & level streaming)
   - PAUSERENDERCLOCK
   - FX.FreezeGPUSimulation
   - FX.FreezeParticleSimulation

1. Inspect Draw Lists:

   - r.DumpDrawListStats

1. Occlusion/Visibility Culling:
   - Use:
     - stat initviews - Displays information on how long visibility culling took and how effective it was. Visible section count is the single most important stat with respect to rendering thread performance, and that is dominated by Visible Static Mesh Elements under STAT INITVIEWS, but Visible Dynamic Primitives also factors in

   - FIX
     - show Bounds
     - DumpVisibleActors
     - r.VisualizeOccludedPrimitives
     - showflag.visualizeculling
     - show bounds

1. Check if driver overhead is cause
   - stat d3d11rhi

1. GPU/CPU Stalls or Pipeline Bubbles
   - Do RenderDoc/NSight capture, grab timings, and see if the perf goes up. If it does, the problem is a sync point
     - stat scenerendering to look at Stats
     - Launch GPUView to drill into specifics

## VR Specific

- Launch Oculus Performance HUD Tool
  - Should be accessible with console command from U4
  - Disable ASW
  - Look at these timings compared to emulate stereo mode. These are accurate GPU timings
  - Targets:
    - Should have &lt;= 1 dropped frame per 5 seconds
    - Should have GPU render time ~10ms

# Performance Tuning

## Tunable Optimizations

1. Ticking
   - tick.AllowAsyncComponentTicks
   - tick.AllowConcurrentTickQueue
   - tick.AllowAsyncTickDispatch
   - tick.AllowAsyncTickCleanup

1. Toggle Occlusion Queries
   - r.AllowOcclusionQueries
   - r.DownsampledOcclusionQueries
   - r.NumBufferedOcclusionQueries
   - r.OcclusionQueryLocation (Does nothing in forward)

1. Toggle HZB:
   - r.HZBOcclusion=0
   - **EXPERIMENTAL!!** r.DoInitViewsLightingAfterPrepass

1. Toggle EarlyZPass settings:
   - r.EarlyZPass=1
   - r.EarlyZPassMovable=True
   - r.EarlyZPassOnlyMaterialMasking
   - r.MinScreenRadiusForDepthPrepass=0.3
   - r.CustomDepth.Order

1. Animation Update and Evaluation

   a.ParallelAnimEvaluation
   a.ParallelAnimUpdate
   a.ForceParallelAnimUpdate

1. Compute Skinning
   - r.SkinCache.Mode=1
   - r.SkinCache.CompileShaders=1
   - r.MorphTarget.Mode=1
   - r.SkinCache.MaxGPUElementsPerFrame (can't find this)
   - r.SkinCache.BufferSize (can't find this)
   - r.SkinCache.NumTangentIntermediateBuffers
   - r.SkinCache.SceneMemoryLimitInMB

1. FX
   - FX.AllowGPUSorting
   - FX.AllowCulling
   - FX.AllowAsyncTick
   - FX.EarlyScheduleAsync
   - FX.GPUCollisionDepthBounds
   - FX.MaxParticleTilePreAllocation
   - FX.ParticleCollisionIgnoreInvisibleTime
   - FX.ParticleSlackGPU

1. Render Target settings
   - r.ClearSceneMethod=1
   - r.SceneColorFormat=3
   - r.GBufferFormat=1

1. Lighting & GI
   - r.Cache.LightingCacheMovableObjectAllocationSize
   - r.Cache.LightingCacheDimension
   - r.Cache.UpdatePrimsTaskEnabled
   - r.MinScreenRadiusForLights
   - r.MinScreenRadiusForDepthPrepass

1. Misc
   - r.Forward.LightGridPixelSize
   - r.Forward.LightGridSizeZ
   - r.Forward.MaxCulledLightsPerCell
   - r.Forward.LightLinkedListCulling
   - r.DeferUniformBufferUpdatesUntilVisible
   - r.UseParallelGetDynamicMeshElementsTasks
   - r.Tonemapper.Quality

## Quality Trade-Offs

- Toggle TranslucentLightingVolume settings
  - r.TranslucentLightingVolume
  - r.TranslucentVolumeMinFOV
  - r.TranslucentVolumeFOVSnapFactor
  - r.TranslucencyVolumeBlur
  - r.TranslucencyLightingVolumeDim
  - r.TranslucencyLightingVolumeInnerDistance
  - r.TranslucencyLightingVolumeOuterDistance
  (Inner & Outer distance are the ones to change for getting around the popping)

- Toggle Custom Depth
  - r.CustomDepth=0

- Toggle Separate Translucency
  - r.SeparateTranslucency=False
  - r.SeparateTranslucencyAutoDownsample=1
  - r.SeparateTranslucencyScreenPercentage=100
  - r.SeparateTranslucencyDurationDownsampleThreshold=1
  - r.SeparateTranslucencyDurationUpsampleThreshold=0.25

- RenderTargets & PostProcessing
  - r.DBuffer
  - r.Atmosphere
  - r.CapsuleShadows
  - r.ContactShadows
  - r.HighQualityLightMaps

- AA
  - r.DefaultFeature.AntiAliasing=3
  - r.MSAA.CompositingSampleCount=4
  - r.MSAACount=4 (0=> TXAA, 1=>No MSAA, 2,4,8=> MSAA Count)
  - r.WideCustomResolve
  - r.DoTiledReflections

- DBuffer
  - r.DBuffer=False

- GI
  - r.Cache.UpdateEveryFrame
  - r.Cache.SampleTransitionSpeed

- Misc Graphics Quality:
  - r.FastBlurThreshold=0
  - r.BloomQuality=1
  - r.MaxAnisotropy=8
  - r.LightFunctionQuality

- Skinning:
  - r.GPUSkin.Limit2BoneInfluences
  - r.SkinCache.RecomputeTangents

- FX:
  - FX.GPUCollisionDepthBounds=250
  - FX.MaxCPUParticlesPerEmitter=1000
  - FX.MaxGPUParticlesSpawnedPerFrame=524288
  - FX.GPUSpawnWarningThreshold=10000
  - r.GPUParticle.FixDeltaSeconds
  - r.GPUParticle.FixTolerance
  - r.GPUParticle.MaxNumIterations
  - r.ParticleLightQuality

- Reflection Captures
  - r.ReflectionEnvironment
  - r.ReflectionCaptureResolution=128
  - r.ReflectionEnvironmentBeginMixingRoughness=0.1
  - r.ReflectionEnvironmentEndMixingRoughness=0.3
  - r.ReflectionEnvironmentLightmapMixBasedOnRoughness
  - r.ReflectionEnvironmentLightmapMixing
  - r.ReflectionEnvironmentLightmapMixLargestWeight=10000

- Big Kludges:
  - r.pd=1

# Detailed Root Cause Analysis

## Overview

Common stat options: [-ms=5.0][-root=empty] [leaf=empty][-depth=maxint] [-nodisplay]

  ```ue4c
  stat groupname[+] - toggles displaying stats group, + enables hierarchical display
  stat namedmarker #markername# - adds a custom marker to the stats stream
  stat hier -group=groupname [-sortby=name][-maxhistoryframes=60] [-reset][-maxdepth=4]
  stat group list|listall|enable name|disable name|none|all|default - manages enabling/disabling recording of the stats groups. Doing stat [groupname] automatically enables that group
  stat none - visually turn off all stats (recording is still active)
  ```

1. Find perf offending causers:

    ```ue4c
    stat slow [-ms=1.0][-depth=4] - toggles displaying the game and render thread stats
    stat dumpevents [-ms=0.2][-all] - dumps events history for slow events, -all adds other threads besides game and render
    ```

1. After narrowing down, dump specific stat group frame

    ```ue4c
    stat dumpframe [-ms=5.0][-root=empty] [leaf=empty][-depth=maxint] - dumps a frame of stats
    stat dumpframe -ms=.001 -root=initviews
    stat dumpframe -ms=.001 -root=shadow
    ```

    Get more consistent stats:

    ```ue4c
    stat dumpave|dumpmax|dumpsum [-start | -stop | -num=30][-ms=5.0] [-root=empty][leaf=empty] [-depth=maxint] - aggregate stats over multiple frames
    ```

1. Hitches

    ```ue4c
    stat dumphitches [-start | -stop | no explicit option toggles ] - toggles dumping hitches
    t.HitchThreshold to set threshold
    ```

1. Record to disk

    ```ue4c
    stat startfile - starts dumping a capture
    stat stopfile - stops dumping a capture (regular, raw, memory) Low
    stat startfileraw - starts dumping a raw capture
    ```

## General

1. Game Thread:

   - stat Game
   - tick.LogTicks
   - dumpticks
   - tick.showPrerequistes

1. Threading Stalls
   - stat Threading
   - stat CPUStalls

1. Engine UObject System/Constructing UObjects/PostInit/Allocation/etc:

   - stat Object
   - stat ObjectVerbose
   - stat GC

1. Game Thread Scene Update:
   - stat Component
   - stat UObjects
   - stat SceneUpdate (only the GT timers)
   - stat Character
   - stat Tickables (things like movieplayer, timermanager, etc)
   - Tick.LogTicks = 1 or dumpticks

1. Triangle Count/Frame/Render/Game/GPU timings:

   - stat Engine
   - stat RHI
   - stat SceneRendering
     - RenderViewFamily = Render Thread
     - InitViews = Culling, dependent on how many objects (not just visible) in the scene

1. Inspect CPU:
   - stat dumpcpu
   - stat ServerCPU
   - stat CPUStalls

1. Perf By Tick Functions/Tasks/"Job System":
   - stat TaskGraphTasks
   - stat Tickables
   - stat TickGroups

1. Animation:
   - stat Anim
   - stat MorphTarget
   - stat MovieSceneEval
   - stat GPUSkinCache
   - stat Particles
   - ANIMSEQSTATS

1. Physics:

   - stat Physics
   - stat PhysXTasks
   - stat Collision
   - stat CollisionVerbose
   - stat CollisionTags
   - stat Character
   - stat ImmediatePhysics

1. FX
   - stat Particles
   - stat ParticleMem
   - stat GPUParticles
   - stat Emitters
   - stat BeamParticles
   - stat MeshParticles
   - stat TrailParticles
   - DUMPPARTICLECOUNTS
   - DUMPPARTICLEMEM
   - PARTICLEMESHUSAGE
   - LISTPARTICLESYSTEMS

1. Misc
   - stat Quick
   - r.DisplayInternals

## Render Thread

1. DrawThread/Scene Update Stalls:

   - stat SceneRendering
   - stat SceneUpdate

1. D3D Driver overhead:
   - stat d3d11rhi

1. Render Thread Command Marshalling from Game Thread

   - stat RenderThreadCommands
   - stat RHICmdList
   - stat CommandListMarkers
   - stat ParallelCommandListMarkers
   - stat LightRendering

1. Dump Material/Shader inf
   - DumpMaterialStats: Dump material information
   - DumpShaderStats: Dump shader information
   - DumpShaderPipelineStats: Dump shader pipeline information

1. Visibility Culling & Primitive Component count:

   - stat initviews
     - Displays information on how long visibility culling took and how effective it was. Visible section count is the single most important stat with respect to rendering thread performance, and that is dominated by Visible Static Mesh Elements under STAT INITVIEWS, but Visible Dynamic Primitives also factors in.
   - show camerafrustums
   - show bounds

## GPU

1. GPU
   - stat GPU
   - stat RHI (GPU Memory Pressure)

1. Texture Bandwidth
   - showMipLevels
   - VisRT
   - r.VisualizeTexturePool
   - ListTextures
   - ListStreamingTextures

1. GI
   - r.Cache.DrawInterpolationPoints
   - r.Cache.DrawDirectionalShadowing
   - r.Cache.DrawLightingSamples

1. Post-Processing
   - r.ListSceneColorMaterials

1. VR
   - stat OculusHMD
   - stat Oculus

1. Misc
   - r.GPUBusyWait
   - SynthBenchmark

## Advanced

- Hitches

  - stat dumphitches
  - CauseHitches

- Memory
  - TODO: Add a Button to explain how to Launch MTuner
  - TODO: Add a Button to explain how to Launch igmemtrace

  ```ue4c
  memreport [-full]
  stat dumpnonframe [groupname]
  stat toggledebug
  stat TextureGroup
  stat TexturePool
  stat LLMPlatform
  stat LLM
  stat LLMMalloc
  stat LLMRHI
  stat LLMAssets
  stat Memory
  stat MemoryPlatform
  stat MemoryAllocator
  stat MemoryStaticMesh
  stat SceneMemory
  memreport -fullprof
  ```

- Misc

  ```ue4c
  stat dumpnonframe [groupname]
  stat Levels
  stat LoadTime
  stat LoadTimeVerbose
  stat AsyncLoad
  stat AsyncLoadGameThread
  stat Streaming / stat streaming sortby=name
  stat StreamingDetails
  PauseTextureStreaming
  DumpLightmapSizeOnDisk
  r.DumpRenderTargetPoolMemory
  rhi.DumpMemory
  r.RenderTargetPool.Events
  r.RenderTargetPoolMin
  ```
