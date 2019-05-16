-   Primitive Uniform Buffer



BEGIN\_UNIFORM\_BUFFER\_STRUCT(FPrimitiveUniformShaderParameters,ENGINE\_API)  
        UNIFORM\_MEMBER(FMatrix,LocalToWorld)                // always needed  
        UNIFORM\_MEMBER\_EX(FVector4,InvNonUniformScaleAndDeterminantSign,EShaderPrecisionModifier::Half) //often needed  
        UNIFORM\_MEMBER(FVector4,ObjectWorldPositionAndRadius)        // needed by some materials  
        UNIFORM\_MEMBER(FMatrix,WorldToLocal)                // rarely needed  
        UNIFORM\_MEMBER(FVector,ActorWorldPosition)  
        UNIFORM\_MEMBER\_EX(float,UseSingleSampleShadowFromStationaryLights,EShaderPrecisionModifier::Half)          
        UNIFORM\_MEMBER(FVector,ObjectBounds)                // only needed for editor/development  
        UNIFORM\_MEMBER(float,LpvBiasMultiplier)  
        UNIFORM\_MEMBER\_EX(float,DecalReceiverMask,EShaderPrecisionModifier::Half)  
        UNIFORM\_MEMBER\_EX(float,PerObjectGBufferData,EShaderPrecisionModifier::Half)                // 0..1, 2 bits, bDistanceFieldRepresentation, bHeightfieldRepresentation  
        UNIFORM\_MEMBER\_EX(float,UseVolumetricLightmapShadowFromStationaryLights,EShaderPrecisionModifier::Half)                  
        UNIFORM\_MEMBER\_EX(float,UseEditorDepthTest,EShaderPrecisionModifier::Half)  
        UNIFORM\_MEMBER\_EX(FVector4,ObjectOrientation,EShaderPrecisionModifier::Half)  
        UNIFORM\_MEMBER\_EX(FVector4,NonUniformScale,EShaderPrecisionModifier::Half)  
        UNIFORM\_MEMBER(FVector, LocalObjectBoundsMin)                // This is used in a custom material function (ObjectLocalBounds.uasset)  
        UNIFORM\_MEMBER(FVector, LocalObjectBoundsMax)                // This is used in a custom material function (ObjectLocalBounds.uasset)  
        UNIFORM\_MEMBER(uint32,LightingChannelMask)  
END\_UNIFORM\_BUFFER\_STRUCT(FPrimitiveUniformShaderParameters)

 

-   View Uniform Buffer

 

\#define VIEW\_UNIFORM\_BUFFER\_MEMBER\_TABLE \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, TranslatedWorldToClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, WorldToClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, TranslatedWorldToView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ViewToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, TranslatedWorldToCameraView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, CameraViewToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ViewToClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ViewToClipNoAA) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ClipToView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ClipToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, SVPositionToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ScreenToWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ScreenToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, ViewForward, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, ViewUp, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, ViewRight, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, HMDViewNoRollUp, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, HMDViewNoRollRight, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, InvDeviceZToWorldZTransform) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector4, ScreenPositionScaleBias, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, WorldCameraOrigin) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, TranslatedWorldCameraOrigin) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, WorldViewOrigin) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, PreViewTranslation) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevProjection) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevViewProj) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevViewRotationProj) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevViewToClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevClipToView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevTranslatedWorldToClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevTranslatedWorldToView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevViewToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevTranslatedWorldToCameraView) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevCameraViewToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, PrevWorldCameraOrigin) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, PrevWorldViewOrigin) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, PrevPreViewTranslation) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevInvViewProj) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, PrevScreenToTranslatedWorld) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FMatrix, ClipToPrevClip) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, TemporalAAJitter) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, GlobalClippingPlane) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector2D, FieldOfViewWideAngles) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector2D, PrevFieldOfViewWideAngles) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector4, ViewRectMin, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, ViewSizeAndInvSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, BufferSizeAndInvSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, BufferBilinearUVMinMax) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(int32, NumSceneColorMSAASamples) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, PreExposure, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, OneOverPreExposure, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector4, DiffuseOverrideParameter, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector4, SpecularOverrideParameter, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector4, NormalOverrideParameter, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector2D, RoughnessOverrideParameter, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, PrevFrameGameTime) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, PrevFrameRealTime) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, OutOfBoundsMask, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, WorldCameraMovementSinceLastFrame) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, CullingSign) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, NearPlane, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, AdaptiveTessellationFactor) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, GameTime) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, RealTime) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, MaterialTextureMipBias) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, MaterialTextureDerivativeMultiply) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, Random) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, FrameNumber) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, StateFrameIndexMod8) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, CameraCut, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, UnlitViewmodeMask, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FLinearColor, DirectionalLightColor, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(FVector, DirectionalLightDirection, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_ARRAY(FVector4, TranslucencyLightingVolumeMin, \[TVC\_MAX\]) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_ARRAY(FVector4, TranslucencyLightingVolumeInvSize, \[TVC\_MAX\]) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, TemporalAAParams) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector4, CircleDOFParams) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldSensorWidth) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldFocalDistance) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldScale) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldFocalLength) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldFocalRegion) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldNearTransitionRegion) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, DepthOfFieldFarTransitionRegion) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, MotionBlurNormalizedToPixel) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, bSubsurfacePostprocessEnabled) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, GeneralPurposeTweak) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, DemosaicVposOffset, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, IndirectLightingColorScale) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, HDR32bppEncodingMode, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, AtmosphericFogSunDirection) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogSunPower, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogPower, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogDensityScale, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogDensityOffset, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogGroundOffset, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogDistanceScale, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogAltitudeScale, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogHeightScaleRayleigh, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogStartDistance, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogDistanceOffset, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, AtmosphericFogSunDiscScale, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, AtmosphericFogRenderMask) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, AtmosphericFogInscatterAltitudeSampleNum) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FLinearColor, AtmosphericFogSunColor) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, NormalCurvatureToRoughnessScaleBias) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, RenderingReflectionCaptureMask) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FLinearColor, AmbientCubemapTint) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, AmbientCubemapIntensity) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, SkyLightParameters) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FLinearColor, SkyLightColor) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_ARRAY(FVector4, SkyIrradianceEnvironmentMap, \[7\]) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, MobilePreviewMode) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, HMDEyePaddingOffset) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_EX(float, ReflectionCubemapMaxMip, EShaderPrecisionModifier::Half) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, ShowDecalsMask) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(uint32, DistanceFieldAOSpecularOcclusionMode) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, IndirectCapsuleSelfShadowingIntensity) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, ReflectionEnvironmentRoughnessMixingScaleBiasAndLargestWeight) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(int32, StereoPassIndex) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_ARRAY(FVector4, GlobalVolumeCenterAndExtent, \[GMaxGlobalDistanceFieldClipmaps\]) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER\_ARRAY(FVector4, GlobalVolumeWorldToUVAddAndMul, \[GMaxGlobalDistanceFieldClipmaps\]) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, GlobalVolumeDimension) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, GlobalVolumeTexelSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, MaxGlobalDistance) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, bCheckerboardSubsurfaceProfileRendering) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricFogInvGridSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricFogGridZParams) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector2D, VolumetricFogSVPosToVolumeUV) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, VolumetricFogMaxDistance) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricLightmapWorldToUVScale) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricLightmapWorldToUVAdd) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricLightmapIndirectionTextureSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, VolumetricLightmapBrickSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(FVector, VolumetricLightmapBrickTexelSize) \\  
        VIEW\_UNIFORM\_BUFFER\_MEMBER(float, StereoIPD) 

 

