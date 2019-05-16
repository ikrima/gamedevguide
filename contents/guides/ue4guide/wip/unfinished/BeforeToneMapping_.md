---
sortIndex: 2
---

BeforeToneMapping:

- SceneColor: Looks like correctly lit framebuffer

  - HDR

  - Without Separate Translucency

- SeparateTranslucency: Doesn’t work

- PostProcessInput0: Scene + SeparateTranslucency

- PostProcessInput1: SeparateTranslucency

- PostProcessInput2: Scene without Translucency

AfterToneMapping:

- Same as above except SceneColor has incorrect data

<table><thead><tr class="header"><th><strong>Blendable Location</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><strong>Before Tonemapping</strong></td><td>PostProcessInput0 provides the scene color with all lighting in HDR. Use this to fix issues with temporal antialiasing and GBuffer lookups e.g. depth, normals.</td></tr><tr class="even"><td><strong>After Tonemapping</strong></td><td>Preferred location for performance as the color is LDR and therefore requires less precision and bandwidth. This is after tone mapping and color grading.</td></tr><tr class="odd"><td><strong>Before Translucency</strong></td><td>This is even earlier in the pipeline than 'Before Tonemapping' before translucency was combined with the scene color. Note that SeparateTranslucency is composited later than normal translucency.</td></tr><tr class="even"><td><strong>Replacing the Tonemapper</strong></td><td>PostProcessInput0 provides the HDR scene color, PostProcessInput1 has the SeparateTranslucency (Alpha is mask), PostprocessInput2 has the low resolution bloom input.</td></tr></tbody></table>

_From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/PostProcessMaterials/index.html>&gt;_

All material instances properties are blended, no matter if the property checkbox is checked or not (in that case it blends the property from the parent). This is different from the post processing settings where an unchecked property is not having any effect. This means if you blend a material instance, all properties are getting blended.

_From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/PostProcessMaterials/index.html>&gt;_

Post process materials you can look up into screen aligned buffers, but you need to know the right UVs. The **ScreenPosition** material expression outputs the UV that you would expect (0,0 at the left top of the viewport and 1,1 at the bottom right). Using the **texture coordinate** material expression might give you different results. This is because the actual texture (more correctly it is a render target) is potentially larger than the viewport. It can be larger in editor because we share this texture for multiple viewports and the largest extent is use for all viewports. Even in game it can be larger in some cases (e.g. SceneCaptureActors might have a smaller viewport, Matinee black borders, Splitscreen, VR, ...). The texture coordinate material expression gives you the UV for this larger texture. If you only need a relative offset (e.g. pixel sized edge detection) you need to scale with the right size. The **SceneTexture** material expression has outputs for the size and the inverse of the size (efficient and useful for pixel offsets). If you want to get the viewport UV (e.g. to map texture to the viewport) you can use the **ScreenPosition** material expression or you make the needed computations manually (more control, can be slower). For this, you need the **ViewSize** material expression. To test all that, you can use the console variable **r.ViewPortTest** which allows you to test various viewport configurations.

_From &lt;<https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/PostProcessMaterials/index.html>&gt;_
