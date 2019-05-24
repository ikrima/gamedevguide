---
sortIndex: 9
---

- Primitive Uniform Buffer
```cpp
BEGIN_UNIFORM_BUFFER_STRUCT(FPrimitiveUniformShaderParameters,ENGINE_API)  
        UNIFORM_MEMBER(FMatrix,LocalToWorld)                // always needed  
        UNIFORM_MEMBER_EX(FVector4,InvNonUniformScaleAndDeterminantSign,EShaderPrecisionModifier::Half) //often needed  
        UNIFORM_MEMBER(FVector4,ObjectWorldPositionAndRadius)        // needed by some materials  
        UNIFORM_MEMBER(FMatrix,WorldToLocal)                // rarely needed  
        UNIFORM_MEMBER(FVector,ActorWorldPosition)  
        UNIFORM_MEMBER_EX(float,UseSingleSampleShadowFromStationaryLights,EShaderPrecisionModifier::Half)          
        UNIFORM_MEMBER(FVector,ObjectBounds)                // only needed for editor/development  
        UNIFORM_MEMBER(float,LpvBiasMultiplier)  
        UNIFORM_MEMBER_EX(float,DecalReceiverMask,EShaderPrecisionModifier::Half)  
        UNIFORM_MEMBER_EX(float,PerObjectGBufferData,EShaderPrecisionModifier::Half)                // 0..1, 2 bits, bDistanceFieldRepresentation, bHeightfieldRepresentation  
        UNIFORM_MEMBER_EX(float,UseVolumetricLightmapShadowFromStationaryLights,EShaderPrecisionModifier::Half)                  
        UNIFORM_MEMBER_EX(float,UseEditorDepthTest,EShaderPrecisionModifier::Half)  
        UNIFORM_MEMBER_EX(FVector4,ObjectOrientation,EShaderPrecisionModifier::Half)  
        UNIFORM_MEMBER_EX(FVector4,NonUniformScale,EShaderPrecisionModifier::Half)  
        UNIFORM_MEMBER(FVector, LocalObjectBoundsMin)                // This is used in a custom material function (ObjectLocalBounds.uasset)  
        UNIFORM_MEMBER(FVector, LocalObjectBoundsMax)                // This is used in a custom material function (ObjectLocalBounds.uasset)  
        UNIFORM_MEMBER(uint32,LightingChannelMask)  
END_UNIFORM_BUFFER_STRUCT(FPrimitiveUniformShaderParameters)
```