BEGIN\_UNIFORM\_BUFFER\_STRUCT\_WITH\_CONSTRUCTOR(FViewUniformShaderParameters, ENGINE\_API)  

        VIEW\_UNIFORM\_BUFFER\_MEMBER\_TABLE  

        // Same as Wrap\_WorldGroupSettings and Clamp\_WorldGroupSettings, but with mipbias=MaterialTextureMipBias.  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, MaterialTextureBilinearWrapedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, MaterialTextureBilinearClampedSampler)  

        UNIFORM\_MEMBER\_TEXTURE(Texture3D&lt;uint4&gt;, VolumetricLightmapIndirectionTexture) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickAmbientVector) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients0) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients1) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients2) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients3) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients4) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, VolumetricLightmapBrickSHCoefficients5) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, SkyBentNormalBrickTexture) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, DirectionalLightShadowingBrickTexture) // FPrecomputedVolumetricLightmapLightingPolicy  

        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapBrickAmbientVectorSampler) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler0) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler1) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler2) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler3) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler4) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, VolumetricLightmapTextureSampler5) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SkyBentNormalTextureSampler) // FPrecomputedVolumetricLightmapLightingPolicy  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, DirectionalLightShadowingTextureSampler) // FPrecomputedVolumetricLightmapLightingPolicy  

        UNIFORM\_MEMBER\_TEXTURE(Texture3D, GlobalDistanceFieldTexture0)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, GlobalDistanceFieldSampler0)  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, GlobalDistanceFieldTexture1)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, GlobalDistanceFieldSampler1)  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, GlobalDistanceFieldTexture2)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, GlobalDistanceFieldSampler2)  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, GlobalDistanceFieldTexture3)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, GlobalDistanceFieldSampler3)  

        UNIFORM\_MEMBER\_TEXTURE(Texture2D, AtmosphereTransmittanceTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, AtmosphereTransmittanceTextureSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture2D, AtmosphereIrradianceTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, AtmosphereIrradianceTextureSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, AtmosphereInscatterTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, AtmosphereInscatterTextureSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture2D, PerlinNoiseGradientTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, PerlinNoiseGradientTextureSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture3D, PerlinNoise3DTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, PerlinNoise3DTextureSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture2D&lt;uint&gt;, SobolSamplingTexture)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedPointWrappedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedPointClampedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedBilinearWrappedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedBilinearClampedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedTrilinearWrappedSampler)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, SharedTrilinearClampedSampler)  
        UNIFORM\_MEMBER\_TEXTURE(Texture2D, PreIntegratedBRDF)  
        UNIFORM\_MEMBER\_SAMPLER(SamplerState, PreIntegratedBRDFSampler)  

END\_UNIFORM\_BUFFER\_STRUCT(FViewUniformShaderParameters)