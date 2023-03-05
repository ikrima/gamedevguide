---
sortIndex: 4
sidebar: ue4guide
---

Key functions:

- **CalculateVolumeSampleIncidentRadiance():** Main function

**For volumetric irradience brick:**

**SetFromVolumeLightingSample():** Defines spherical harmonic encoding of what gets stored in the lightmap

```cpp
/*

 SH directional coefficients can be normalized by their ambient term, and then ranges can be derived from SH projection

 This allows packing into an 8 bit format

 [-1, 1] Normalization factors derived from SHBasisFunction

 Result.V0.x = 0.282095f;

 Result.V0.y = -0.488603f * InputVector.y;

 Result.V0.z = 0.488603f * InputVector.z;

 Result.V0.w = -0.488603f * InputVector.x;

 half3 VectorSquared = InputVector * InputVector;

 Result.V1.x = 1.092548f * InputVector.x * InputVector.y;

 Result.V1.y = -1.092548f * InputVector.y * InputVector.z;

 Result.V1.z = 0.315392f * (3.0f * VectorSquared.z - 1.0f);

 Result.V1.w = -1.092548f * InputVector.x * InputVector.z;

 Result.V2 = 0.546274f * (VectorSquared.x - VectorSquared.y);

 */

 // Note: encoding behavior has to match CPU decoding in InterpolateVolumetricLightmap and GPU decoding in GetVolumetricLightmapSH3

 FLinearColor CoefficientNormalizationScale0(

 0.282095f / 0.488603f,

 0.282095f / 0.488603f,

 0.282095f / 0.488603f,

 0.282095f / 1.092548f);

 FLinearColor CoefficientNormalizationScale1(

 0.282095f / 1.092548f,

 0.282095f / (4.0f * 0.315392f),

 0.282095f / 1.092548f,

 0.282095f / (2.0f * 0.546274f));

 for (int32 ChannelIndex = 0; ChannelIndex < 3; ChannelIndex++)

 {

 const float InvAmbient = 1.0f / FMath::Max(Sample.HighQualityCoefficients[0] [ChannelIndex], .0001f);

const FLinearColor Vector0Normalized =

 FLinearColor(Sample.HighQualityCoefficient [1] [ChannelIndex], Sample.HighQualityCoefficients [2] [ChannelIndex], Sample.HighQualityCoefficients[3] [ChannelIndex], Sample.HighQualityCoefficients [4] [ChannelIndex])

 \* CoefficientNormalizationScale0

 \*FLinearColor(InvAmbient, InvAmbient, InvAmbient, InvAmbient);

 SHCoefficients\[ChannelIndex \* 2 + 0]\[Index] = (Vector0Normalized \* FLinearColor(.5f, .5f, .5f, .5f) + FLinearColor(.5f, .5f, .5f, .5f)).QuantizeRound();

const FLinearColor Vector1Normalized =

FLinearColor(Sample.HighQualityCoefficients\[5]\[ChannelIndex], Sample.HighQualityCoefficients\[6]\[ChannelIndex], Sample.HighQualityCoefficients\[7]\[ChannelIndex], Sample.HighQualityCoefficients\[8]\[ChannelIndex])

\* CoefficientNormalizationScale1

\* FLinearColor(InvAmbient, InvAmbient, InvAmbient, InvAmbient);

SHCoefficients\[ChannelIndex \* 2 + 1]\[Index] = (Vector1Normalized \* FLinearColor(.5f, .5f, .5f, .5f) + FLinearColor(.5f, .5f, .5f, .5f)).QuantizeRound();

}
```

- GatherVolumeImportancePhotonDirections()

- CalculateApproximateDirectLighting()

- IncomingRadianceAdaptive()

```cpp
/**

* Precomputed lighting volumes in the scene, used for interpolating dynamic object lighting.

* These are typically one per streaming level and they store volume lighting samples computed by Lightmass.

*/

TArray<const FPrecomputedLightVolume*> PrecomputedLightVolumes;

/** Interpolates and caches indirect lighting for dynamic objects. */

FIndirectLightingCache IndirectLightingCache;

FVolumetricLightmapSceneData VolumetricLightmapSceneData;

/**

* Represents the Volumetric Lightmap for a specific ULevel.

*/

class FPrecomputedVolumetricLightmap

/**

* The light incident for a point on a surface, in the representation used when gathering lighting.

* This representation is additive, and allows for accumulating lighting contributions in-place.

*/

template <int32 SHOrder>

class TGatheredLightSample

/** Lighting for a point in space. */

class FVolumeLightingSampleData

{

public:

/** World space position and radius. */

FVector4 PositionAndRadius;

/** SH coefficients used with high quality lightmaps. */

float HighQualityCoefficients [LM_NUM_SH_COEFFICIENTS] [3];

/** SH coefficients used with low quality lightmaps. */

float LowQualityCoefficients [LM_NUM_SH_COEFFICIENTS] [3];

FVector SkyBentNormal;

/** Shadow factor for the stationary directional light. */

float DirectionalLightShadowing;

};
```
