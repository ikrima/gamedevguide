---
sortIndex: 2
sidebar: ue4guide
---

# Guides:

### Lightmass Deep Dive:

[Lightmass Deep Dive 2018 Vol.1: Lightmass 内部アルゴリズム概要(Lightmap 編)\]](https://www.slideshare.net/EpicGamesJapan/lightmass-deep-dive-2018-vol1-lightmasslightmap)

<img src="process_markdown/assets/media/image1.png" alt="Machine generated alternative text: " style="width:4.42708in;height:3.69792in" >

![Machine generated alternative text:  ](file:///C:/Users/KITELI~1/AppData/Local/Temp/msohtmlclip1/02/clip_image001.png)

[Lightmass Deep Dive 2018 Vol. 2: Lightmap 作成のための Lightmass 設定方法](https://www.slideshare.net/EpicGamesJapan/lightmass-deep-dive-2018-vol-2-lightmaplightmass)

<img src="process_markdown/assets/media/image2.png" alt="Liľltrna;s Deeo Dve XII 8 " style="width:4.42708in;height:3.69792in" >

![image1](../../_assets/image1-1556561794310.png)

### Taming lightmass guide/Lightmass For Large Console Games

[UE4 Lightmass for Large Console Games (UE4 Lightmass Deep Dive)](https://www.slideshare.net/EpicGamesJapan/ue4-lightmass-for-large-console-games)

![image2](../../_assets/image2.png)

<img src="process_markdown/assets/media/image3.png" alt="Rich web content titled: UE4 Lightmass for Large Console Games (UE4 Lightmass Deep Dive)" style="width:4.42708in;height:3.69792in" >

[Practical usage of Lightmass in Architectural Visualization (UE4 Lightmass Deep Dive)](https://www.slideshare.net/EpicGamesJapan/practical-usage-of-lightmass-in-architectural-visualization-ue4-lightmass-deep-dive)

(<https://www.slideshare.net/EpicGamesJapan/practical-usage-of-lightmass-in-architectural-visualization-ue4-lightmass-deep-dive>)

<img src="process_markdown/assets/media/image4.png" alt="Rich web content titled: Practical usage of Lightmass in Architectural Visualization (UE4 Lightmass Deep Dive)" style="width:4.42708in;height:3.69792in" >

## Making Lightmass Understandable:

<https://forums.unrealengine.com/development-discussion/architectural-and-design-visualization/60547-lets-make-lightmass-epic-and-understandable?88952-Lets-make-Lightmass-EPIC-(and-understandable)=&highlight=swarm>

First, there are two completely separate paths for punctual lights (directional, spot, point) than for sky lights.

Lightmass is heavily optimized around solving indirect lighting from punctual lights with high quality. In particular, the case where you have bright sunlight coming in a small window and hitting the wall/floor, lighting up the whole room, is what I would consider the primary use case. Lighting with sky lights / HDRI is a much more recent implementation and honestly it's not very high quality.

#### Punctual light method:

The short summary is that Final gathering is used to solve the first lighting bounce, and photons are used for bounces after that along with guiding the final gather.

1. Many photons are emitted from the light and deposited on the scene as directly visible (direct photons). We bounce these once and record any direct photon paths that resulted in a bounced photon being deposited. This identifies small (but critical) light entrances like windows. DirectPhotonDensity controls how many photons are emitted in this stage, and IndirectPhotonPathDensity controls how many paths are recorded (how accurately we find small windows).

1. Many more photons are emitted from the light, along the direct photon paths. These are bounced for as many times as you requested NumIndirectLightingBounces. Each bounce has a much smaller number of photons successfully bouncing so more bounces after 2 has only a small impact on build times. IndirectPhotonDensity + IndirectIrradiancePhotonDensity control how many photons are emitted to represent multi-bounce lighting.

Now that the photons are ready for the entire scene we can start operating on each lightmap texel.

3. Direct shadowing is computed for static and stationary lights. For static lights which use area shadows, NumShadowRays and NumPenumbraShadowRays control the quality of the penumbra, more samples are needed to support very large, smooth penumbras.

3. We check to see if this texel is covered by other irradiance computations (steps 5-7). If there is, we reuse these nearby irradiance samples through interpolation. If not, we continue to steps 5-7. This is called Irradiance caching. Too much interpolation causes indirect shadows to be lost. The amount of reuse is controlled by RecordRadiusScale, PointBehindRecordMaxAngle, InterpolationMaxAngle. During the interpolation, we can gather even more nearby irradiance samples to further smooth the lighting.

3. Nearby indirect photons are gathered around the lightmap texel. These tell us where most of the bright lighting is coming from, eg the small bright spot that lights up the entire room.

3. We begin the final gather. Rays are traced out in all directions for the hemisphere of the texel. At the end of the ray we either hit some geometry, where we gather the lighting from photons at that point, or we miss geometry and hit the sky, where we evaluate the sky lighting. NumHemisphereSamples controls how many rays there are in this first refinement step.

3. We do multiple iterations of refining the final gather. Each sector of the hemisphere is subdivided and we trace more rays to discover incoming lighting. We subdivide deeply around incoming indirect photons to make sure we resolve the small bright spot on the ground lighting the whole room. This is a form of importance sampling, also called importance driven final gathering. We also subdivide anytime there are significant differences between neighbors to reduce noise, this is called adaptive sampling. NumAdaptiveRefinementLevels controls how many refinement levels there are, AdaptiveBrightnessThreshold controls how big of a neighbor difference there must be to refine a sector.

As to the Lightmass WorldSettings options, IndirectLightingSmoothness operates on the settings in step 4), the amount of irradiance cache smoothing.

IndirectLightingQuality increases the number of samples and depth of refinement in steps 5-7, the final gathering.

#### Sky light method (assuming static skylight, stationary is a bit different):

1. The sky light HDR texture is exported to Lightmass as an 3 band spherical harmonic, which you can think of as an extremely low resolution cubemap (2x2 on each face approx). So if you have a very bright spot in the sky cubemap it will be spread out over a large region. This is basically prefiltering to avoid noise.

1. We do a mini final gather at each lightmap texel and compute sky lighting with a very low number of rays. This is cached on the surface and will become the first bounce of skylight GI once the final gather accesses it.

1. During the final gather, any rays that hit the scene look up the cached sky direct lighting from step 2), which now becomes first bounce sky lighting. Any rays that miss the scene and hit the background lookup from the sky SH, this is sky direct lighting. We refine the final gather based on brightness differences between sectors of the hemisphere, but no importance sampling is done because we don't have any photons from the sky.

So now you can see why static sky lights have limited quality and only support one indirect lighting bounce. This is something we could improve, but it's a lot of work and complexity. Specifically, we should actually export a cubemap to Lightmass, and do importance sampling of the cubemap's contents (trace more rays to the brighter texels).

*Reference From <https://forums.unrealengine.com/development-discussion/architectural-and-design-visualization/60547-lets-make-lightmass-epic-and-understandable?88952-Lets-make-Lightmass-EPIC-(and-understandable)=&highlight=swarm>*

## Lightmass Lightmap Config

Most common settings to tweak:

    [DevOptions.PrecomputedDynamicObjectLighting]
    SurfaceLightSampleSpacing=300
    FirstSurfaceSampleLayerHeight=50
    SurfaceSampleLayerHeightSpacing=250
    NumSurfaceSampleLayers=2

Look at BaseLightmass.ini for all of the settings to tweak baking lightmaps

Tweak multiple skybounce lighting

*Reference From <https://forums.unrealengine.com/development-discussion/rendering/112827-lightmass-multi-bounced-sky-lighting/page17>*
