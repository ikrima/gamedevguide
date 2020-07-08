---
sortIndex: 5
sidebar: ue4guide
---

**Review:**

Use proper commenting for editor changes:

// @third party code - BEGIN Bebylon - #Eng-Feature: ArenaStencilPass - Comment describing specific change

// @third party code - END Bebylon

Why BBArenaStencilMD? Overkill just to specify a couple of spheres

- Use custom property on static mesh components similar to custom depth/stencil properties

- FStaticMesh::AddToDrawLists(), add a check against stencil geo and don't add it to the basedrawlists

**Are these being used? Remove**

BeginRenderingCustomPrePass()
FinishRenderingCustomPrePass()
DrawPrimsStencilOnly()
DrawPrimsStencilWriteOnlyOnDepthPass()

Fold RenderCustomDepthStencilPrePass() implementation into RenderPrePass()

SetDepthStencilStateForBasePass(): Is this doing the right thing?

- Revert this back to normal and verify it doesn't break

FDeferredShadingSceneRenderer::RenderPrePassView()

\-Do all the arena static lists & dynamic

\-Do all the stadium static lists & dynamic

RenderPrePassViewDynamic()

\-Change to use viewrelevance instead of materialdomain

Extend EBasePassDrawListType

\-FStaticMesh::AddToDrawLists()

\-Extend \*Factory::AddStaticMesh()

​	-In this function, you should add

​	-\*MeshAction::Process()

\-Extend: \*Factory::DrawDynamicMesh()

\-Rely on viewrelevance instead of material domain

To set stencil state: Extend the TBasePassDrawingPolicy:

- SetSharedState() & SetMeshRenderState()

Render Pass Order is incorrect in FDeferredShadingSceneRenderer::RenderBasePassView():

Draw Static arena, draw dynamic arena

Draw Static stadium , dynamic Static

Perf degredation setting stencil state over and over

Follow-up

Tested in VR?

Tested packaged?

Tested Parallel Render Paths?

Searched everywhere MD_Surface & MD_Volume was being referenced?

MeshBatchAndRelevance.GetRenderInMainPass()/ should probably do similar to cache

ShouldIncludeDomainInMeshPass() to find all references
