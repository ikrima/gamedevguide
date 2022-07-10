---
sortIndex: 11
sidebar: ue4guide
---

# Reducing Stat System Overhead

- Set these defines to reduce stat system overhead for named events and/or external profilers

  ```cpp
  PLATFORM_USES_ANSI_STRING_FOR_EXTERNAL_PROFILING=1
  ENABLE_STATNAMEDEVENTS_UOBJECT=0
  PLATFORM_LIMIT_PROFILER_UNIQUE_NAMED_EVENTS=1
  SLATE_VERBOSE_NAMED_EVENTS=0
  ```

- You can also set `#!cpp GCycleStatsShouldEmitNamedEvents = true|false` to prevent stat system from emitting cycle stats as named events
  - Passing `-statnamedevents` as a command line argument toggles this on/off as well
