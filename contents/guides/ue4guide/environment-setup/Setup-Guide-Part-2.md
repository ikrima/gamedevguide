---
title:  "Gamedev Development Environment Part 2"
pageSubTitle: A Yak Shaving for fun & profit series™
sideMenuHeading: "Part 2: OS Config"
sortIndex: 1
---
# Part II: One weird trick to get a 70% performance boost
[![](https://pbs.twimg.com/media/DuuPHAbV4AAW5V0.jpg)]

***TLDR**: Setting your CPU affinity off of Core 0/1 sometimes gets you a big perf boost. Windows scheduler was not designed with high NUMA core counts in mind
You can use powershell scripts (Start /affinity [mask] “” [executable]) or if you're like me, use ProcessLasso*

# Windows Scheduler Pains
Was seeing some very terrible performance behavior on TR2 where it was worse than TR1 or other small core count CPUs.  After investigating on the net, turns out there's lots of contention on Core 0/1 with Windows

Also bizarre that even in cases where an app/benchmark was using all cores, there was still a noticeable perf improvement.  Not sure about internals of windows scheduler but even in NUMA aware mode, there seems to be a benefit in explicitly pinning PIDS

AMD added ***"Dynamic Local Mode"*** to auto pin threads to the die with fastest local memory access based on CPU usage. Here's the memory layout of TR2 and more details from [AMD on Dynamic Local Mode](https://community.amd.com/community/gaming/blog/2018/10/05/previewing-dynamic-local-mode-for-the-amd-ryzen-threadripper-wx-series-processors)

[![](https://pbs.twimg.com/media/DuuS6WaVYAIcBJk.jpg)](https://pbs.twimg.com/media/DuuS6WaVYAIcBJk.jpg)

*(Conjecture)* Possible causes for schedule wars: context switches sys calls post-spectre world are expensive (iirc, intel hard flushes l1 cache). Possible that context switching on pinned PIDs does not due this but this is more for [@markrussinovich](https://twitter.com/markrussinovich) or [@BruceDawson0xB](https://twitter.com/BruceDawson0xB) domain

Also interesting seeing the PCIe channel access to the numa nodes. Here's an lstopo diagram (which runs on windows too!)

![](https://pbs.twimg.com/media/DuuTwiYVYAAFH-R.jpg)

For more detailed deep dives:
- [CPU 0: Playing Scheduler Wars with AMD’s Threadripper 2990WX](https://www.anandtech.com/show/13446/the-quiz-on-cpu-0-playing-scheduler-wars-with-amds-threadripper-2990wx)
- [@Level1Techs](https://twitter.com/Level1Techs) `youtube: https://www.youtube.com/watch?v=WSSAFqzbKgg`

Finally, at least on my mobo, changing DRAM memory interleaving and interleaving size didn't make a perf impact but * *caveat* * I didn't extensively test