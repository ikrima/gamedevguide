---
sortIndex: 3
sidebar: ue4guide
---

# Debugging Shader Compilation Process

<https://www.unrealengine.com/en-US/blog/debugging-the-shader-compiling-process>


# Debugging Validation

- Pass -d3ddebug to turn on d3d debug validation layer
  FMeshDrawCommand:

- FMeshDrawCommand::DebugData is a debug data struct

- WANTS_DRAW_MESH_EVENTS (RHI_COMMAND_LIST_DEBUG_TRACES || (WITH_PROFILEGPU && PLATFORM_SUPPORTS_DRAW_MESH_EVENTS))

- VALIDATE_UNIFORM_BUFFER_LAYOUT_LIFETIME
  - Whether to assert in cases where the layout is released before uniform buffers created with that layout

- VALIDATE_UNIFORM_BUFFER_LIFETIME 0

  - Whether to assert when a uniform buffer is being deleted while still referenced by a mesh draw command
  - Enabling this requires -norhithread to work correctly since FRHIResource lifetime is managed by both the RT and RHIThread

  | Command                                          | Desc                                                                                                                                       |
  | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
  | r.MeshDrawCommands.DynamicInstancing             | Whether to dynamically combine multiple compatible visible Mesh Draw Commands into one instanced draw on vertex factories that support it. |
  | r.MeshDrawCommands.LogDynamicInstancingStats     | Whether to log dynamic instancing stats on the next frame                                                                                  |
  | r.MeshDrawCommands.LogMeshDrawCommandMemoryStats | Whether to log mesh draw command memory stats on the next frame                                                                            |
  | r.GPUScene.UploadEveryFrame                      | Forces GPU Scene to be fully updated every frame, which is useful for diagnosing issues with stale GPU Scene data.                         |
  | r.GPUScene.ValidatePrimitiveBuffer               | This downloads GPU Scene to the CPU and validates its contents against primitive uniform buffers.                                          |
  | r.RHICmdUseThread                                | To Use a separate thread for RHICmdList                                                                                                    |
  | r.RHIThread.Enable                               | To Disable RHI Thread                                                                                                                      |
  | r.RHICmdBypass                                   | Set to 1 to disable                                                                                                                        |
  | r.RHICmdUseParallelAlgorithms                    | True to use parallel algorithms. Ignored if r.RHICmdBypass is 1.                                                                           |
  | r.MeshDrawCommands.ParallelPassSetup             | Whether to setup mesh draw command pass in parallel.                                                                                       |
  | r.RHICmdBasePassDeferredContexts                 | Disable the parallel tasks for base pass draw dispatch, causing those to happen on the RenderingThread.                                    |
  | r.MeshDrawCommands.UseCachedCommands             | Whether to render from cached mesh draw commands (on vertex factories that support it), or to generate draw commands every frame.          |
  | r.RDG.ImmediateMode                              | Toggle get render graph executing passes as they get created to easily debug crashes caused by pass wiring logic.                          |
  | r.RDG.EmitWarnings                               | Toggle render graph emitting warnings about inefficiencies.                                                                                |
  | r.GPUScene.ValidatePrimitiveBuffer               | Readback the GPU primitive data and assert if it doesn't match the RT primitive data.                                                      |
  | r.GPUScene.UploadEveryFrame                      | Upload the entire scene's primitive data every frame                                                                                       |
