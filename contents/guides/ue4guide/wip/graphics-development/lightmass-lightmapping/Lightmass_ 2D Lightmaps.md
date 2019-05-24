---
sortIndex: 3
---

**ConvertToLightSampleHelper:**

- Calculate Luma L1SH vector

- Apply SH Normalization to factor out L0 term

float DirCorrection = 1.0f / FMath::Max( 0.0001f, InGatheredLightSample.SHCorrection );

DirLuma[i] *= DirCorrection / PI;



- SHCorrection is a normalization factor. Done to normalize SH vector s.t. luminance(irradiance) (Not radiance) at smoothed vertex normal = 1

  // Evaluate lighting along the smoothed vertex normal direction, so that later we can guarantee an SH intensity of 1 along the normal

  // These scaling coefficients are SHBasisFunction and CalcDiffuseTransferSH baked down

  // 0.325735f = 0.488603f from SHBasisFunction * 2/3 from CalcDiffuseTransferSH

  // Only using V[2] which is the tangent space Z

  FSHVector2 SH = FSHVector2::SHBasisFunction(TangentDirection);

  Result.SHCorrection = Color.GetLuminance() * (0.282095f * SH.V[0] + 0.325735f * SH.V\[2]);

  Result.IncidentLighting = Color * FMath::Max(0.0f, TangentDirection.Z);

  

- Apply SH scale/bias normalization so that L0 == 1

  float DirScale = 1.0f / FMath::Max( 0.0001f, DirLuma[0] );

  float ColorScale = DirLuma[0];

  

  // IncidentLighting is ground truth for a representative direction, the vertex normal

  OutCoefficients\[0]\[0] = ColorScale * InGatheredLightSample.IncidentLighting.R;

  OutCoefficients\[0]\[1] = ColorScale * InGatheredLightSample.IncidentLighting.G;

  OutCoefficients\[0]\[2] = ColorScale * InGatheredLightSample.IncidentLighting.B;

  

  // Will force DirLuma\[0] to 0.282095f

  OutCoefficients\[1]\[0] = -0.325735f \* DirLuma\[1] \* DirScale;

  OutCoefficients\[1]\[1] = 0.325735f \* DirLuma\[2] \* DirScale;

  OutCoefficients\[1]\[2] = -0.325735f \* DirLuma\[3] \* DirScale;

  

**GetLightMapColorHQ: L1 SH Band Data Reconstruction**

Sample1.rgb encodes the L1 SH band data

