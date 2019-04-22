---
title:  "Gamedev Development Environment Part 1"
pageSubTitle: A Yak Shaving for fun & profit series™
sideMenuHeading: "Part 1: Hardware"
---

# Part I: Hardware - Extremely Highend

**TLDR:** Threadripper 2 high-end dev/workstation build, 2990 vs 1950x perf numbers, compatibility issues,  [@UnrealEngine](https://twitter.com/UnrealEngine)  fastbuild integration, my poor mans' automating/baremetal provisioning, and the programs I use*

After many years of holding out, I finally had to upgrade my dev machine to Win10 so figured it was as good a time to refresh my machine + consolidate the studio machines. Here's the rat hole I went down for two weeks chasing compat issues, msvc compiler bugs, and solutions



Here's everything that finally worked together:  [PC PartPicker Hardware List](https://pcpartpicker.com/user/123janus123/saved/ZwJD23). Key parts:
- 2990WX that can be comfortably overclocked to 3.8ghz
- 64 gb RAM overclocked to 2933
- Main drive: Intel Optane
  - If money isn’t an issue, I can’t recommend enough the intel optane drive for main + ssd raid for second drive. It’s like an order of mag faster and makes day to day feel transformative
  - *What're the build improvements for optane?*
    - I'd say depends on what baseline is. Assuming src is built on optane drive: Optane vs HD - massive benefit Optane vs. SSD vs Raid-0 SSD - hard to say sans measuring. I noticed a massive improvement but that's colored by the terrible amd raid driver issue
    - Also depends on CPU (32-core beast vs 4 core) & how multi-threaded your build is (msvc 2015 horrible, msvc2017 decent, fastbuild/incredibuild is great) That would all affect how much of a bottleneck your disk is going to be but really would need to measure since too many factors
    - Biggest benefit of optane is insanely fast (3x more than next fastest ssd) random access read/writes with 4k blocks, 1 thread, quedepth 1. Net result is making it the primary drive makes windows "feel" a lot snappier
- Fast block storage drive: Raid-0 NVMe SSD x4

Ryzen  has lots of PCI lanes but mobo pcie slots are not all x16. Lots of trial & error but optimal cfg:
- 2080ti goes in top PCIe
- 1070 goes in 2nd PCIe
  - *Why A Second Card?* Mainly for live shader debugging/register inspection on single machine + I had a spare card. Other hopeful benefit is for mgpgpu stuff (houdini cloth sims) but I don't have concrete evidence lots of programs written for that outside of [RedShift + Octane](https://www.pugetsystems.com/labs/articles/GeForce-RTX-2080-Multi-GPU-Scaling-in-OctaneRender-and-Redshift-1258/)
- ASRock M2 Raid card in slot3 (need x16 for Raid-0 SSD)
- Optane in bottom
- Airflow setup in pic \
  ![](https://pbs.twimg.com/media/DuVGeo3UwAAAspV.jpg)

# Compatibility gremlins:

## HPET
Disable hpet; it causes inordinate perf problems.

- Batch command: `batch>bcdedit /deletevalue useplatformclock`

- Some bios allow you to disable that in bios

- Credit to  [@SebAaltonen](https://twitter.com/SebAaltonen/status/1001045044567126018)  for root causing this.
  > Finally found a solution to my Threadripper performance woes. If I disable HPET (bcdedit /deletevalue useplatformclock) I get 2x SSD iOPS boost, UE4 editor with RenderDoc plugin active has 4x higher frame rate and VTune becomes usable. Visual Studio stalls are also reduced.


## Raid-0 NVMe SSD

Do not install AMD Raid Xpert2 driver/chipset. It's atrocious; use the standard windows one. Means you can't have your OS on an SSD raid but Optane is better anyway

Details: [ASRock Ultra Quad M.2 Card & AMD RAIDXpert Benchmark](https://www.tweaktown.com/reviews/8542/asrock-ultra-quad-2-card-16-lane-aic-review/index10.html)

## Houdini 17.0
[Houdini 17.0](https://threadreaderapp.com/hashtag/Houdini) will crash with nVidia drivers have a clash and houdini won't recognize your cards as cuda devices. This has been fixed in the latest [drivers](https://www.sidefx.com/forum/topic/59264/)


# Memory
- Rule of thumb is 2gb per core. For building UE4, I have to limit number of threads < 64 as I run out of memory and stuff starts paging out to disk
- Intel Optane drive is so fast it took me a bit to discover since the perf didn't tank an order of magnitude
- Get Samsung B-Die & buy kits together as mfg only guarantees timings for kits (eg get a kit of 16gbx4 vs 4 separate 16gb of same model) ([benzhaomin.github.io/bdiefinder/](https://benzhaomin.github.io/bdiefinder/))
- TR needs fast memory (also NUMA arch with only 4 mem channels for 8 dies)
- Reliably can only OC up to 2933mhz (officially 2133 iirc)
- *conjecture* Past certain point, pushing memspeed is net loss esp. since hw errors induced from very tight memory/CPU timings >> latency stalls from CPU requesting memory in a Quad Channel config



# Overclocking
## Easy Mode
AMD made it really easy with [RyzenMaster](https://www.amd.com/en/technologies/ryzen-master)
- Allows you to control clock settings
- Whether to force turn on or use Precision Boost Override 2 and define range of dynamic scaling
- *NOTE*: Some settings dont persist on restart

[**Precision Boost Overdrive 2**](https://community.amd.com/community/gaming/blog/2018/08/13/understanding-precision-boost-overdrive-in-three-easy-steps) seems pretty great and allows for dynamic scaling switching at a much granular timeslice


[**Dynamic Local Mode**](https://community.amd.com/community/gaming/blog/2018/10/05/previewing-dynamic-local-mode-for-the-amd-ryzen-threadripper-wx-series-processors) which is auto-pinning your threads to core die that has local memory access to deal with NUMA arch of ryzen

I'm always suspect of these things but windows scheduler def. has issues. More on that later

## Medium Mode (what I use)
Dead simple:
- Just set clock multiplier to 38
- CPU voltage at 1.25
- Memory to 2933 with 1.35v
- *NOTE*: TR has a thermal ceiling of 69° before it'll start throttling

## Expert mode:
Here's a [Overclocking Threadripper Guide](https://www.guru3d.com/articles-pages/amd-ryzen-threadripper-2990wx-review,31.html). Some advanced notes:
- [Use Ryzen Timing Checker](https://www.techpowerup.com/download/ryzen-timing-checker/)
- [DRAM calculator](https://www.techpowerup.com/download/ryzen-dram-calculator/) to push your memory overclock to extreme
(imho, this is a losing proposition and not worth the effort)
- Here's a tutorial:
  `youtube: https://www.youtube.com/watch?v=1GTekAB1Zzc`

# OC software:

## Tools
- **HWInfo:** Best detailed info on all sorts of sensors & summary rolled into one
- **GPU Caps Viewer:** GPU capabilities

## Benchmark:
- **CPU:** Aida64Extreme, CineBench, Indigo Benchmark
- **SSD:** Anvil SSD, ATTO, CrystalDiskMark

## Stability:
- **PassmarkBurnIn**
- **AidaExtreme**
![](https://pbs.twimg.com/media/DuVUoGgVAAAGFwR.jpg)

BIG Shout out to [@**Level1Techs**](https://twitter.com/Level1Techs) ; hands down the best hw channel for technical people:
`youtube: https://www.youtube.com/watch?v=5u6DY8On1XA`