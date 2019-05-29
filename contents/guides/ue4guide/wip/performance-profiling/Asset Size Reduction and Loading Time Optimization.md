---
sortIndex: 2
---

UnrealFest Europe 2018: Introduction to UE4 Asset Reduction Tools and Optimization Tips for Load Times and GC

**Find objects that take a lot of time to do vertex calculations using Graphics Debugger**

Example:

1. To Eliminate pixel shader costs,
   - set r.screenpacentage to a very low value.

1. Capture and check cost of each draw call with GD
   - (Set r.RHISetGPUGaptureOptions to 1, and then “ProfileGPU”)

- SkeletalMesh

  - r.skeletalmeshlodbias: add/subtract LOD levels

  - r.skeletalmeshlodscale: Scale LOD distances


- Static Mesh

  - r.StaticMeshLODDistanceScale: Scale LOD distances

  - r.forceLOD: force LOD level

These commands affects all objects and can’t target individual objects specifically, but can use them to do a quick check of the whole scene

**Using “CompressAnimations” Commandlet, You can compress all animation sequences in your project.**

- Example)

- - UE4Editor-cmd.exe [ProjectPath] –run=CompressAnimations

- You can change the compression method in Project Settings

- You can set individual animations to not to be compressed

- - “Do not override compression” option

![PerformanceProfiling_AssetSize_DoNotOverrideCompression](.........\assets\PerformanceProfiling_AssetSize_DoNotOverrideCompression.png)

### **Animation Compression**

**How to check the compressed asset data size 1**

![](.......\assets\perfprofile-assetsizered.png)

You can see sizes and compressed ratios

in Content Browser.

Can also verify by looking at the cooked asset’s size, and the size in memory with memreport

- ### **Profiling & Optimization of load times: Two areas**

1. #### **Load to Memory from Storage**

1. #### **AddToWorld (hitches when streaming)**

- ### **Load To Memory Profiling**

  - Stat Levels

- ![PerformanceProfiling_AssetSize_LoadtoMemoryProfiling](.........\assets\PerformanceProfiling_AssetSize_LoadtoMemoryProfiling.png)


    -   Gray ＝ Persistent Level

    -   Red ＝ Unloaded

    -   Purple = Loading

    -   Orange＝ AddToWorld

    -   Green ＝ Finished Loading

    -   The stat levels console command will show you a list of the current levels in your game, colored by their current load status

    -   You can see their state, whether it be unloaded (red), loading(purple), loaded to memory but still adding objects to the world (orange), and finally done loading (green)

    -   Can use this as a quick way to see which levels are taking the longest to load

- Loadtimes.DumpReport (Loadtimes.reset): Dive deeper

  - List load times for each package (asset)

    - “FILE” option outputs the result in a .loadreport file.

    - “LOWTIME=0.05” option eliminates packages whose load-time is under the specified value from the list.

- LoadTimes.Reset

  - Clear all dumped loadtime data.

  - You have to call this command before stating load levels you want to profile.


- #### **Profiling AddToWorld**

  - Enable this define **PERF_TRACK_DETAILED_ASYNC_STATS (AsyncLoading.h)**

  - This define dumps the details of AddToWorld()

  - Can be a useful clue in finding AddToWorld bottlenecks

  - Example:

UWorld::AddToWorld: updating components for /Game/Sub took (less than) 110.62 ms

Detailed AddToWorld stats for '/Game/Sub' - Total 425.37ms

Move Actors : 0.00 ms

Shift Actors : 0.00 ms

Update Components : 425.12 ms

Init BSP Phys : 0.00 ms

Init Actor Phys : 0.00 ms

Init Actors : 0.00 ms

Initialize : 0.08 m

- ### **Optimization**

- Pak file should be used for load-time.

  - **Combining all content into a single UnrealPak is necessary to use the Event Driven Loader,** which is the the loading method we wrote specifically optimized for consoles

- Compression: depends on the project

  - Also whether or not to compress content can have different impacts on different projects, so need to test for your particular project on the target hardware

