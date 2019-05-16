Reflection Actors: Buildtime scene cubemap captures projected onto spheres/boxes.

-   Can nest them and at run time, shader will interpolate between them to fake parallax correct reflections

-   Obviously has light leak b/c it doesn't take into account local occlusion

-   Does not provide dynamic or sharp refletions

-   Updated dynamically in the editor but locked in game mode

-   Different glossy levels point to different parts of the mipmap chain

-   Roughness material parameter is used to blend between indirect diffuse lightmap data and the reflection cubemap (i.e. fully rough = using purely lightmap indirect data)

-   Lightmap data should not include direct lighting for this to work (otherwise you get double lighting) i.e. turn off static lights when baking lightmap data and only use stationary lights

-   <https://docs.unrealengine.com/latest/INT/Engine/Rendering/LightingAndShadows/ReflectionEnvironment/index.html>

 

Reflection Environment: provides indirect specular

-   indirect meaning specular from other objects in the scene. Direct meaning from the lights

-   Direct specular through analytical lights & skylight

-   Needs lightmass to build indirect diffuse lighting (so it can sample it to calculate indirect specular)



 

HiddenPrimitives on FSceneView

<https://forums.unrealengine.com/showthread.php?2964-Hiding-certain-objects-from-being-drawn-on-a-camera-or-SceneCapture2D-object&p=66113#post66113>

