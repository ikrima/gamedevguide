---
sortIndex: 4
---

\* STAT_FrameSyncTime => GT waiting on RT

TaskGraph:

TaskGraphThreadBP

\> TPri_Lowest

TaskGraphThreadNP

\> TPri_BelowNormal: 8 (FPlatformMisc::NumberOfCores())

TaskGraphThreadHP

\> TPri_SlightlyBelowNormal

StatsThread:

FQueuedThreadPool:

GThreadPool:

\> TPri_SlightlyBelowNormal: 14

GBackgroundPriorityThreadPool:

\> TPri_Lowest: 2

GLargeThreadPool: (Editor Only for building lighting etc)

\> TPri_Normal: 14

GIOThreadPool: FPlatformMisc::NumberOfIOWorkerThreadsToSpawn()

GImgMediaThreadPoolSlow

FQueuedThreadPool::Allocate();

FEventPayload
