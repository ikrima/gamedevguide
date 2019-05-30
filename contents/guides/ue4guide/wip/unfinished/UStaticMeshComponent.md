## UStaticMeshComponent

Have a look at UStaticMeshComponent::GetComponentInstanceData and UStaticMeshComponent::ApplyComponentInstanceData. This is where lightmap data for components created in a construction script are supposed to backup and then restore their static lighting. Most likely something is happening causing the lightmaps to not be restored properly. Otherwise, look for a later call to InvalidateLightingCache and see why that is happening.

*From <https://udn.unrealengine.com/questions/163437/lightasifstatic-with-mf-dynamic-resulting-in-too-m.html>*

Finally, is there a way to disable these static lights insertions without side effects? (without having to rebuild all the lighting without issues)

You can disregard all unbuilt interactions by modifying FLightPrimitiveInteraction::Create, however that's not addressing the root cause.

*From <https://udn.unrealengine.com/questions/245332/ue4-static-light-building-issues.html>*

bool FLightSceneInfo::ShouldRenderLight(const FViewInfo& View) const

/\*\* Encapsulates all View-Independent reasons to have this light render. \*/

bool ShouldRenderLightViewIndependent() const

{

return !Proxy->GetColor().IsAlmostBlack()

// Only render lights with dynamic lighting or unbuilt static lights

&& (!Proxy->HasStaticLighting() || !IsPrecomputedLightingValid());

}

bool IsPrecomputedLightingValid() const;

void CreateLightPrimitiveInteraction(const FLightSceneInfoCompact& LightSceneInfoCompact, const FPrimitiveSceneInfoCompact& PrimitiveSceneInfoCompact);

Lightmapping:

void ApplyLightMapping(FStaticLightingTextureMapping_InstancedStaticMesh\* InMapping, ULevel\* LightingScenario);

FStaticMeshStaticLightingTextureMapping

void FStaticMeshStaticLightingTextureMapping::Apply(FQuantizedLightmapData\* QuantizedData, const TMap&lt;ULightComponent\*,FShadowMapData2D\*>& ShadowMapData, ULevel\* LightingScenario)

UInstancedStaticMeshComponent() as reference for applying custom render/lightmap data based on another primitive

class FLandscapeStaticLightingMesh : public FStaticLightingMesh

/\*\*

\*An interface to cached lighting for a specific mesh.

\*/

class FLightCacheInterface

**Analyze Material Outputs (e.g. users vertexcolor, number of texturecoordcount, etc):**

void UMaterialInterface::AnalyzeMaterialProperty(EMaterialProperty InProperty, int32& OutNumTextureCoordinates, bool& bOutRequiresVertexData)

**Add Render Overlay Extensions:**

ISceneViewExtension

- This is what's used to late latch motioncontroller/hmd transforms

**Custom Lightmap for components and/or referencing the indirect lighting cache in a material:**

- bUseLandscapeLightmap in Landscape GrassType

- InitLandscapeLightmap()

- SetInstance()

  - Code on updating lightmap coords/transforms

  - Also look at StaticInstanceMesh() on how to rotate/transform lightmaps

- FLandscapeGrassLightMap()


- // Make sure root is a StaticMeshComponent:

- USCS_Node\* RootNode = SCS->GetAllNodes()\[0];

- check(RootNode && "SCS Root node was null!");

- UStaticMeshComponent\* SMC = Cast&lt;UStaticMeshComponent>(RootNode->ComponentTemplate);

- check(SMC && "Root was not a static mesh component!");

- USCS_Node\* MyComponentNode = SCS->CreateNode(UMyComponent::StaticClass());

- MyComponentNode->ComponentTemplate->CreationMethod = EComponentCreationMethod::Native;;

- RootNode->AddChildNode(MyComponentNode, false);

- FBlueprintEditorUtils::MarkBlueprintAsStructurallyModified(Blueprint);

*From <https://udn.unrealengine.com/questions/413898/attaching-component-to-a-blueprint-asset-in-c.html>*
