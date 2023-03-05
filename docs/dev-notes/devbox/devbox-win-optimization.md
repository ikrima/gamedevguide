# Devbox Windows OS Optimization

![](../../ue4guide/_assets/devbox-setup-cpu-affinity-benchmark.jpg)

**TLDR**: Setting your CPU affinity off of Core 0/1 sometimes gets you a big perf boost. Windows scheduler was not designed with high NUMA core counts in mind
You can use powershell scripts (`start /affinity [mask] [executable]`) or if you're like me, use [ProcessLasso](https://bitsum.com/)

## Windows Scheduler Pains

Was seeing some very terrible performance behavior on TR2 where it was worse than TR1 or other small core count CPUs. After investigating on the net, turns out there's lots of contention on Core 0/1 with Windows

Also bizarre that even in cases where an app/benchmark was using all cores, there was still a noticeable perf improvement. Not sure about internals of windows scheduler but even in NUMA aware mode, there seems to be a benefit in explicitly pinning PIDS

AMD added _**Dynamic Local Mode**_ to auto pin threads to the die with fastest local memory access based on CPU usage.
Here's the memory layout of TR2 and more details from [AMD on Dynamic Local Mode](https://community.amd.com/community/gaming/blog/2018/10/05/previewing-dynamic-local-mode-for-the-amd-ryzen-threadripper-wx-series-processors)
![](../../ue4guide/_assets/devbox-setup-tr2-interconnect.jpg)

_**conjecture**_ Possible causes for schedule wars: context switches sys calls post-spectre world are expensive (iirc, intel hard flushes l1 cache). Possible that context switching on pinned PIDs does not due this but this is more for [@markrussinovich](https://twitter.com/markrussinovich) or [@BruceDawson0xB](https://twitter.com/BruceDawson0xB) domain

Also interesting seeing the PCIe channel access to the numa nodes. Here's an lstopo diagram (which runs on windows too!)
![](../../ue4guide/_assets/devbox-setup-tr2-topo.jpg)

For more detailed deep dives:

- [CPU 0: Playing Scheduler Wars with AMD's Threadripper 2990WX](https://www.anandtech.com/show/13446/the-quiz-on-cpu-0-playing-scheduler-wars-with-amds-threadripper-2990wx)
- [@Level1Techs](https://twitter.com/Level1Techs) ![](https://www.youtube.com/watch?v=WSSAFqzbKgg)

Finally, at least on my mobo, changing DRAM memory interleaving and interleaving size didn't make a perf impact but _caveat_ I didn't extensively test

## Latency

- Windows Settings
  
  - ⭐ _Graphics → Hardware GPU Scheduling: **On**_
  - ⚠ _Graphics → Variable Refresh Rate:   **On**_
  - ⚠ _Gaming → GameMode:                  **On**_
- Nvidia Control Panel
  
  - ⭐ _Manage 3D Settings → Power management mode:  **Prefer maximum Performance**_
  - ⚠ _Manage 3D Settings → Low Latency mode:       **Ultra**_
  - ⚠ _Setup G-SYNC → Enable G-Sync:                **Fullscreen**_
- Resources
  
  - <https://www.nvidia.com/en-us/geforce/guides/gfecnt/202010/system-latency-optimization-guide>
  - <https://devblogs.microsoft.com/directx/os-variable-refresh-rate/>
  - <https://devblogs.microsoft.com/directx/hardware-accelerated-gpu-scheduling/>
  - <https://blurbusters.com>

## Advanced Windows Tweaks

- <https://djdallmann.github.io/GamingPCSetup/>
- <https://sites.google.com/view/melodystweaks/basictweaks>
