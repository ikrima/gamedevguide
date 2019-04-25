---
title:  "Gamedev Development Environment Part 3"
pageSubTitle: A Yak Shaving for fun & profit series™
sideMenuHeading: "Part 4: Optimizing UE4 Compile Times"
sortIndex: 3
---
# Part IV: Optimizing Unreal Engine Builds, Visual Studio, and Final Benchmarks

***TLDR***: Optimal config for UE4:
- [2990WX|Optane|Stashed]::UBT Parallel Executor
[UE4|DevEditor]
- Clean: 720s
- Build (no changes): 5.3s (wtf)
- Clean + Rebuild (with caching): 120s

# SSD results:
Here you can see the optane driver really shining with 4k *unthreaded* *single queue depth* random read/write latency. This is just amazing.

However, it performs just ok for high sequential block access (which can be threaded with quedepths of 32 in practice) \
![](https://pbs.twimg.com/media/Du5XQgTUUAA4mRX.jpg)

Here's the SSDx4 in Raid-0 and a single SSD \
![](https://pbs.twimg.com/media/Du5YTDwU8AA6f7d.jpg) \
![](https://pbs.twimg.com/media/Du5YW7UVYAA21vW.jpg)

# Other benchmarks

Indigo Benchmark \
![](https://pbs.twimg.com/media/Du5Y5aKUUAAdL5T.jpg)

AIDA Cache & Memtest Benchmark \
![](https://pbs.twimg.com/media/Du5Y6bpUUAIq9ld.jpg)

# UE4 build times:
Machines:
- 2990WX: -3.8ghz -64gb
- 1950: -3.8ghz -32GB
- i7-5960X: -3.0ghz -64gb

Configs tested:
- {UBT, Fastbuild}
- {PCH,NoPCH}
- {NonUnity, AdaptiveUnity, Unity}
- {NoCaching, Fastbuild caching, [stashed.io](http://stashed.io))
- {local caching, distributed}

Result: Using Fastbuild ended up being marginally better than just single threadripper + compiler caching

Fastbuild requires NoPCH (necessary bc compiler bug) which creates way more work that cancels out the benefit of distributed machines. Also, it was a PITA to get working

I guess if you had enough machines it could win out. Also, probably my fastbuild generator could be made better but I got so frustrated with a million things going wrong by the end I was just hate programming that extension. Will through up on github

[stashed.io](http://stashed.io) doesn't distribute its compiler cache without some extra work (have fun symlinking everything so paths match). BUT, by far this is the biggest win especially since it's ZERO config. Literally three clicks and you're automatically running

***So for optimal(simplicity x build times), I just use my single threadripper machine + local compiler caching on my raid-0 4x SSD.*** I also love this because rolling it out to distributed team and we don't have to wrestle with how to get them multiple machines.

Here's all the results:


LLVM: 14min to compile these settings from llvm-project monorepo \
![](https://pbs.twimg.com/media/Du-I9AXUcAQi_S_.jpg)

UE4 Build Benchmark Results: (a bit disorganized bc I only realized halfway through to save them to post)
```
Optane Drive
Full Build:
        4>Deploying UE4Editor Win64 Development...
        4>Total build time: 723.65 seconds (Parallel executor: 671.36 seconds)
        ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


No-Change Build optane: 4.89 seconds
        4>Deploying UE4Editor Win64 Development...
        4>Total build time: 105.59 seconds (Parallel executor: 53.23 seconds)
        ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


Raid SSD:
Full Build:
    4>Deploying UE4Editor Win64 Development...
    4>Total build time: 726.04 seconds (Parallel executor: 673.76 seconds)
    ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========

Clean Rebuild:
    120s

No Change:
    4.5s


WITH PCH+Fastbuild:
Full Build:
    4>--- Summary -----------------------------------------------------
    4>                                 /----- Cache -----\
    4>Build:          Seen    Built   Hit     Miss    Store   CPU
    4> - File       : 30920   1904    -       -       -       0.138s
    4> - Library    : 608     608     -       -       -       9m 51.041s
    4> - Object     : 1298    1298    0       1258    1258    17h:43m 25.496s
    4> - Alias      : 1       1       -       -       -       0.000s
    4> - Exe        : 2       2       -       -       -       4.061s
    4> - Compiler   : 2       2       -       -       -       0.015s
    4> - DLL        : 607     607     -       -       -       46m 53.033s
    4> - ObjectList : 1281    1281    -       -       -       0.000s
    4>Cache:
    4> - Hits       : 0 (0.0 %)
    4> - Misses     : 1258
    4> - Stores     : 1258
    4>Time:
    4> - Real       : 19m 33.634s
    4> - Local CPU  : 18h:40m 13.781s (57.3:1)
    4> - Remote CPU : 9h:38m 48.820s (29.6:1)
    4>-----------------------------------------------------------------
    4>FBuild: OK: all
    4>Time: 19m 33.960s
    4>Object Linking Finished. Execution Time: 1174113
    4>[0/4] Copy tbb.dll
    4>[1/4] Copy libfbxsdk.dll
    4>[2/4] Copy embree.2.14.0.dll
    4>[3/4] Copy tbbmalloc.dll
    4>Deploying UE4Editor Win64 Development...
    4>Total build time: 1240.24 seconds (FASTBuild executor: 1181.72 seconds)
    ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


Clean PCH Rebuild + Fasttbuild:
    4>FBuild: OK: all
    4>Time: 3m 31.833s
    4>Object Linking Finished. Execution Time: 211988
    4>Deploying UE4Editor Win64 Development...
    4>Total build time: 265.33 seconds (FASTBuild executor: 219.53 seconds)
    ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========





Fastbuild, ProcMult x2, FBuildCaching, Ryzen2,Ryzen, Talon, bebytal-02, bDisableDebugInfoForGeneratedCode, disablepch,
bAdaptiveUnityDisablesPCH=true, (with monitor and upping core counts of slave machines)
Full Build:
    2>--- Summary -----------------------------------------------------
    2>                                 /----- Cache -----\
    2>Build:          Seen    Built   Hit     Miss    Store   CPU
    2> - File       : 30316   1318    -       -       -       0.000s
    2> - Object     : 1306    1306    0       1300    1300    10h:28m 39.656s
    2> - Alias      : 1       1       -       -       -       0.000s
    2> - Compiler   : 2       2       -       -       -       0.015s
    2> - ObjectList : 946     946     -       -       -       0.000s
    2>Cache:
    2> - Hits       : 0 (0.0 %)
    2> - Misses     : 1300
    2> - Stores     : 1300
    2>Time:
    2> - Real       : 11m 56.823s
    2> - Local CPU  : 10h:28m 39.672s (52.6:1)
    2> - Remote CPU : 5h:15m 15.848s (26.4:1)
    2>-----------------------------------------------------------------
    2>FBuild: OK: all
    2>Time: 11m 57.013s
    2>Object Compilation Finished. Execution Time: 717136
    2>Linking Objects
    2>Dispatching FastBuild: FastBuildRootPath: C:/knl_v/VFBuild/FBuild/FBuild.exe


Clean + rebuild with FBuildCache
    4>--- Summary -----------------------------------------------------
    4>                                 /----- Cache -----\
    4>Build:          Seen    Built   Hit     Miss    Store   CPU
    4> - Exec       : 1217    1217    -       -       -       30m 18.027s
    4> - File       : 2       2       -       -       -       0.000s
    4> - Alias      : 1       1       -       -       -       0.000s
    4>Cache:
    4> - Hits       : 0 (0.0 %)
    4> - Misses     : 0
    4> - Stores     : 0
    4>Time:
    4> - Real       : 46.344s
    4> - Local CPU  : 30m 18.027s (39.2:1)
    4> - Remote CPU : 0.000s (0.0:1)
    4>-----------------------------------------------------------------
    4>FBuild: OK: all
    4>Time: 46.495s
    4>Object Linking Finished. Execution Time: 46547
    4>[0/4] Copy libfbxsdk.dll
    4>[1/4] Copy embree.2.14.0.dll
    4>[2/4] Copy tbb.dll
    4>[3/4] Copy tbbmalloc.dll
    4>Deploying UE4Editor Win64 Development...
    4>Total build time: 205.04 seconds (FASTBuild executor: 141.20 seconds)
    ========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


DISORGANIZED DATA DISORGANIZED DATA DISORGANIZED DATA DISORGANIZED DATA


Parallel Executor, ProcMult x 2
4>Deploying UE4Editor Win64 DebugGame...
4>Total build time: 704.91 seconds (Parallel executor: 644.47 seconds)
========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


Fastbuild, ProcMult x2, Ryzen2

4>--- Summary -----------------------------------------------------
4>                                 /----- Cache -----\
4>Build:          Seen    Built   Hit     Miss    Store   CPU
4> - CopyFile   : 613     613     -       -       -       4.676s
4> - File       : 30861   1907    -       -       -       0.047s
4> - Library    : 608     608     -       -       -       3m 18.427s
4> - Object     : 1298    1298    0       1296    1296    1 days, 6h:33m 15.914s
4> - Alias      : 1       1       -       -       -       0.000s
4> - Exe        : 609     609     -       -       -       38m 17.797s
4> - Compiler   : 2       2       -       -       -       0.019s
4> - ObjectList : 1281    1281    -       -       -       0.000s
4>Cache:
4> - Hits       : 0 (0.0 %)
4> - Misses     : 1296
4> - Stores     : 1296
4>Time:
4> - Real       : 30m 2.555s
4> - Local CPU  : 1 days, 7h:14m 56.875s (62.4:1)
4> - Remote CPU : 0.000s (0.0:1)
4>-----------------------------------------------------------------
4>FBuild: OK: all
4>Time: 30m 2.879s
4>Deploying UE4Editor Win64 DebugGame...
4>Total build time: 1856.14 seconds (FASTBuild executor: 1804.41 seconds)
4>Done building project "UE4.vcxproj".
========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


Fastbuild, ProcMult x2, Ryzen2, Ryzen, Talon
4>--- Summary -----------------------------------------------------
4>                                 /----- Cache -----\
4>Build:          Seen    Built   Hit     Miss    Store   CPU
4> - CopyFile   : 613     613     -       -       -       8.156s
4> - File       : 30861   1907    -       -       -       0.011s
4> - Library    : 608     608     -       -       -       3m 4.705s
4> - Object     : 1298    1298    0       1279    0       15h:2m 40.969s
4> - Alias      : 1       1       -       -       -       0.000s
4> - Exe        : 609     609     -       -       -       36m 54.247s
4> - Compiler   : 2       2       -       -       -       0.019s
4> - ObjectList : 1281    1281    -       -       -       0.002s
4>Cache:
4> - Hits       : 0 (0.0 %)
4> - Misses     : 1279
4> - Stores     : 0
4>Time:
4> - Real       : 17m 6.968s
4> - Local CPU  : 15h:42m 48.109s (55.1:1)
4> - Remote CPU : 11h:2m 47.324s (38.7:1)
4>-----------------------------------------------------------------
4>FBuild: OK: all
4>Time: 17m 7.294s
4>Deploying UE4Editor Win64 DebugGame...
4>Total build time: 1092.92 seconds (FASTBuild executor: 1028.85 seconds)
4>Done building project "UE4.vcxproj".
========== Build: 4 succeeded, 0 failed, 0 up-to-date, 0 skipped ==========


Fastbuild-new, 4x, Ryzen2
2>--- Summary -----------------------------------------------------
2>                                 /----- Cache -----\
2>Build:          Seen    Built   Hit     Miss    Store   CPU
2> - Exec       : 1217    1217    -       -       -       21m 23.757s
2> - File       : 2       2       -       -       -       0.000s
2> - Alias      : 1       1       -       -       -       0.000s
2>Cache:
2> - Hits       : 0 (0.0 %)
2> - Misses     : 0
2> - Stores     : 0
2>Time:
2> - Real       : 53.633s
2> - Local CPU  : 21m 23.757s (23.9:1)
2> - Remote CPU : 0.000s (0.0:1)
2>-----------------------------------------------------------------
2>FBuild: OK: all
2>Time: 53.781s
2>Object Linking Finished. Execution Time: 53841
2>Deploying UE4Editor Win64 Development...
2>Total build time: 750.04 seconds (FASTBuild executor: 702.27 seconds)
========== Build: 2 succeeded, 0 failed, 2 up-to-date, 0 skipped ==========
```