- View Uniform Buffer
```cpp
\#define VIEW_UNIFORM_BUFFER_MEMBER_TABLE \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, TranslatedWorldToClip) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, WorldToClip) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, TranslatedWorldToView) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ViewToTranslatedWorld) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, TranslatedWorldToCameraView) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, CameraViewToTranslatedWorld) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ViewToClip) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ViewToClipNoAA) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ClipToView) \
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ClipToTranslatedWorld) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, SVPositionToTranslatedWorld) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ScreenToWorld) \
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ScreenToTranslatedWorld) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, ViewForward, EShaderPrecisionModifier::Half) \
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, ViewUp, EShaderPrecisionModifier::Half) \
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, ViewRight, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, HMDViewNoRollUp, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, HMDViewNoRollRight, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, InvDeviceZToWorldZTransform) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector4, ScreenPositionScaleBias, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, WorldCameraOrigin) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, TranslatedWorldCameraOrigin) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, WorldViewOrigin) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, PreViewTranslation) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevProjection) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevViewProj) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevViewRotationProj) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevViewToClip) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevClipToView) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevTranslatedWorldToClip) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevTranslatedWorldToView) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevViewToTranslatedWorld) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevTranslatedWorldToCameraView) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevCameraViewToTranslatedWorld) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, PrevWorldCameraOrigin) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, PrevWorldViewOrigin) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, PrevPreViewTranslation) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevInvViewProj) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, PrevScreenToTranslatedWorld) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FMatrix, ClipToPrevClip) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, TemporalAAJitter) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, GlobalClippingPlane) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector2D, FieldOfViewWideAngles) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector2D, PrevFieldOfViewWideAngles) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector4, ViewRectMin, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, ViewSizeAndInvSize) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, BufferSizeAndInvSize) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, BufferBilinearUVMinMax) \  
        VIEW_UNIFORM_BUFFER_MEMBER(int32, NumSceneColorMSAASamples) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, PreExposure, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, OneOverPreExposure, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector4, DiffuseOverrideParameter, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector4, SpecularOverrideParameter, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector4, NormalOverrideParameter, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector2D, RoughnessOverrideParameter, EShaderPrecisionModifier::Half) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, PrevFrameGameTime) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, PrevFrameRealTime) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, OutOfBoundsMask, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, WorldCameraMovementSinceLastFrame) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, CullingSign) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, NearPlane, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, AdaptiveTessellationFactor) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, GameTime) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, RealTime) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, MaterialTextureMipBias) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, MaterialTextureDerivativeMultiply) \  
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, Random) \
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, FrameNumber) \
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, StateFrameIndexMod8) \
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, CameraCut, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, UnlitViewmodeMask, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FLinearColor, DirectionalLightColor, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(FVector, DirectionalLightDirection, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_ARRAY(FVector4, TranslucencyLightingVolumeMin, \[TVC_MAX]) \  
        VIEW_UNIFORM_BUFFER_MEMBER_ARRAY(FVector4, TranslucencyLightingVolumeInvSize, \[TVC_MAX]) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, TemporalAAParams) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector4, CircleDOFParams) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldSensorWidth) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldFocalDistance) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldScale) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldFocalLength) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldFocalRegion) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldNearTransitionRegion) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, DepthOfFieldFarTransitionRegion) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, MotionBlurNormalizedToPixel) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, bSubsurfacePostprocessEnabled) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, GeneralPurposeTweak) \
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, DemosaicVposOffset, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, IndirectLightingColorScale) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, HDR32bppEncodingMode, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, AtmosphericFogSunDirection) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogSunPower, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogPower, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogDensityScale, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogDensityOffset, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogGroundOffset, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogDistanceScale, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogAltitudeScale, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogHeightScaleRayleigh, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogStartDistance, EShaderPrecisionModifier::Half) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogDistanceOffset, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, AtmosphericFogSunDiscScale, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, AtmosphericFogRenderMask) \  
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, AtmosphericFogInscatterAltitudeSampleNum) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FLinearColor, AtmosphericFogSunColor) \
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, NormalCurvatureToRoughnessScaleBias) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, RenderingReflectionCaptureMask) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FLinearColor, AmbientCubemapTint) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, AmbientCubemapIntensity) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, SkyLightParameters) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FLinearColor, SkyLightColor) \  
        VIEW_UNIFORM_BUFFER_MEMBER_ARRAY(FVector4, SkyIrradianceEnvironmentMap, \[7]) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, MobilePreviewMode) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, HMDEyePaddingOffset) \ 
        VIEW_UNIFORM_BUFFER_MEMBER_EX(float, ReflectionCubemapMaxMip, EShaderPrecisionModifier::Half) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, ShowDecalsMask) \  
        VIEW_UNIFORM_BUFFER_MEMBER(uint32, DistanceFieldAOSpecularOcclusionMode) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, IndirectCapsuleSelfShadowingIntensity) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, ReflectionEnvironmentRoughnessMixingScaleBiasAndLargestWeight) \  
        VIEW_UNIFORM_BUFFER_MEMBER(int32, StereoPassIndex) \  
        VIEW_UNIFORM_BUFFER_MEMBER_ARRAY(FVector4, GlobalVolumeCenterAndExtent, \[GMaxGlobalDistanceFieldClipmaps]) \  
        VIEW_UNIFORM_BUFFER_MEMBER_ARRAY(FVector4, GlobalVolumeWorldToUVAddAndMul, \[GMaxGlobalDistanceFieldClipmaps]) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, GlobalVolumeDimension) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, GlobalVolumeTexelSize) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, MaxGlobalDistance) \
        VIEW_UNIFORM_BUFFER_MEMBER(float, bCheckerboardSubsurfaceProfileRendering) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricFogInvGridSize) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricFogGridZParams) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector2D, VolumetricFogSVPosToVolumeUV) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, VolumetricFogMaxDistance) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricLightmapWorldToUVScale) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricLightmapWorldToUVAdd) \  
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricLightmapIndirectionTextureSize) \  
        VIEW_UNIFORM_BUFFER_MEMBER(float, VolumetricLightmapBrickSize) \
        VIEW_UNIFORM_BUFFER_MEMBER(FVector, VolumetricLightmapBrickTexelSize) \ 
        VIEW_UNIFORM_BUFFER_MEMBER(float, StereoIPD)

BEGIN_UNIFORM_BUFFER_STRUCT_WITH_CONSTRUCTOR(FViewUniformShaderParameters, ENGINE_API)

VIEW_UNIFORM_BUFFER_MEMBER_TABLE

// Same as Wrap_WorldGroupSettings and Clamp_WorldGroupSettings, but with mipbias=MaterialTextureMipBias.  
        UNIFORM_MEMBER_SAMPLER(SamplerState, MaterialTextureBilinearWrapedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, MaterialTextureBilinearClampedSampler)

UNIFORM_MEMBER_TEXTURE(Texture3D&lt;uint4>, VolumetricLightmapIndirectionTexture) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickAmbientVector) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients0) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients1) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients2) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients3) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients4) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients5) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, SkyBentNormalBrickTexture) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_TEXTURE(Texture3D, DirectionalLightShadowingBrickTexture) // FPrecomputedVolumetricLightmapLightingPolicy

UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapBrickAmbientVectorSampler) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler0) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler1) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler2) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler3) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler4) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, VolumetricLightmapTextureSampler5) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SkyBentNormalTextureSampler) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM_MEMBER_SAMPLER(SamplerState, DirectionalLightShadowingTextureSampler) // FPrecomputedVolumetricLightmapLightingPolicy

UNIFORM_MEMBER_TEXTURE(Texture3D, GlobalDistanceFieldTexture0)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, GlobalDistanceFieldSampler0)  
        UNIFORM_MEMBER_TEXTURE(Texture3D, GlobalDistanceFieldTexture1)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, GlobalDistanceFieldSampler1)  
        UNIFORM_MEMBER_TEXTURE(Texture3D, GlobalDistanceFieldTexture2)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, GlobalDistanceFieldSampler2)  
        UNIFORM_MEMBER_TEXTURE(Texture3D, GlobalDistanceFieldTexture3)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, GlobalDistanceFieldSampler3)

UNIFORM_MEMBER_TEXTURE(Texture2D, AtmosphereTransmittanceTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, AtmosphereTransmittanceTextureSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture2D, AtmosphereIrradianceTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, AtmosphereIrradianceTextureSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture3D, AtmosphereInscatterTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, AtmosphereInscatterTextureSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture2D, PerlinNoiseGradientTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, PerlinNoiseGradientTextureSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture3D, PerlinNoise3DTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, PerlinNoise3DTextureSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture2D&lt;uint>, SobolSamplingTexture)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedPointWrappedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedPointClampedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedBilinearWrappedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedBilinearClampedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedTrilinearWrappedSampler)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, SharedTrilinearClampedSampler)  
        UNIFORM_MEMBER_TEXTURE(Texture2D, PreIntegratedBRDF)  
        UNIFORM_MEMBER_SAMPLER(SamplerState, PreIntegratedBRDFSampler)

END_UNIFORM_BUFFER_STRUCT(FViewUniformShaderParameters)
```