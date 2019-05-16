### What's the diff between a.ParallelAnimEvaluation & a.ParallelAnimUpdate? 



From &lt;<https://twitter.com/ikrimae/with_replies>&gt;*

 

Anim graphs are evaluated in three phases: tick, update, evaluate \[1/N\]



From &lt;<https://twitter.com/ikrimae/status/816803788933591040>&gt;*

 

tick is always game thread due to potentially touching other objs. \[2/N\]

update actually ticks the nodes and determines final weights / active players for sync groups/etc... \[3/N\]

 

*From &lt;<https://twitter.com/ikrimae/status/816803788933591040>&gt;*

