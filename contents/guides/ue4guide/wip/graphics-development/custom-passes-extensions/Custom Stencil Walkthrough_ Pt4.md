Stencil Layers
==============

 

Properties to expose:

L1\_StencilMesh.twosided (Handled

L1\_StencilMesh.reverse

 

Prepass:

Draw L0\_Geo

 

Draw L1\_StencilMesh

: depth cmp &lt;= L1\_StencilMesh.bNotInDbgForceAlways ? near : always

: depth write = L1\_StencilMesh.bIsAnotherWorldPorthole ? infinity : keep

: stencil\_write = L1\_StencilRef

: stencil\_cmp &gt;= L0\_StencilRef

 

Draw L1\_Geo:

: depth cmp &lt;= near

: depth\_write = fragment\_depth

: stencil cmp == StencilRef\_L1

: stencil\_write = Keep

 

Draw L2\_StencilMesh

: depth cmp &lt;= L2\_StencilMesh.bNotInDbgForceAlways ? near : always

: depth\_write = L2\_StencilMesh.bIsAnotherWorldPorthole ? infinity : keep

: stencil\_write = L2\_StencilRef

: stencil\_cmp =&gt;

if L2\_StencilMesh.bIsScopedToPreviousLayer

? GreaterOrEq to StencilRef\_L2

: Always

 

Draw L2\_Geo:

: depth cmp &lt;= near

: depth\_write = fragment\_depth

: stencil cmp == StencilRef\_L2

: stencil\_write = Keep

  

FINAL LAYER:

: depth cmp &lt;= near

: Avatar/Asteroids

 

Question:

: What happens when you're inside?

: Avatar hands?

: Objects that cross the boundary of portal

 

Basepass:

Draw everything with depth\_cmp = equal  

Translucents:  
Draw everything in its already sorted back-to-front order, Because this pass hasn't primed the depth we can't use depth\_cmd = equal to scope. We need to just let these draw and rely on artist constraints to stop particles/transparents from crossing the portal boundaries unless intended that way (smoke pouring out a hell portal for example).

