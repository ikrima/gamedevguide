---
sortIndex: 1
sidebar: ue4guide
---

# Commands for toggling debug & perf markers

```ue4c
ToggleDrawEvents: Emits helpful draw event markers for use with GPU Capture/PIX
r.ShowMaterialDrawEvents: Shows material around each drawcall in profilegpu
r.EmitMeshDrawEvents
r.RHISetGPUCaptureOptions
r.ProfileGPUSort 2, ProfileGPU
r.ProfileGPU.Pattern
r.ProfileGPU.ShowLeafEvents
r.ProfileGPU.ShowTransitions
r.ProfileGPU.PrintAssetSummary
r.ProfileGPU.AssetSummaryCallOuts
r.ProfileGPU.Sort

r.RHICmdUseThread=0
r.RHICmdBypass=1
r.RHICmdUseParallelAlgorithms=1
ToggleRHIThread
r.ParallelTranslucency
```

# Commands for debug logging

```ue4c
r.D3DDumpAMDCodeXLFile
r.D3DDumpD3DAsm
```

# General

```ue4c
; Uncomment to get detailed logs on shader compiles and the opportunity to retry on errors
r.ShaderDevelopmentMode=1
r.CompileShadersForDevelopment=1
r.MaterialEditor.UseDevShaders=1
```

```ini
[DevOptions.Shaders]
; See FShaderCompilingManager for documentation on what these do
bAllowCompilingThroughWorkers=True
bAllowAsynchronousShaderCompiling=True
; Make sure we don't starve loading threads
NumUnusedShaderCompilingThreads=3
; Make sure the game has enough cores available to maintain reasonable performance
NumUnusedShaderCompilingThreadsDuringGame=4
; Batching multiple jobs to reduce file overhead, but not so many that latency of blocking compiles is hurt
MaxShaderJobBatchSize=10
bPromptToRetryFailedShaderCompiles=True
bLogJobCompletionTimes=False
; Only using 10ms of game thread time per frame to process async shader maps
ProcessGameThreadTargetTime=.01
;For XboxOne PIX support
ShaderPDBRoot=D:\DirectoryOfChoice
```

## Sanity Checking Commands

```ue4c
r.ShowShaderCompilerWarnings=1
r.D3DCheckShadersForDouble=1
```

## Debug Logging

```ue4c
; Uncomment to dump shaders in the Saved folder
; Warning: leaving this on for a while will fill your hard drive with many small files and folders
r.DumpShaderDebugInfo=1
; When this is enabled, dumped shader paths will get collapsed (in the cases where paths are longer than the OS's max)
r.DumpShaderDebugShortNames=1
; When this is enabled, when dumping shaders an additional file to use with ShaderCompilerWorker -direct mode will be generated
r.DumpShaderDebugWorkerCommandLine=1
```

## Add these when running with a graphical debugger like NSight (but not when profiling):

```ue4c
r.Shaders.Optimize=0
r.Shaders.KeepDebugInfo=1
r.ShowShaderCompilerWarnings=1
r.XGEShaderCompile=0
r.D3D.RemoveUnusedInterpolators=0
r.GraphicsAdapter=0
r.D3D12GraphicsAdapter=0
; Uncomment to disable engine and app registration, e.g. to disable GPU driver optimizations during debugging and development
; (Setting r.ShaderDevelopmentMode=1 will also disable engine and app registration)
;r.DisableEngineAndAppRegistration=1
; Uncomment to enable frame markers in D3D12 for the Radeon GPU Profiler (RGP)
; (Vulkan will auto-enable frame markers for RGP, but in D3D12, they have to be enabled manually for now.)
;D3D12.EmitRgpFrameMarkers=1
;r.AsyncPipelineCompile=0
ToggleDrawEvents: Emits helpful draw event markers for use with GPU Capture/PIX
r.ShowMaterialDrawEvents: Shows material around each drawcall in profilegpu
r.EmitMeshDrawEvents=1
r.RHISetGPUCaptureOptions=1
r.RHICmdUseThread=0
r.RHICmdBypass=1
bb.IsGPUProfiling=1 ; Prevents render heartbeat thread from reporting a deadlock if we're in a debugger and paused
bb.perf.SetShaderCompileMode 0 ; This is equivalent to at runtime doing adding this in your ini
                               ; [DevOptions.Shaders]
                               ; bAllowCompilingThroughWorkers=False
                               ; bAllowAsynchronousShaderCompiling=False
```

## Guidance Tips on how to debug UE4 USF shaders

A lot of these are now configurable through environment flags/switches:

- D3D11ShaderCompiler.cpp: Set DEBUG_SHADERS to 1.
- D3D11ShaderCompiler.cpp: Force TranslateCompilerFlagD3D11 to always return D3D10_SHADER_DEBUG | D3D10_SHADER_SKIP_OPTIMIZATION
- D3D11ShaderCompiler.cpp: Force the fxc command line to contain "/Gfp /Zi /Od", and comment out the usage of /O1 and /O3
- D3D11ShaderCompiler.cpp: Remove the "Strip shader reflection" step in CompileD3DShader()
- ShaderCompiler.cpp: Force bAllowCompilingThroughWorkers and bAllowAsynchronousShaderCompiling to be false
- Sacrifice a chicken to the dark lords of GPU debugging
- Delete any .shaderbin files that you want to be rebuilt
- Delete the entire contents of your DerivedDataCache folders (in both Engine and your game-specific subdirectory)
- Start Unreal Editor. It should sit on the splash screen for around 45 minutes while it rebuilds the shaders, rather than going directly into the editor and showing the "Compiling Shaders" notification in the lower-right corner of your screen.
- Suggestions on things to do while waiting for the shaders to rebuild: Watch your favorite TV show, eat a sandwich, enjoy a leisurely glass of soda, annoy the QA department, spin around in a circle for 45 minutes
- Fire up GPU PerfStudio 2 and run UE4
- Rejoice at seeing the source code for your shaders show up in GPU PerfStudio 2.

<https://udn.unrealengine.com/questions/166316/dx11-hlsl-shader-debugging.html>
<https://www.unrealengine.com/blog/debugging-the-shader-compiling-process>
<https://wiki.unrealengine.com/Debugging_Renderer_Code>
<https://forums.unrealengine.com/showthread.php?6719-Debugging-USF-(Unreal-Shader-Files)>
