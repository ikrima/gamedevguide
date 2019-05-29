---
sortIndex: 2
---

# 3 classes of lights:

1. Static: Precomputed lighting & shadowing stored in the lightmap for static objects.

1. Stationary: Lights can't move but color & brightness can change.

   - Indirect is baked through Lightmass **(and always used even if the Light visibility is off; can control though through IndirectLightingIntensity)**

   - Direct lighting is calculated as normal using deferred shading

   - Static Object Shadowing is stored in distance field shadow maps (crisp even at low resolution)

   - Dynamic Object Shadowing uses two dynamic lights: one to create distance field shadows for casting shadows from dynamic objects to static objects, the other to cast shadows from world onto objects

   - **Directional Stationary Lights:** Special case that uses Cascaded Shadow Maps as well as static shadows. Has ability to define a smaller cascade and blend between CSM to Distance Field Shadows

1. Movable: Fully dynamic lights

## Sky Lights

- Basically a cubemap capture of everything in the scene farther from SkyDistanceThreshold from the light position

- Static at runtime but code looks as if it calculates it every frame

```cpp
  GameEngine.cpp: USkyLightComponent::UpdateSkyCaptureContents(Context.World());)
```

- Applies bent normal ambient occlusion for local shadowing

## Ambient Cube

- Cubemap IBL; doesn't use ambient occlusion baked data

- Not really sure how this is any different than Sky Lights?

## Lightmass

- GI Solver for baking lighting

- Ambient Occlusion is turned off by default in lightmass. Turn it on in the World Settings

- AO is baked into the resulting lightmap

- Generates Bent-normal data for use with Stationary Skylights

- Generates Distance Shadowmaps for Stationary lights

- Static Lights: Supports Area lights, Translucent Shadows

- Lightmass Importance Volume controls photon distribution. Movable objects outside of Lightmass Importance Volume get zero indirect. Static geo gets one bounce indirect

- *Static Lighting Level Scale:* Set physical scale of the world for baking (adjusts heuristics for photon firing)

## Reflection Capture

- Reflection Captures are cubemaps for providing indirect specular

- ReflectionCaptureActors update dynamically for editing but are static at runtime

- Specular Convolution on the environment map is used for different roughness materials

- Pure reflection capture on rough surfaces results in overbrightness b/c lack of local occlusion. As a workaround, the lightmap data is interpolated with the reflection capture based on material roughness. B/c of this,

  **Static light types should not be used together with the Reflection Environment as they will put direct lighting in the lightmap.**

## Stationary Lights & Shadowing:

Stationary lights generate two shadow maps per movable object. Can be a perfect hit if movable object is large or there are lots of them.

Any movable meshes (Mobility == Movable or InterpActor / KActor / SkeletalMeshActor) when combined with stationary lights have to use a special kind of shadow called a Preshadow. This handles the static environment casting dynamic shadows onto the dynamic object. The entire environment between the movable object and the stationary light will have to be rendered into the Preshadow, but only when the movable object actually moves enough to require an update.

Some general info on stationary lights here, doesn't go into detail on Preshadows, but they are what allows the static and lightmapped arches to cast shadows on the movable spheres.<https://rocket.unrealengine.com/docs/ue4/INT/Engine/Subsystems/Rendering/LightingAndShadows/Precomputed/StationaryLights/index.html#directshadowing>

There are a few performance hazards that happen with movable objects and stationary lights:

- If there are lots of movable objects (hundreds), the per-object shadow method used can end up being less efficient than if whole scene shadows were used. You don't have much control over this right now other than to limit the number of stationary lights that affect an area, hopefully we will get better controls in the future.

- If the movable object is very large, and it moves, this can cause the entire scene to have to be re-rendered into the Preshadow depth map. This is what the warning is talking about. This will be both a CPU and GPU cost, however it will only happen for one frame (results are cached until the object moves far enough to invalidate the cache) so it's usually pretty hard to measure. If the movable objects move every frame, it can show up in 'stat shadowrendering' (CPU) or 'profilegpu' (GPU).

  If the movable object is only changed occasionally you are probably fine. In the end you just need to make sure your performance is good enough on your target hardware. Useful commands for investigation are:

- 'stat unit' - shows the 3 parallel thread - max of GT, RT and GPU gives the frame time

- 'stat scenerendering' - overview of CPU rendering thread time

- 'stat dumpframe -ms=.1' - full stat hierarchy of where CPU time is going

- 'stat shadowrendering' - CPU RT time issuing shadow depth draw calls

- 'profilegpu' - measures GPU execution time

*Reference From <https://answers.unrealengine.com/questions/3438/large-actor-receives-a-pre-shadow-and-will-cause-a.html>*
