Common Info:
============

**Params:**

-   Specular = 0.5 by default, \[0,1\]

-   GBuffer.SpecularColor = lerp(0.08 \* Specular.xxx, BaseColor, Metallic.xxx); //Think this means index of refraction

-   GBuffer.DiffuseColor = BaseColor - BaseColor \* Metallic;

 

-   struct **FDeferredLightData**

{

float4 LightPositionAndInvRadius;

float4 LightColorAndFalloffExponent;

float3 LightDirection;

float3 LightTangent;

float SoftSourceRadius;

float4 SpotAnglesAndSourceRadius;

float MinRoughness;

float ContactShadowLength;

float2 DistanceFadeMAD;

float4 ShadowMapChannelMask;

/\*\* Whether to use inverse squared falloff. \*/

bool bInverseSquared;

/\*\* Whether this is a light with radial attenuation, aka point or spot light. \*/

bool bRadialLight;

/\*\* Whether this light needs spotlight attenuation. \*/

bool bSpotLight;

/\*\* Whether the light should apply shadowing. \*/

uint ShadowedBits;

};

 

- **Primitive Uniform Buffer:**

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FMatrix,LocalToWorld)                // always needed

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FMatrix,WorldToLocal)                // rarely needed

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FVector4,ObjectWorldPositionAndRadius)        // needed by some materials

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FVector,ObjectBounds)                // only needed for editor/development

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,LocalToWorldDeterminantSign,EShaderPrecisionModifier::Half)        // could be stored in the sign bit of the object radius

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FVector,ActorWorldPosition)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,DecalReceiverMask,EShaderPrecisionModifier::Half)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,PerObjectGBufferData,EShaderPrecisionModifier::Half)                // 0..1, 2 bits, bDistanceFieldRepresentation, bHeightfieldRepresentation

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,UseSingleSampleShadowFromStationaryLights,EShaderPrecisionModifier::Half)        

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,UseVolumetricLightmapShadowFromStationaryLights,EShaderPrecisionModifier::Half)                

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(float,UseEditorDepthTest,EShaderPrecisionModifier::Half)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(FVector4,ObjectOrientation,EShaderPrecisionModifier::Half)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(FVector4,NonUniformScale,EShaderPrecisionModifier::Half)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER\_EX(FVector4,InvNonUniformScale,EShaderPrecisionModifier::Half)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FVector, LocalObjectBoundsMin)                // This is used in a custom material function (ObjectLocalBounds.uasset)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(FVector, LocalObjectBoundsMax)                // This is used in a custom material function (ObjectLocalBounds.uasset)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(uint32,LightingChannelMask)

  DECLARE\_UNIFORM\_BUFFER\_STRUCT\_MEMBER(float,LpvBiasMultiplier)

 

-   **View.SkyLightParameters**: X = max mip, Y = 1 if sky light should be rendered, 0 otherwise, Z = 1 if sky light is dynamic, 0 otherwise, W = blend fraction.

-   **FMaterialVertexParameters**: Parameters needed by vertex shader material inputs. Are independent of vertex factory.

-   **FMaterialPixelParameters**: parameters needed by pixel shader material inputs, related to Geometry.

-   **FPixelMaterialInputs:** the result of the calculated per-pixel shared material properties from the material graph. Eg: basecolor, emissive, etc)



**Shading Model:**

-   Microfacet specular = D\*G\*F / (4\*NoL\*NoV) = D\*Vis\*F

-   Vis = G / (4\*NoL\*NoV)

 

Base Pass Pixel Shader.usf::FPixelShaderInOut\_MainPS(): 
========================================================

#### **Forward Lighting Pre-amble/setup:**

-   Calculate Material attributes for pixel that are shared (FPixelMaterialInputs)

    -   **GetMaterialPixelParameters**(): Converts from vertex factory specific interpolants FVertexFactoryInterpolants) to FMaterialPixelParameters

        -   Implemented on each vertexfactory (ex: LocalVertexFactory.usf)

        -   Responsible for fully initializing FMaterialPixelParameters result

 

-   **If HQ\_TEXTURE\_LIGHTMAP && USES\_AO\_MATERIAL\_MASK: GetLightMapCoordinates()** && **GetAOMaterialMask()**



-   **CalcMaterialParametersEx**(): Runs the UE4 Node-based Material to calculate material attributes (FPixelMaterialInputs ) like basecolor, emissive, etc

    -   Initializes the subset of Parameters that was not set in GetMaterialPixelParameters

    -   Calculate the Material Input/Attributes and Normal. This is in the generated MaterialTemplate.usf from Material Editor

    -   Filled in by *FHLSLMaterialTranslator::GetMaterialShaderCode()* for each compiled material

    -   Output stored in the FPixelMaterialInputs PixelMaterialInputs parameter



