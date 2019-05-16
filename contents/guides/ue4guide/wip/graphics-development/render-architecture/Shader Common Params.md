Coordinate Spaces:

- Camera Space: X+ gets mapped to Z+, Y+ gets mapped to X+, Z+ gets mapped to Y+. Basically Right handed Y-up

- View Space: Same as camera space except in shadow rendering

- PreViewTranslation/etc is confusing. Here's the math:

  - ViewMatrix = PreViewTranslation \* ViewRotationMatrix

  - It's just separating out camera translation from rotation for accuracy

  - **"Translated"** prefix means camera relative space (aka 0,0,0 is camera position in world space) aka it's WorldPos \* TranslationMatrix(-CameraOrigin)

  - **"PreViewTranslation**" prefix just means before this translation happened so in actual world space

- TranslatedWorldToCameraView = TranslatedWorldToView = TranslatedViewMatrix = Inverse of camera rotation matrix

TranslatedWorldCameraOrigin = 0,0,0 (post -vieworigin translation)

WorldCameraOrigin = Camera Position

WorldViewOrigin = Camera Position (different during shadow pass)

PreViewTranslation = -CameraPosition

- TranslatedWorldToView = TranslatedViewMatrix

- FMaterialPixelParameters

  - **SvPosition**: Like SV_Position (.xy is pixel position at pixel center, z:DeviceZ, .w:SceneDepth)

this is not relative to the current viewport. RelativePixelPosition = MaterialParameters.SvPosition.xy - View.ViewRectMin.xy;

- **ScreenPosition**: Post projection position reconstructed from SvPosition, before the divide by W. left..top -1..1, bottom..top -1..1 within the viewport, W is the SceneDepth

- **WorldPosition_CamRelative:** This is just absoluteworldposition - WorldCameraOrigin. Not rotation adjusted in viewspace

* **PreViewTranslation** = -ViewOrigin

* ViewRotationMatrix = FInverseRotationMatrix(ViewRotation) \* ViewPlanesMatrix;

* **TranslatedViewMatrix** = ViewRotationMatrix;

* ViewMatrix = FTranslationMatrix(-ViewLocation) \* ViewRotationMatrix;

- WorldPosition_CamRelative =&gt; PixelPosWS - CameraOrigina1\`

* GetMaterialSharedSampler(Material.Texture2D_0Sampler,Material.Clamp_WorldGroupSettings)
