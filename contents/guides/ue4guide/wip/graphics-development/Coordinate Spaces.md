---
sortIndex: 1
---

##### UE4 is a Left Handed Coordinate System

**Coordinate System: **Left handed, Z-Up, X-axis is forward, Y-axis is right

- UV (0,0) => is Top Left corner of image

- **NOTE:** UVs get flipped on import from FBX files

**Matrix**

- Row addressable M\[RowIndex]\[ColumnIndex]

- Matrix stored as row major m\[0]-m\[3] = first row, m\[4]-m\[7] = second row

- Matrices are post multiplied (x \* M \* V \* P)

  - Which basically just means you can treat everything as column addressable, column major and pretending matrices are pre-multiplied


#### Spaces

| **Space in Unreal** | **Other Names**                                              | **Description**                                              |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Tangent**         |                                                              | Orthogonal (can deviate after interpolation), can be left or right handed. The TangentToLocal transform contains rotation only, so it is OrthoNormal (can be inverted by transposing). |
| **Local**           | **Object Space**                                             | Orthogonal, can be left or right handed (triangle cull order needs adjustment). The LocalToWorld transform contains rotation, non-uniform scaling (including negative non-uniform scaling which can change the winding order), and translation. |
| **World**           |                                                              | The WorldToView transform contains only rotation and translation, so distances in View space are the same as in World space. |
| **TranslatedWorld** |                                                              | World       TranslatedWorld - PreviewTranslation                                                                    TranslatedWorld    World + PreviewTranslation |
| **View**            | **CameraSpace**                                              | The ViewToClip transform contains scale on x and y, but no translation (which would be an off center projection). It scales and translates z. It also applies a projection to convert into the homogeneous ClipSpace. |
| **Clip**            | **HomogeniousCoordinates**, **PostProjectionSpace**, **ProjectionSpace** | After the perspective projection matrix was applied. Note that W in Clip space is the same as View Space Z. |
| **Screen**          | **NormalizedDeviceCoordinates** from OpenGL                  | After the perspective divide:                                 left/right -1,1                                                                       top/bottom 1,-1                                            near/far 0,1 (OpenGL RHI needs to transform this to -1,1) |
| **Viewport**        | **ViewportCoordinates**, **WindowCoordinates**               | In pixels:                                                                                                          left/right 0,width-1                                                               top/bottom 0,height-1 |



#### Space Transformations

Transformation between spaces should always be named using the form ***X To Y***.

**Examples:**

- WorldToView

- TranslatedWorldToView

- TangentToWorld

*Reference From <https://docs.unrealengine.com/en-us/Engine/Basics/CoordinateSpace>*