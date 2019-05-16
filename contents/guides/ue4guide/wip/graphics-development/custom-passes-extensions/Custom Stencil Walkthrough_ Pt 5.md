

DONE: LODDither not tested.

DONE: Parallel render paths need updated to work.

DONE: bSafeToUseUnifiedMesh needs to be looked at, using any MD\_ArenaSurface objects in it causes issues.

DONE: There is a single viewport stencil clear used in FSceneRenderTargets::BeginRenderingTranslucency that needs commented out to work in VR mode.

DONE: Current implementation will result in higher layers stomping over lower ones in the base-pass if their depth is equal to an object in the lower layer, the current workaround is to offset depth slightly.

TODO: TemporalAA not tested.

 

 

Generate\_StencilMask\_DepthTest: {T,F}

Composite\_StencilMask\_Func:

PrvLayerMask: {Ignore|Invert|Src}

CurLayerMask:

MaskOp: MaskStencilPass\_MaskDepthPass, MaskStencilPass\_MaskDepthPass

 

====================

DepthEnable: {True, False}

DepthWriteMask: 8bits

Cmp: {False, True, !=, ==, &lt;, &lt;=, &gt;, &gt;= }

StencilEnable: {True, False}

StencilReadMask: 8bits

StencilWriteMask: 8bits

FrontFacingPoly:

StencilFail\_Depth\*: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

StencilPass\_DepthFail: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

StencilPass\_DepthPass: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

BackFacingPoly:

StencilFail\_Depth\*: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

StencilPass\_DepthFail: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

StencilPass\_DepthPass: {OP\_KEEP, OP\_ZERO, OP\_REPLACE, OP\_INCR\_SAT, OP\_DECR\_SAT, OP\_INVERT, OP\_INCR, OP\_DECR}

 

--------------------------------
