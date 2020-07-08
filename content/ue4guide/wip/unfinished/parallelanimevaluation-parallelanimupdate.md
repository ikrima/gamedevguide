---
sidebar: ue4guide
---

# What's the diff between a.ParallelAnimEvaluation & a.ParallelAnimUpdate? 

From <https://twitter.com/ikrimae/with_replies>>\*

Anim graphs are evaluated in three phases: tick, update, evaluate \[1/N]

From <https://twitter.com/ikrimae/status/816803788933591040>>\*

tick is always game thread due to potentially touching other objs. \[2/N]

update actually ticks the nodes and determines final weights / active players for sync groups/etc... \[3/N]

*From <https://twitter.com/ikrimae/status/816803788933591040>*