- Optimizing load times FileOpenOrder

  - You can sort assets in Pak files in file open order.

    - FileOpenOrder is a really easy win for all projects. It just arranges the files on disk in the order they are loaded.

    - You play the game once and record the order the files were loaded, and then you package again passing that data to the packaging process

    - You have to play game and get file open order logs in advance

    - Detailed explanation in the official docs [Packaging Projects](https://docs.unrealengine.com/en-us/Engine/Basics/Projects/Packaging)

  - It is effective on SSDs too Due to block read size in file system

- Eliminate data that is never used

  - Material: Shader Permutation Reduction

  - Vertex: Reverse Index Buffer

    **Probably almost all of games should turn off…**

    - Reverse Index Buffer

      used when rendering a negative scale object

  **Some games can disable…**

  - Depth-only Index Buffer

  Index Buffer to make shadow rendering faster

  If you want to turn it off, ensure shadow rendering performance is acceptable

  **No effect on Console**

  \- Adjacency Index Buffer

  This is for Tessellation. But UE4 doesn’t support Tessellation on consoles

  So UE4 disregards this option when cooking for console


- Preloading with Asset Manager

- Simplify logic in BeginPlay

  - BeginPlay runs during AddToWorld()

  - Move logic to Construction Script when possible

    - Construction Script runs at cook time. Construction scripts are evaluated at cook time, and the post-construction script object state is serialized

- #### **Garbage Collection**

  - Noticeable and unacceptable hitches due to GC


- You might see hitches when streaming levels, because..

  - The number of objects temporarily increases during the transition

  - Many objects are deleted at once

![PerformanceProfiling_AssetSize_RoughGCAlgorithm](.........\assets\PerformanceProfiling_AssetSize_RoughGCAlgorithm.png)

**GC Cost** **=** **Checking cost** **+** **Deletion Cost** is not entirely accurate

**Deletion Cost** = **Detaching Dependencies** **+** **Deleting actual objects (**can be distributed to other frames )

**Cost at the frame GC is called** **=** **Checking cost** **+** **Detaching Dependencies cost**

GC implementation

- All UObjects are stored in an array
- When GC happens, by default UE4 will check all elements in the array and delete ones that aren’t referenced
- So, there are two types of costs here, the costs of checking each object in the array (marking), and the costs of deleting each unreferenced object (sweeping)
- Means it is possible to see hitching even if no objects are actually being deleted if the number of UObjects is high

### How to profile GC costs

1. ##### Log loggarbage log (Log loggarbage verbose)

The main command is “log LogGarbage log”

The command name is a little confusing, but this command is saying “I want to change logging settings, for the category of logging named “Log Garbage”, and I want to see all messages in that log category that are verbosity “log” or greater”

You can also do “log LogGarbage verbose” to see more log messages

You can see the Checking cost and the deletion cost are printed out in this manner

![PerformanceProfiling_AssetSize_GCCosts](.........\assets\PerformanceProfiling_AssetSize_GCCosts.png)

2. ##### Stat dumphitches

![PerformanceProfiling_AssetSize_DumpHitches](.........\assets\PerformanceProfiling_AssetSize_DumpHitches.png)

![PerformanceProfiling_AssetSize_ProfilingGCVerify](.........\assets\PerformanceProfiling_AssetSize_ProfilingGCVerify.png)

3. (Stat Startfile/Stopfile)

   - Use normal UE4 Profiler

3. CBD Profiling Tools

\#define PROFILE_ConditionalBeginDestory

\#define PROFILE_GCConditionalBeginDestroyByClass

These defines dump delete costs per each assets as below.

LogTemp: 1090 cnt 2.23us per 2.43ms total /Game/Blueprints/Character/AAAAAAAAA

LogTemp: 615 cnt 2.58us per 1.59ms total /Game/Blueprints/Character/BBBBBBBBBB

LogTemp: 698 cnt 2.11us per 1.48ms total /Game/Blueprints/Character/CCCCCCCCCC

LogTemp: 489 cnt 2.64us per 1.29ms total /Game/Blueprints/Gimmick/GimmickAAAAA

LogTemp: 261 cnt 4.22us per 1.10ms total /Game/Maps/MAPMAPMAP

5. Obj list / Blueprint Stats

The “Obj list” command will allow you to see how many and what type of UObjects are in your scene

Class Count

MetaData 357

SkeletalMesh 1

Package 575

Class 2393

FontFace 6

BoolProperty 4797

FloatProperty 3788

ObjectProperty 3251

**5/5 Command to output number of UObjects per Blueprint**

![PerformanceProfiling_AssetSize_BlueprintStats](.........\assets\PerformanceProfiling_AssetSize_BlueprintStats.png)

- As you might have noticed on the previous slide, there were a lot of UProperties like Bool or Float Properties

- One thing that we’ve seen before is heavy usage of macros leading to a lot of UProperty objects existing, and slow Garbage Collection times

- The blueprint stats plugin can help you find the blueprints with the most UObjects, so you know where to focus your efforts

  - For each use of a macro in a blueprint graph, any local variables (inputs and outputs) create a UProperty to represent them. So using lots of macros with a lot of inputs and outputs can slow down garbage collection time when those blueprints are loaded.

  - This per-instance cost of macros is not true of blueprint functions, so if you have blueprint macros with a lot of input and output variables that are used in many places, we recommend converting them to blueprint functions

#### **Project-side Optimization for Garbage Collection**

- DisregardGCObject

![PerformanceProfiling_AssetSize_DisregardGCObject](.........\assets\PerformanceProfiling_AssetSize_DisregardGCObject.png)

**1. Enable DisregardGCObject**

[/Script/Engine.GarbageCollectionSettings]

**gc.MaxObjectsNotConsideredByGC=1**

gc.SizeOfPermanentObjectPool=0

**2. When enabled, You can see the following log messages at boot time**

LogUObjectArray: **52083** objects as part of root set at end of initial load.

LogUObjectAllocator: **9937152** out of 0 bytes used by permanent object pool.

**3. Set the 2 parameters to the 2 values you got above.**

[/Script/Engine.GarbageCollectionSettings]

gc.MaxObjectsNotConsideredByGC= **52083**

gc.SizeOfPermanentObjectPool= **9937152**

- GC Clustering

![1556152930143](.........\assets\1556152930143.png)

Concept:

Try to cluster UObjects to decrease check costs.

Note: GC Clustering doesn’t improve delete costs.

This presentation discusses two kinds of clustering,

Actor Clustering

- Actors can be put in a cluster with the level they belong to, and just removed when the level is removed
- There is a setting for this, which is only enabled by default for static meshes and reflection captures

![PerformanceProfiling_AssetSize_Clustering](.........\assets\PerformanceProfiling_AssetSize_Clustering.png)

- Clustering runs when actors are added to the scene (during AddtoWorld()), so new references to this object can’t be added afterwards
- This can happen, for example, if you later load a sequencer sequence that references a static mesh
- In development builds there are warnings to help you correct the problem if you accidentally break that rule

### Blueprint Clustering.

- In general, Blueprint objects have a lot of UObjects (especially UProperties).

- So UObjects for each Blueprint should be an effective optimization

- “Blueprint clustering has been enabled for Fortnite, which has significantly reduced garbage collection mark times (measured from ~66ms to ~22ms on PS4). Also made significant performance improvements to cluster verification code used in development builds, and started work on a technique that moves clustered objects into the disregard-to-GC pool for a faster early out during the scan.”