-   **MaterialTemplate.usf Notes:**

    -   CalcMaterialParametersEx() is where the actual shader computation happens and it gets stored in PixelMaterialInputs

    -   To retrieve those values in other parts of the shader, there are helper functions like GetMaterialRoughness()/GetMaterialRoughnessRaw()

    -   These look up the value from the PixelMaterialInputs parameter. Raw variant returns it directly, the non-raw might have some guarding/saturation

    -   Some functions like GetMaterialTranslucentBackscatteringExponent() just return a hardcoded value for that material

    -   There's also several helper functions that are implemented like GetObjectWorldPosition() or TransformWorldVectorToLocal()



-   **ApplyPixelDepthOffsetForBasePass()** 

-   **GetMaterialCoverageAndClipping()/DiscardMaterialWithPixelCoverage():** Clip if blend mode needs it

- Cache common results in local variables:

  half3 BaseColor = GetMaterialBaseColor(PixelMaterialInputs);

  half Metallic = GetMaterialMetallic(PixelMaterialInputs);

  half Specular = GetMaterialSpecular(PixelMaterialInputs);

 

​	float MaterialAO = GetMaterialAmbientOcclusion(PixelMaterialInputs);

​	float Roughness = GetMaterialRoughness(PixelMaterialInputs);

 

-   Other Misc Stuff:

    -   SubsurfaceProfile/SubsurfaceData from GetMaterialSubsurfaceData(PixelMaterialInputs)

    -   Debuffer stuff ApplyDBufferData()

    -   half Opacity = GetMaterialOpacity(PixelMaterialInputs);

    -   VolumetricLightmapBrickTextureUVs = ComputeVolumetricLightmapBrickTextureUVs(MaterialParameters.AbsoluteWorldPosition);



-   Initialize FGBufferData GBuffer struct (even in the forward pass)

    -   **GetPrecomputedShadowMasks**(): (deferred only) Gets volumetric shadowing/stationary shadowing from precomputed lighting. Volume LightMap is a 3D texture

        -   **SignedDistanceField && StaticLighting:**

            -   Use SDF for precomputed shadowing

        -   **Statically Lightmapped Obj (HQ\_TEXTURE\_LIGHTMAP):**

            -   return 0

        -   **Everything else:**

            -   **ILCQ:**

                -   If UseSingleSampleShadowFromStationaryLights =&gt; use PrecomputedLightingBuffer.DirectionalLightShadowing which is calculated at that location in the LCQ cache (code comment in PrimitiveSceneProxy.h says bSingleSampleShadowFromStationaryLights is only precomputed for stationary directional lights)

                -   Otherwise it uses the shadowmaps so it returns 1 here (aka no shadowing)

            -   **UseVolumetricLightmapShadowFromStationaryLights** (which is bUseVolumetricLightmap && bUseSingleSampleShadowFromStationaryLights):

                -   GetVolumetricLightmapDirectionalLightShadowing()

                -   This will only come from stationary directional lights as well



-   **SetGBufferForShadingModel():** Different MATERIAL\_SHADINGMODEL\_\* adjust the gbuffer here and write custom data



-   ***(USES\_GBUFFER ONLY)*: Velocity calculation**



-   **Adjust GBuffer struct values based on shader:**

    -   **GBuffer.SpecularColor:** lerp(0.08 \* Specular.xxx, BaseColor, Metallic.xxx); //Think this means index of refraction

    -   **GBuffer.Roughness:** NormalCurvatureToRoughness(MaterialParameters.WorldNormal)

    -   ***(Subsurface\_Profile && USES\_GBUFFER)* AdjustBaseColorAndSpecularColorForSubsurfaceProfileLighting()**

    -   **GBuffer.DiffuseColor** = BaseColor - BaseColor \* Metallic;

    -   **FORCE\_FULLY\_ROUGH** optimization

    -   **DiffuseOcclusion, SpecOcclusion** = MaterialAO as initial values

    -   **ApplyBentNormal()**: Evaluate DiffOcclusion & SpecOcclusion based on bentnormal

        -   Applies a vsibility cone intersection using bent normal & roughness by converting to Spherical Gaussians and convolving there

    -   **GBuffer.GBufferAO** = AOMultiBounce()



**GetPrecomputedIndirectLightingAndSkyLight(): Indirect Diffuse Lighting**

Where we compute precalculated **diffuse** lightmap/indirect lighting cache light contribution. Specular comes from GetImageBasedReflectionLighting()

 

