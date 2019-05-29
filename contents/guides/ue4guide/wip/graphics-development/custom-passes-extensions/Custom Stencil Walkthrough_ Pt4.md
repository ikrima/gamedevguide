---
sortIndex: 6
---

# Stencil Layers

##### Properties to expose:

L1_StencilMesh.twosided (Handled

L1_StencilMesh.reverse

##### Prepass:

Draw L0_Geo

##### Draw L1_StencilMesh

: depth cmp &lt;= L1_StencilMesh.bNotInDbgForceAlways ? near : always

: depth write = L1_StencilMesh.bIsAnotherWorldPorthole ? infinity : keep

: stencil_write = L1_StencilRef

: stencil_cmp >= L0_StencilRef

##### Draw L1_Geo:

: depth cmp &lt;= near

: depth_write = fragment_depth

: stencil cmp == StencilRef_L1

: stencil_write = Keep

##### Draw L2_StencilMesh

: depth cmp &lt;= L2_StencilMesh.bNotInDbgForceAlways ? near : always

: depth_write = L2_StencilMesh.bIsAnotherWorldPorthole ? infinity : keep

: stencil_write = L2_StencilRef

: stencil_cmp =>

​	if L2_StencilMesh.bIsScopedToPreviousLayer

​	? GreaterOrEq to StencilRef_L2

​	: Always

##### Draw L2_Geo:

: depth cmp &lt;= near

: depth_write = fragment_depth

: stencil cmp == StencilRef_L2

: stencil_write = Keep

##### FINAL LAYER:

: depth cmp &lt;= near

: Avatar/Asteroids

##### Question:

: What happens when you're inside?

: Avatar hands?

: Objects that cross the boundary of portal

##### Basepass:

Draw everything with depth_cmp = equal

##### Translucents:

Draw everything in its already sorted back-to-front order, Because this pass hasn't primed the depth we can't use depth_cmd = equal to scope. We need to just let these draw and rely on artist constraints to stop particles/transparents from crossing the portal boundaries unless intended that way (smoke pouring out a hell portal for example).
