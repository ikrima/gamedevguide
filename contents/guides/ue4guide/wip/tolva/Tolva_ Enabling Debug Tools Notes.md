---
sortIndex: 3
---

##### Commands to set on launch:

-t.maxfps=1000

-r.ForceDebugViewModes=1

renderdoc capture command:

-rRHISetGPUCaptureOptions on

-capture

-restore rRHISetGPUCaptureOptions


##### Memory:

–LLM to enable low level memory tracker

liststreamingtextures

listtextures

stat llm/llmfull

Stat Memory

Stat MemoryPlatform

Stat MemoryStaticMesh

memreport & memreport -full

DUMPALLOCS

IGMEMTrace

-Enable by BB_MEMTRACE_ENABLE=1 in Core.Build.cs (disabled by default)

-Start by:

* passing -memtraceip=127.0.0.1 at command line

* using bb.mem.ToggleTrace to enable/disable at runtime & bb.mem.UserMark

FMallocLeakDetectionProxy

-MALLOC_LEAKDETECTION

Enabling StompAllocator

-USE_MALLOC_STOMP

FMallocPoisonProxy

-UE_USE_MALLOC_FILL_BYTES

FMallocProfiler

- in BuildConfiguration.xml, set bUseMallocProfiler to true, and bOmitFramePointers to false


CPU Profiler:

-VTune

-VSPerf

use Stat Namedevents or -statnamedevents in commandline to export markers to VTune. Not implemented for VSPerf

Microprofile:

-Compile with BB_DEV_TOOLS_MICROPROFILE=1 in Build_BBR.h (enabled by default)

-Enable by -mpenable=1 in commandline


FramePro:

- Compile with FRAMEPRO_ENABLED=1 (enable experimental features to auto turn on

- framepro.enable=1

- Framepro.startrec

- Framepro.endrec