-   **Pre-amble:** before this function is called in BasePassPixelShader

    -   Calculate Color, DiffuseColor, IndirectIrradiance. **NOTE: DiffuseColor is just for accumulating indirect/precalculated diffuse color. Color is the final total color that everything gets accumulated in. Direct dynamic lighting gets accumulated directly into Color variable**

    -   Calculate BRDF for Indirect Diffuse

        -   **NOTE:** DiffuseColorForIndirect/SubsurfaceColor is BRDF for indirect, not final color combined with lighting

        -   Default DiffuseColorForIndirect = GBuffer.DiffuseColor

        -   Default SubsurfaceColor= Normal materials =&gt; 0 | Subsurface/skin/twosided\_foliage =&gt; SubsurfaceData.rgb

        -   Different materials can adjust this (eg MATERIAL\_SHADINGMODEL\_HAIR)



-   **Lightmap Calculation:** Also calculates subsurface indirect lighting

    -   **PRECOMPUTED\_IRRADIANCE\_VOLUME\_LIGHTING:** Used by primitives that have volumetric lightmap data && movable or LightAsIfVolumetric

        -   FThreeBandSHVectorRGB IrradianceSH = GetVolumetricLightmapSH3(VolumetricLightmapBrickTextureUVs);

        -   // Diffuse convolution

        -   FThreeBandSHVector DiffuseTransferSH = CalcDiffuseTransferSH3(DiffuseDir, 1);

        -   OutDiffuseLighting = max(float3(0,0,0), DotSH3(IrradianceSH, DiffuseTransferSH)) / PI;

 

-   **CACHED\_POINT\_INDIRECT\_LIGHTING/CACHED\_VOLUME\_INDIRECT\_LIGHTING:** This is the old indirect lighting cache. ILCQ setting determines what to use (sample at a single point vs a per object volume texture of interpolated SH samples computed on CPU)



-   **HQ\_TEXTURE\_LIGHTMAP/LQ\_TEXTURE\_LIGHTMAP: GetLightMapColorHQ:** Static lightmaps. LQ is non-directional and just used for mobile

    -   Lightmap data is stored as
    
    2 samples from the same texture:
    
    Sample0.a and Sample1.a encodes the precomputed HDR luminance in LogL space
    
    Sample0.rgb encodes the precomputed lighting color.
    
- **L1 SH Band Data Reconstruction**

  Sample1.rgb encodes the L1 SH band data

  **NOTE:** SH basis is in the canonical math coordinate frame so you have to swizzle (eg: dot( SH, float4(WorldNormal.yzx, 1) )



-   Reconstruct primary average color for lightmap texel (aka SH L0 term)

    -   Luma is stored in Lightmap0.w in Log space

    -   Lightmap chromaticity is in UVW in Lightmap0.xyz (aka RGB \* 1/L)

    -   Everything is range/scaled for compression. PrecomputedLightingBuffer.LightMapScale\[0\] & LightMapAdd\[0\] stored the factors for color

-   Reconstruct directionality

    -   SH is in Lightmap1. But Lightmap1 is encoded specially in reverse order (L0 term is in Lightmap1.w; L1 terms are in zyx)

    -   Also, SH is normalized s.t. L0 factor = 1 (Lightmap1.w would be 1.0); they use this to store residual for Logspace compression compression. Lightmap1.w is not used for SH (happens in LightmapData.cpp:QuantizeLightSamples())

    -   PrecomputedLightingBuffer.LightMapScale\[0\] & LightMapAdd\[0\] stores the scale/bias

-   All done bc Lightmap0 & Lightmap1 are 32-bit quantized textures (8bits per component)



-   The HDR luminance data is only encoded when using HQ lightmaps (see "r.HighQualityLightMaps").

This doubles the lightmap sizes but allows smooth gradients and wider range support. 

You can look at how the channels are used in LightmapCommon.usf if you want the details.

 

-   For shadowmaps, the engine encodes 1 light shadow attenuation per channel, supporting up to 4 precomputed shadows per mesh.

 

-   **GetSkyLighting():** Computes sky diffuse lighting, including precomputed shadowing

    -   Retrieves SkyBentNormal and SkyVisibility occlusion from cached volume texture/SkyOcclusionTexture/PrecomputedLightingBuffer.PointSkyBentNormal\]

        -   **Dynamic objects using Volumetric Lightmap:**

            -   SkyBentNormal = Looked up from the Volumetric Lightmap using GetVolumetricLightmapSkyBentNormal() which samples View.SkyBentNormalBrickTexture

            -   SkyVisibility = len(SkyBentNormal)

        -   **Static Lightmap objects:**

            -   WorldSkyBentNormalAndOcclusion from prebaked lightmap texture using GetSkyBentNormalAndOcclusion() sampling PrecomputedLightingBuffer.SkyOcclusionTexture

            -   SkyVisibility = SkyBentNormal .w;

        -   **ILCQ Point or ILCQ Volume:**

            -   NormalizedBentNormal is coming from uniform parameter PrecomputedLightingBuffer.PointSkyBentNormal

            -   The same bent normal is used for the entire object



