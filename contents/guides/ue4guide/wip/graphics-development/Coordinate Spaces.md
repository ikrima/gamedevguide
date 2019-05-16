**UE4 is a Left Handed Coordinate System**

**Coordinate System: **Left handed, Z-Up, X-axis is forward, Y-axis is right

- UV (0,0) =&gt; is Top Left corner of image

- **NOTE:** UVs get flipped on import from FBX files

**Matrix**

- Row addressable M\[RowIndex\]\[ColumnIndex\]

- Matrix stored as row major m\[0\]-m\[3\] = first row, m\[4\]-m\[7\] = second row

- Matrices are post multiplied (x \* M \* V \* P)

  - Which basically just means you can treat everything as column addressable, column major and pretending matrices are pre-multiplied

**Spaces**

<table><thead><tr class="header"><th><strong>Space in Unreal</strong></th><th><strong>Other Names</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><strong>Tangent</strong></td><td> </td><td>Orthogonal (can deviate after interpolation), can be left or right handed. The TangentToLocal transform contains rotation only, so it is OrthoNormal (can be inverted by transposing).</td></tr><tr class="even"><td><strong>Local</strong></td><td><strong>Object Space</strong></td><td>Orthogonal, can be left or right handed (triangle cull order needs adjustment). The LocalToWorld transform contains rotation, non-uniform scaling (including negative non-uniform scaling which can change the winding order), and translation.</td></tr><tr class="odd"><td><strong>World</strong></td><td> </td><td>The WorldToView transform contains only rotation and translation, so distances in View space are the same as in World space.</td></tr><tr class="even"><td><strong>TranslatedWorld</strong></td><td> </td><td><table><thead><tr class="header"><th>World</th><th>TranslatedWorld - PreViewTranslation</th></tr></thead><tbody><tr class="odd"><td>TranslatedWorld</td><td>World + PreViewTranslation</td></tr></tbody></table><p>Translated matrices are used to remove camera position from the combined transform matrices, which improves precision when transforming vertices.</p></td></tr><tr class="odd"><td><strong>View</strong></td><td><strong>CameraSpace</strong></td><td>The ViewToClip transform contains scale on x and y, but no translation (which would be an off center projection). It scales and translates z. It also applies a projection to convert into the homogeneous ClipSpace.</td></tr><tr class="even"><td><strong>Clip</strong></td><td><strong>HomogeniousCoordinates</strong>, <strong>PostProjectionSpace</strong>, <strong>ProjectionSpace</strong></td><td>After the perspective projection matrix was applied. Note that W in Clip space is the same as View Space Z.</td></tr><tr class="odd"><td><strong>Screen</strong></td><td><strong>NormalizedDeviceCoordinates</strong> from OpenGL</td><td><p>After the perspective divide:</p><table><thead><tr class="header"><th>left/right</th><th>-1,1</th></tr></thead><tbody><tr class="odd"><td>top/bottom</td><td>1,-1</td></tr><tr class="even"><td>near/far</td><td>0,1 (OpenGL RHI needs to transform this to -1,1)</td></tr></tbody></table></td></tr><tr class="even"><td><strong>Viewport</strong></td><td><strong>ViewportCoordinates</strong>, <strong>WindowCoordinates</strong></td><td><p>In pixels :</p><table><thead><tr class="header"><th>left/right</th><th>0, width-1</th></tr></thead><tbody><tr class="odd"><td>top/bottom</td><td>0, height-1</td></tr></tbody></table></td></tr></tbody></table>

**Space Transformations**

Transformation between spaces should always be named using the form **_X To Y_**.

**Examples:**

- WorldToView

- TranslatedWorldToView

- TangentToWorld

_From &lt;<https://docs.unrealengine.com/en-us/Engine/Basics/CoordinateSpace>&gt;_
