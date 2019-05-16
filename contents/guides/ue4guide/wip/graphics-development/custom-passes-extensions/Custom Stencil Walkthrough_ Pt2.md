Notes: STATIC PATH FOR STATICMESHCOMPONENT

AddPrimitive-&gt;

AddPrimitiveSceneInfo\_RenderThread-&gt;

FPrimitiveSceneInfo::AddToScene-&gt;

FPrimitiveSceneInfo::AddStaticMeshes-&gt;

SceneProxy::DrawStaticElements

Collects FMeshBatch elemets and sets flags on them:

 

NOTE: need to update this line

bSafeToUseUnifiedMesh =

!(bAnySectionUsesDitheredLODTransition && !bAllSectionsUseDitheredLODTransition) // can't use a single section if they are not homogeneous

&& Material-&gt;WritesEveryPixel()

&& !Material-&gt;IsTwoSided()

&& !IsTranslucentBlendMode(Material-&gt;GetBlendMode())

&& !Material-&gt;MaterialModifiesMeshPosition\_RenderThread()

&& Material-&gt;GetMaterialDomain() == MD\_Surface;

NOTE: Check everywhere in the code you have (Material-&gt;GetMaterialDomain() == MD\_Surface)

 

NOTE: Re-eval this line of code (StaticMeshRender.cpp)

// Depth pass is only used for deferred renderer. The other conditions are meant to match the logic in FStaticMesh::AddToDrawLists.

// Could not link to "GEarlyZPassMovable" so moveable are ignored.

bUseUnifiedMeshForDepth = ShouldUseAsOccluder() && GetScene().GetShadingPath() == EShadingPath::Deferred && !IsMovable();

Mesh::AddToDrawLists - Add the static mesh to the appropriate draw lists.

NOTE JACKPOT: here's where we add to various drawlists.

Ex: FDepthDrawingPolicyFactory::AddStaticMesh() &

FBasePassOpaqueDrawingPolicyFactory::AddStaticMesh(RHICmdList, Scene, this);

 

FBasePassOpaqueDrawingPolicyFactory::AddStaticMesh

Static (not movable) StaticMeshComponent gets added iff ShouldIncludeDomainInMeshPass(Material-&gt;GetMaterialDomain()) && !IsTranslucentBlendMode(BlendMode)

 

FBasePassOpaqueDrawingPolicyFactory::ProcessBasePassMesh() - this function stores the renderstate for this mesh batch

 

NOTE: If we want to piggy back off the existing drawingpolicies & existing basepasses, extend TBasePassDrawingPolicy() to handle arenamaterial domain

and set the correct stencil render state

 

NOTE: JACKPOT: Also might be able to expand BasePassDrawListTYpe in FDrawBasePassStaticMeshAction::Process&lt;&gt;

enum EBasePassDrawListType

{

EBasePass\_Default=0,

EBasePass\_Masked,

EBasePass\_MAX

};

 

Which means add BasePassUniformLightMapPolicyDrawList, BasePassSelfShadowedTranslucencyDrawList, BasePassSelfShadowedCachedPointIndirectTranslucencyDrawList

variables to FScene as drawlists for our custom geo

 

And extend Scene-&gt;GetBasePassDrawList&lt;LightMapPolicyType&gt;(DrawType);

 

 

BaseDrawingPolicy::

SetSharedState

SetMeshRenderState
