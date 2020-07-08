# TODO

- Fix Debug Views
- TEST: ApplyViewOverridesToMeshDrawCommands & reverseculling overrides
- Package/cook
- ~~Look at #Eng-FIX or #Eng-Workaround~~
- look at UpdateEarlyZPassMode() for how we can cache invalidate stuff so mesh processor can regenerate
- Translucency pass visual bugs
  - Problem with instanced stereo only
- Unneeded sync points
- NOW-422-CHK
- ~~Performance of draw thread~~
  - ~~Superluminal~~
  - ~~Nvidia Nsight~~

# LowPri

## Level Sequence Changes

- NOW-422-Seq
- NOW420_Seq
- Eng-FeatureShading-BBIndirectSpecApprox:
- Eng-FeatureShading-BBIridescentShading:
- Eng-FeatureShading-BBFakeSSShadingMode:
- Eng-FeatureShading-ArenaMaterialDomain:
- Eng-Feature-MiniatureLighting
- \#Eng-DevTool:
- \#Eng-Workaround
- \#Eng-Feature:
- \#Eng-Fix
- TEST: Editor sequencer authoring
- TEST: Sequencer in game mode
- CHECK:
  - GetSequence()/GetBBSequence()
  - C:\\ikrima\\src\\knl\\Bebylon\\UnrealEngine\\BBR\\Source\\BBR\\Private\\World\\Sequencer\\BBProcSeqCaptureSectionTemplate.cpp
  - Spawnregister
    - FLevelSequenceEditorSpawnRegister::PreDestroyObject
    - IMovieSceneObjectSpawner
  - controlrig

~~//IMPORTANT: DO NOT CALL SUPER~~

## LocalLight:  Check for logic changess

## Shading

- FakeSS BBFAKESS_CFG_APPLYTOGI needs directional translucency enabled

## MaterialEditorInstanceDetailCustomization

Needs looking into

```cpp
// @third party code - BEGIN Bebylon - #Eng-Feature: BBIndirectSpecApprox - Approximate indirect specular contribution from Precomputed GI
IDetailPropertyRow& UseBBHQIndirectSpecularPropertyRow = BasePropertyOverrideGroup.AddPropertyRow(UseBBHQIndirectSpecularProperty.ToSharedRef());
```

## MaterialInstance.h

These got moves somwhere else

```cpp
//Cached copies of the base property overrides or the value from the parent to avoid traversing the parent chain for each access.
float OpacityMaskClipValue;
TEnumAsByte<EBlendMode> BlendMode;
TEnumAsByte<EMaterialShadingModel> ShadingModel;
uint32 TwoSided : 1;
// @third party code - BEGIN Bebylon - #Eng-Feature: BBIndirectSpecApprox - Approximate indirect specular contribution from Precomputed GI
uint32 bUseBBHQIndirectSpecular : 1;
// @third party code - END Bebylon
uint32 DitheredLODTransition : 1;
uint32 bCastDynamicShadowAsMasked : 1;
```

# Done

- ~~Test: Material Domain stenciling~~

  - ~~Editor prims~~
  - ~~TEST: Preview world~~
  - ~~Support stencil dithering~~
  - ~~Add Material Domain stenciling~~
  - ~~Parallel Mesh Drawing~~

  ## ~~Stencil Pass~~

  ~~Check refs to ArenaStencilPass~~
  ~~DrawRenderState.SetDepthStencilState~~
  ~~DrawRenderState.SetStencilRef~~
  ~~Check no refs to:~~

  - ~~...Passes\[EMeshPass::~~
  - ~~AddCommandsForMesh~~
  - ~~Perf:~~
    - ~~Add FStaticMeshBatchRelevance::bRenderAsStencilMesh,StencilLayer~~
    - ~~Add FPrimitiveViewRelevance::bRenderAsStencilMesh,StencilLayer~~

  ## ~~Meshing rendering changes~~

  - ~~ShouldIncludeDomainInMeshPass vs IsEquivalentToMDSurface~~
  - ~~FPrimitiveSceneProxy~~

# Useful

```cpp
#if PRECOMPUTED_IRRADIANCE_VOLUME_LIGHTING

  float3 SkyBentNormal = GetVolumetricLightmapSkyBentNormal(SkyOcclusionUV3D);
  SkyVisibility = length(SkyBentNormal);
  NormalizedBentNormal = SkyBentNormal / max(SkyVisibility, .0001f);

#elif HQ_TEXTURE_LIGHTMAP

  // Bent normal from precomputed texture
  float4 WorldSkyBentNormalAndOcclusion = GetSkyBentNormalAndOcclusion(LightmapUV * float2(1, 2), MaterialParameters.SvPosition.xy);
  // Renormalize as vector was quantized and compressed
  NormalizedBentNormal = normalize(WorldSkyBentNormalAndOcclusion.xyz);
  SkyVisibility = WorldSkyBentNormalAndOcclusion.w;


float2 LightmapUV0, LightmapUV1;
    uint LightmapDataIndex;
    GetLightMapCoordinates(Interpolants, LightmapUV0, LightmapUV1, LightmapDataIndex);
    SkyOcclusionUV = LightmapUV0;

    uint VTRequest = 0;
    GetLightMapColorHQ(LightmapUV0, LightmapUV1, LightmapDataIndex, DiffuseDir, MaterialParameters.SvPosition.xy, OutDiffuseLighting, OutSubsurfaceLighting, VTRequest);
```