**NOTE:** SH basis is in the canonical math coordinate frame so you have to swizzle (eg: dot( SH, float4(WorldNormal.yzx, 1) )

- ***Reconstruct primary average color for lightmap texel (aka SH L0 term)***

  - Luma is stored in Lightmap0.w in Log space

  - Lightmap chromaticity is in UVW in Lightmap0.xyz (aka RGB \* 1/L)

  - Everything is range/scaled for compression. PrecomputedLightingBuffer.LightMapScale\[0] & LightMapAdd\[0] stored the factors for color


- ***Reconstruct directionality***

  - SH is in Lightmap1. But Lightmap1 is encoded specially in reverse order (L0 term is in Lightmap1.w; L1 terms are in zyx)

  - Also, SH is normalized s.t. L0 factor = 1 (Lightmap1.w would be 1.0); they use this to store residual for Logspace compression compression. Lightmap1.w is not used for SH (happens in LightmapData.cpp:**QuantizeLightSamples**())

  - PrecomputedLightingBuffer.LightMapScale\[0] & LightMapAdd\[0] stores the scale/bias

- All done bc Lightmap0 & Lightmap1 are 32-bit quantized textures (8bits per component)



Key Data Structures:


```cpp
class FGatheredLightMapSample

{

FGatheredLightSample HighQuality;

FGatheredLightSample LowQuality;

/** True if this sample maps to a valid point on a triangle. This is only meaningful for texture lightmaps. */

bool bIsMapped;

FLightSample ConvertToLightSample(bool bDebugThisSample) const;

..

}

FGatheredLightMapData2D::ConvertToLightmap2D()

Data[SampleIndex].ConvertToLightSample(bDebugThisSample);

FGatheredLightMapSample::ConvertToLightSample():

FLightSample NewSample;

NewSample.bIsMapped = bIsMapped;

ConvertToLightSampleHelper(HighQuality, &NewSample.Coefficients[0]);

ConvertToLightSampleHelper(LowQuality, &NewSample.Coefficients[ LM_LQ_LIGHTMAP_COEF_INDEX ]);

static void ConvertToLightSampleHelper(const FGatheredLightSample& InGatheredLightSample, float OutCoefficients[2][3]):

{

// SHCorrection is SHVector sampled with the normal

float DirCorrection = 1.0f / FMath::Max( 0.0001f, InGatheredLightSample.SHCorrection );

float DirLuma[4];

for( int32 i = 0; i < 4; i++ )

{

DirLuma[i] = 0.30f * InGatheredLightSample.SHVector.R.V[i];

DirLuma[i] += 0.59f * InGatheredLightSample.SHVector.G.V[i];

DirLuma[i] += 0.11f * InGatheredLightSample.SHVector.B.V[i];

// Lighting is already in IncidentLighting. Force directional SH as applied to a flat normal map to be 1 to get purely directional data.

DirLuma[i] *= DirCorrection / PI;

}

// Scale directionality so that DirLuma[0] == 1. Then scale color to compensate and toss DirLuma[0].

float DirScale = 1.0f / FMath::Max( 0.0001f, DirLuma[0] );

float ColorScale = DirLuma[0];

// IncidentLighting is ground truth for a representative direction, the vertex normal

OutCoefficients[0][0] = ColorScale * InGatheredLightSample.IncidentLighting.R;

OutCoefficients[0][1] = ColorScale * InGatheredLightSample.IncidentLighting.G;

OutCoefficients[0][2] = ColorScale * InGatheredLightSample.IncidentLighting.B;

// Will force DirLuma[0] to 0.282095f

OutCoefficients[1][0] = -0.325735f * DirLuma[1] * DirScale;

OutCoefficients[1][1] = 0.325735f * DirLuma[2] * DirScale;

OutCoefficients[1][2] = -0.325735f * DirLuma[3] * DirScale;

}

NewSample.SkyOcclusion[0] = HighQuality.SkyOcclusion.X;

NewSample.SkyOcclusion[1] = HighQuality.SkyOcclusion.Y;

NewSample.SkyOcclusion[2] = HighQuality.SkyOcclusion.Z;

NewSample.AOMaterialMask = HighQuality.AOMaterialMask;

}

/**

* Incident lighting for a single sample, as produced by a lighting build.

* FGatheredLightSample is used for gathering lighting instead of this format as FLightSampleData is not additive.

*/

struct FLightSampleData

{

/**

* Coefficients[0] stores the normalized average color,

* Coefficients[1] stores the maximum color component in each lightmap basis direction,

* and Coefficients[2] stores the simple lightmap which is colored incident lighting along the vertex normal.

*/

float Coefficients[LM_NUM_STORED_LIGHTMAP_COEF]\[3];

float SkyOcclusion[3];

float AOMaterialMask;

/** True if this sample maps to a valid point on a triangle. This is only meaningful for texture lightmaps. */

bool bIsMapped;

}

/**

* The quantized coefficients for a single light-map texel.

*/

struct FQuantizedLightSampleData

{

uint8 Coverage;

uint8 Coefficients[LM_NUM_STORED_LIGHTMAP_COEF][4];

uint8 SkyOcclusion[4];

uint8 AOMaterialMask;

};

/** The number of coefficients that are stored for each light sample. */

static const int32 LM_NUM_STORED_LIGHTMAP_COEF = 4;

/** The number of high quality coefficients which the lightmap stores for each light sample. */

static const int32 LM_NUM_HQ_LIGHTMAP_COEF = 2;

/** The index at which low quality coefficients are stored in any array containing all LM_NUM_STORED_LIGHTMAP_COEF coefficients. */

static const int32 LM_LQ_LIGHTMAP_COEF_INDEX = 2;

#define LM_NUM_SH_COEFFICIENTS 9

struct FLightMapDataBase

{

/** Size of compressed lightmap data */

uint32 CompressedDataSize;

/** Size of uncompressed lightmap data */

uint32 UncompressedDataSize;

/** Scale applied to the quantized light samples */

float Multiply\[LM_NUM_STORED_LIGHTMAP_COEF]\[4];

/** Bias applied to the quantized light samples */

float Add\[LM_NUM_STORED_LIGHTMAP_COEF]\[4];

};

/** LightMap data 2D */

struct FLightMapData2DData : public FLightMapDataBase

{

FLightMapData2DData(uint32 InSizeX,uint32 InSizeY):

SizeX(InSizeX),

SizeY(InSizeY),

bHasSkyShadowing(false)

{

}

/** The width of the light-map. */

uint32 SizeX;

/** The height of the light-map. */

uint32 SizeY;

bool bHasSkyShadowing;

};

static void GetLUVW( const float RGB[3], float& L, float& U, float& V, float& W )

{

float R = FMath::Max( 0.0f, RGB[0] );

float G = FMath::Max( 0.0f, RGB[1] );

float B = FMath::Max( 0.0f, RGB[2] );

L = 0.3f * R + 0.59f * G + 0.11f * B;

if( L < 1e-4f )

{

U = 1.0f;

V = 1.0f;

W = 1.0f;

}

else

{

U = R / L;

V = G / L;

W = B / L;

}

}

/**

* Quantizes floating point light samples down to byte samples with a scale applied to all samples

*

* @param InLightSamples Floating point light sample coefficients

* @param OutLightSamples Quantized light sample coefficients

* @param OutScale Scale applied to each quantized sample (to get it back near original floating point value)

* @param bUseMappedFlag Whether or not to pay attention to the bIsMapped flag for each sample when calculating max scale

*

* TODO Calculate residual after compression, not just quantization.

* TODO Factor out error from directionality compression and push it to color. This requires knowing a representative normal.

* Best way is probably to create a new texture compression type and do error correcting during compression.

*/

FLightMapData2D::Quantize()

void QuantizeLightSamples(

TArray<FLightSample>& InLightSamples,

TArray<FQuantizedLightSampleData>& OutLightSamples,

float OutMultiply\[LM_NUM_STORED_LIGHTMAP_COEF][4],

float OutAdd\[LM_NUM_STORED_LIGHTMAP_COEF][4],

int32 DebugSampleIndex,

bool bUseMappedFlag)

{

//Looks like SH is stored in reverse order L1.zyxL0

//Scale/Bias made so that SH term is 0.282095

// Force SH constant term to 0.282095f. Avoids add in shader.

OutMultiply[1][3] = 0.0f;

OutAdd[1][3] = 0.282095f;

OutMultiply[3][3] = 0.0f;

OutAdd[3][3] = 0.282095f;

..

}

//==================================================================

/** A sample of the visibility factor between a light and a single point. */

struct FShadowSampleData

{

/** The fraction of light that reaches this point from the light, between 0 and 1. */

float Visibility;

/** True if this sample maps to a valid point on a surface. */

bool bIsMapped;

/**

* Export helper

* @param Component Which directional lightmap component to retrieve

* @return An FColor for this component, clamped to White

*/

FColor GetColor(int32 Component) const

{

uint8 Gray = (uint8)FMath::Clamp<int32>(Visibility * 255, 0, 255);

return FColor(Gray, Gray, Gray, 0);

}

};

/** The quantized value for a single shadowmap texel */

struct FQuantizedShadowSampleData

{

uint8 Visibility;

uint8 Coverage;

};

/** ShadowMap data 2D */

struct FShadowMapData2DData : public FShadowMapDataBase

{

FShadowMapData2DData(uint32 InSizeX,uint32 InSizeY):

SizeX(InSizeX),

SizeY(InSizeY)

{

}

/** The width of the shadow-map. */

uint32 SizeX;

/** The height of the shadow-map. */

uint32 SizeY;

};
```