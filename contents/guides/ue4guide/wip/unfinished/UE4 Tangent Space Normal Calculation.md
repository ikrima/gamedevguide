### UE4 Tangent Space Normal Calculation

1. Step one: Retrieve the normals from VS Shader Interpolants

​ BasePixelShader::GetMaterialPixelParameters

​ KABCRigid::GetMaterialPixelParameters

​ -> MaterialTemplate::AssembleTangentToWorld

2. Step 2: Calculate the world space normals (optionally using the normal map)

   BasePixelShader::CalcMaterialParameters

   ​ MaterialTemplate::CalcMaterialParameters

- Parameters.TangentNormal = MaterialTemplate::GetMaterialNormal - this gets the tangent normal from the UE4 editor material shader (one defined in UE4 in the material editor, not code). If there's no input to the Normal pin in the material, it just returns (0, 0, 1).

- normalize(Parameters.TangentNormal)

- Parameters.WorldNormal =

  normalize(TransformTangentVectorToWorld(Parameters.TangentToWorld, Parameters.TangentNormal));

UE4 calculates normals similar to xNormal. Pixel Shader uses interpolated & not-normalized versions of the normals. Normalization is done at the very end (after the normal map lookup from the texture).

For details,

Look at MaterialTemplate.usf:

Parameters.TangentNormal = GetMaterialNormal(Parameters);
Parameters.TangentNormal = normalize(Parameters.TangentNormal);
Parameters.WorldNormal = normalize(TransformTangentVectorToWorld(Parameters.TangentToWorld, Parameters.TangentNormal));

### **Pixel Shader Transformation**

In regards to the interpolated tangent space the baker in both Blender and the xnormal plugin will keep the vertex normal and the vertex tangent normalized in the vertex shader. However, in the pixel shader the "unnormalized" and interpolated vertex normal and tangent are used to decode the tangent space normal. The bitangent is constructed here to avoid the use of an additional interpolater and again is NOT normalized.

// vNt is the tangent space normal
vB = sign \* cross(vN, vT);
vNout = normalize( vNt.x \* vT + vNt.y \* vB + vNt.z \* vN );

The key to get flawless results is that the baker is designed to do the EXACT inverse of this very transformation allowing the pixel shader to remain fast and simple.

*From <http://wiki.blender.org/index.php/Dev:Shading/Tangent_Space_Normal_Maps>*
