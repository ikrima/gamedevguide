---
sortIndex: 5
---

StaticLightingDebug.cpp:::What goodies lie here?

LightaMapRendering (in Renderer Module): Handles render thread side of lightmaps (setting/creating uniform buffers)

FLightmap/FlightMap2D

 \-GameThread struct containing lightmap data

 \-Contains a reference (LightmapSetBelongsTo) to the lightmap set this lightmap refers to

 \-LightmapSetBelongsTo set when FLightMap struct is allocated

 \-Components handle allocating the FLightmap bookkepping data

 \-Stores references to actual textures for the lightmaps

FLightMapInteraction

 \-Defines interaction between mesh & lightmap

 \-Just stores references to the textures in FlightMap + coefficients

 \-Value struct b/c it gets blitted to the render thread

Registry->AllocateMeshBuildData

 \-This actually creates the MeshMapBuildData struct

 \-This gets written out to a sideband package next to the level (ex: MyHellzoneLevel_BuildData)

FLightMap2D::AllocateLightMap/FLightMap2D::AllocateInstancedLightMap

\-Seems to be called during light builds only

\-Actually allocates the lightmap texture

Components that require static lighting interaction (ex: landscape or staticmesh) have follow this file convention

 \-[ComponentName]Lighting.cpp handles lightmapping functionality

 \-[ComponentName]Rendering.cpp handles rendering

High-level process of baking

Start with StaticLightingManager::UpdateBuildLighting

AllocateLightMap populates PendingLightMaps (static array&lt;FlightMapAllocationGroup> that gets procesed during Encode)

 FlightMapAllocationGroup: Container of set of FLightMapAllocation

 FlightMapAllocationGroup: Allocation of a region of lightmap texture to a specific lightmap

EncodeTextures() takes all the data in the PendingLightMaps allocation groups and turns them into FLightMapPendingTexture

 FLightMapPendingTexture::StartEncoding()

Multiple Lightmaps

r.HighQualityLightMaps

TODO:

 grep GCurrentLightmapSetIndex

 grep LightmapSets

 grep GCurrentILCIndex

 add suffix to engine modification tag @third party code - Bebylon - MultiLightmap

 coalesce cvars & rename to be better

 change forward pass to use precomputed lightmap blends

 store reference to MeshMapBuildDataID for LightmapSetsBelongTo

 rename references of TArray&lt;FLightMapRef> to typedef TArray&lt;FLightMapRef> Lightmapset

FVector PrecomputedLightVolumeOffset = InWorldOffset - FVector(LightBuildLevelOffset);

PrecomputedLightVolume->ApplyWorldOffset(PrecomputedLightVolumeOffset);

void ULevel::OnApplyNewLightingData(bool bLightingSuccessful)

{

 // Store level offset that was used during static light data build

 // This will be used to find correct world position of precomputed lighting samples during origin rebasing

 LightBuildLevelOffset = FIntVector::ZeroValue;

 if (bLightingSuccessful && OwningWorld && OwningWorld->WorldComposition)

 {

 LightBuildLevelOffset = OwningWorld->WorldComposition->GetLevelOffset(this);

 }

}

ULightComponent::IsPrecomputedLightingValid()