-   Calculates occlusion from bent normal

    -   **Translucent|Additive && TransLightingVolumetricIsNonDir:**

        -   Just use SkyBentNormal for the normal calculation in indirect lighting

    -   **Everything else:**

        -   Lerping between the inputs of two lighting scenarios based on occlusion

        -   In the mostly unoccluded case, evaluate sky lighting with the material normal, because it has higher detail

        -   In the mostly occluded case, evaluate sky lighting with the bent normal, because it is a better representation of the incoming lighting

        -   Then treat the lighting evaluated along the bent normal as an area light, so we must apply the lambert term

        -   Also account for darkening due to the geometry term

        -   BentNormalWeightFactor = 1 - (1 - SkyVisibility) \* (1 - SkyVisibility);

        -   SkyLightingNormal = lerp(NormalizedBentNormal, WorldNormal, BentNormalWeightFactor);

        -   GeometryTerm = lerp(saturate(dot(NormalizedBentNormal, WorldNormal)), 1, BentNormalWeightFactor);

 

-   Calculate Diffuse SH Irradiance:

    -   Standard analytical SH cosine clamped convolution with Irradiance SH factors from uniform buffer ( = GetEffectiveSkySHDiffuse(SkyLightingNormal) \* ResolvedView.SkyLightColor.rgb)

    -   Modulate with Visibility factors (OutDiffuseLighting = DiffuseLookup \* (SkyVisibility \* GeometryTerm)

-   Calculate Subsurface Skylighting for certain materials (Foliage):

    -   Same calculation as above except with -WorldNormal vs SkyBentNormal

    -   Modulated by SkyVisibility only

 

-   Returns OutDiffuseLighting & OutSubsurfaceLighting



-   Returns OutDiffuseLighting, OutSubsurfaceLighting, OutIndirectIrradiance (luminance of OutDiffuseLighting)

 

-   **Post-amble:** After this function returns back to BasePassPixelShader

    -   ***(FORWARD\_SHADING && Solid|Masked)* Calculate IndirectOcclusion**

        -   **IndirectOcclusion = GetIndirectOcclusion()** which pulls from IndirectOcclusionTexture and does some biasing based on HasDynamicIndirectShadowCasterRepresentation()/HasCapsuleShadowRepresentation()

        -   Modulate DiffuseIndirectLighting, SubsurfaceIndirectLighting, IndirectIrradiance by IndirectOcclusion

    -   **DiffuseColor** = (DiffuseIndirectLighting \* DiffuseColorForIndirect + SubsurfaceIndirectLighting \* SubsurfaceColor) \* AOMultiBounce( GBuffer.BaseColor, DiffOcclusion ).

**NOTE: DiffuseColor in FPixelShaderInOut\_MainPS is actually indirect diffuse contribution. Direct Dynamic Lighting is accumulated directly into Color variable**

 

 

#### **GetForwardDirectLighting():**

Get's final shaded pixel value from direct lights



-   Looks up shadow factors, shadow map channel for static shadowing, & dynamic shadowing

-   **GetDynamicLighting():** on each light in the light grid cell. Calculates shading from that light

    -   If radial light =&gt; GetLocalLightAttenuation()

    -   Calculates light contribution (inverse falloff)

    -   Calcluates Contact Shadows by sampling zprepass depth

    -   AreaLightSpecular(): Calculate LobeEnergy modification for specular for area lights.

        -   LobeEnergy = float3(ClearCoatRoughness, Specular Roughness, Diffuse Roughness); Default: 1.0

        -   LobeRoughness = float3(ClearCoatRoughness, Specular Roughness, Diffuse Roughness); Default: float3(ClearCoatRoughness, GBuffer.Roughness, 1)

        -   These are filled only for area lights

    -   SurfaceShading(): Main call to actually shade based on GBuffer.ShadingModelID. Returns BRDF value.

        -   StandardShading(): Normal Shading Model

            -   D\_GGX, Vis\_SmithJointApprox, Schick approximation, Diffuse\_Lambert

    -   LightAccumulator\_Add()/LightAccumulator\_GetResult(): Simple accumulator/return. Apply light falloff attenuation. Only does something special for subsurface models



#### **GetImageBasedReflectionLighting():**

Get indirect specular from image based reflection environment.

 

-   If REFLECTION\_COMPOSITE\_USE\_BLENDED\_REFLECTION\_CAPTURES, use multiple reflection probes

-   CompositeReflectionCapturesAndSkylight(): If HQ\_REFLECTION is enabled in forward mode, it will blend multiple reflection captures vs using one

    -   Calculate average CompositedAverageBrightness from reflection captures based on view direction

    -   Get Skylight specular: (Forward mode) =&gt; GetSkyLightReflection(), (Deferred Mode GetSkyLightReflectionSupportingBlend())

        - /\*\* X = max mip, Y = 1 if sky light should be rendered, 0 otherwise, Z = 1 if sky light is dynamic, 0 otherwise, W = blend fraction. \*/ 
        
          float4 SkyLightParameters;

 

-   For static skylights, modulate based on IndirectIrradiance & CompositedAverageBrightness based on roughness & IndirectSpecularOcclusion (which always seems to be 1 in forward)

-   Returns SpecularIBL

-   EnvBRDFApprox() - analytical approximation instead of using LUT of preconvolved splitsum approximation (<https://www.unrealengine.com/en-US/blog/physically-based-shading-on-mobile>; environment map convolution described here <https://jmonkeyengine.github.io/wiki/jme3/advanced/pbr_part3.html>)

-   GetSimpleForwardLightingDirectionalLight(): For Simple directional lighting only for low-end hw

 

**Prefiltering/baking:**

Prefiltering split sum approximation for Image based lighting (<https://de45xmedrsdbp.cloudfront.net/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf>):

ImportanceSampleGGX()

SpecularIBL()

DiffuseIBL()

PrefilterEnvMap()

ApproximateSpecularIBL()

IntegrateBRDF()

 

**Common \#if Defines**

Below are some common pre-processor defines found in the deferred shading pipeline. I have put together a list of their intended meaning based on what C++ code triggers them. This will hopefully let you figure out which sections of the deferred pipeline apply to your code as you can check the pre-processor define against this list to see what it translates into in terms of UE4 settings.

 

-   \#if NON\_DIRECTIONAL\_DIRECT\_LIGHTING This is found in DeferredLightingCommon.ush but only seems to be defined in ForwardLightingCommon.ush as \#define NON\_DIRECTIONAL\_DIRECT\_LIGHTING (TRANSLUCENCY\_LIGHTING\_VOLUMETRIC\_NONDIRECTIONAL || TRANSLUCENCY\_LIGHTING\_VOLUMETRIC\_PERVERTEX\_NONDIRECTIONAL).

-   \#if SUPPORT\_CONTACT\_SHADOWS provides support for Unreal’s Contact Shadows Feature.

-   \#if REFERENCE\_QUALITY is defined to 0 at the top of DeferredLightingCommon.ush — might be for cinematic rendering?

-   \#if ALLOW\_STATIC\_LIGHTING is true if the r.AllowStaticLighting console variable is set to 1. This matches the Project Settings &gt; Rendering option for Static Lighting support.

-   \#if USE\_DEVELOPMENT\_SHADERS is true if COMPILE\_SHADERS\_FOR\_DEVELOPMENT is true (and the platform supports it). COMPILE\_SHADERS\_FOR\_DEVELOPMENT is true if r.CompileShadersForDevelopment is set.

-   \#if TRANSLUCENT\_SELF\_SHADOWING is defined for objects being rendered with a FSelfShadowedTranslucencyPolicy. I believe this is for Lit Translucency support.

-   \#if SIMPLE\_FORWARD\_DIRECTIONAL\_LIGHT and \#if SIMPLE\_FORWARD\_SHADING seem to be set during Light Map rendering for stationary directional lights.

-   \#if FORWARD\_SHADING is set when r.ForwardShading is set to 1.

-   \#if IMPORTANCE\_SAMPLE =&gt; Doesn't seem to be used

    -   Calls ImageBasedLightingHair() & ImageBasedLightingMIS()

 

 

**Misc funcs:**

VolumetricLightmapBrickTextureUVs = ComputeVolumetricLightmapBrickTextureUVs(WorldPosition);

ComputeVolumetricLightmapBrickTextureUVs(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapAmbient(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapSH1(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapSHCoefficients0(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapSH2(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapSH3(VolumetricLightmapBrickTextureUVs)

GetVolumetricLightmapDirectionalLightShadowing(VolumetricLightmapBrickTextureUVs)
