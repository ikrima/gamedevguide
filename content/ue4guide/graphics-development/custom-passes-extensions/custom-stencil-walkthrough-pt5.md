---
sortIndex: 7
sidebar: ue4guide
---

DONE: LODDither not tested.

DONE: Parallel render paths need updated to work.

DONE: bSafeToUseUnifiedMesh needs to be looked at, using any MD_ArenaSurface objects in it causes issues.

DONE: There is a single viewport stencil clear used in FSceneRenderTargets::BeginRenderingTranslucency that needs commented out to work in VR mode.

DONE: Current implementation will result in higher layers stomping over lower ones in the base-pass if their depth is equal to an object in the lower layer, the current workaround is to offset depth slightly.

TODO: TemporalAA not tested.

Generate_StencilMask_DepthTest: {T,F}

Composite_StencilMask_Func:

PrvLayerMask: {Ignore|Invert|Src}

CurLayerMask:

MaskOp: MaskStencilPass_MaskDepthPass, MaskStencilPass_MaskDepthPass

====================

DepthEnable: {True, False}

DepthWriteMask: 8bits

Cmp: {False, True, !=, ==, &lt;, >=, >, >= }

StencilEnable: {True, False}

StencilReadMask: 8bits

StencilWriteMask: 8bits

FrontFacingPoly:

StencilFail_Depth\*: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}

StencilPass_DepthFail: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}

StencilPass_DepthPass: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}

BackFacingPoly:

StencilFail_Depth\*: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}

StencilPass_DepthFail: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}

StencilPass_DepthPass: {OP_KEEP, OP_ZERO, OP_REPLACE, OP_INCR_SAT, OP_DECR_SAT, OP_INVERT, OP_INCR, OP_DECR}
