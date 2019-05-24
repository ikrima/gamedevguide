---
sortIndex: 7
---

FMaterial::BeginCompileShaderMap

- Initializes **FHLSLMaterialTranslator**()

  - Set up which material properties are shared (ex: SharedPixelProperties[MP_Normal] = true;)


- Calls **FHLSLMaterialTranslator::Translate():** Translate from Material Node graph into textual shader code representation

  - Material->GatherExpressionsForCustomInterpolators(Expressions);

  - GatherCustomVertexInterpolators(Expressions);

  - Material->GatherCustomOutputExpressions(CustomOutputExpressions);

  - CompileCustomOutputs(CustomOutputExpressions, SeenCustomOutputExpressionsClases, true);

  - Material->CompilePropertyAndSetMaterialProperty() on MP_Normal, MP_DiffuseColor, MP_Specular, MP_Roughness, etc

  - Determines if properties are actually used && validation checking. Eg:

    bUsesEmissiveColor = IsMaterialPropertyUsed(MP_EmissiveColor, Chunk\[MP_EmissiveColor], FLinearColor(0, 0, 0, 0), 3);

  - Determines number of vertex interpolators/uv tex coords/etc

  - MaterialCompilationOutput.UniformExpressionSet.SetParameterCollections(ParameterCollections);

  - MaterialCompilationOutput.UniformExpressionSet.CreateBufferStruct();




- Calls **FHLSLMaterialTranslator::GetMaterialEnvironment()**

  - Sets more fundamental defines such as: NEEDS_PARTICLE_POSITION, NEEDS_SCENE_TEXTURES, USES_TRANSFORM_VECTOR, USES_EMISSIVE_COLOR

  - Add uniform buffer declarations for any parameter collections referenced
  
    const FString CollectionName = FString::Printf(TEXT("MaterialCollection%u"), CollectionIndex);
  
    FShaderUniformBufferParameter::ModifyCompilationEnvironment(\*CollectionName, ParameterCollections\[CollectionIndex]->GetUniformBufferStruct(), InPlatform, OutEnvironment);
  
  
  
- Calls **FHLSLMaterialTranslator::GetMaterialShaderCode():**

  - Responsible for compiling and filling MaterialTemplate.ush

  - Uses **LazyPrintf.PushParam()** and Printf() to stringify everything into the generated Material.ush file

  - **GetSharedInputsMaterialCode**():

    - Generates the fields for FPixelMaterialInputs which are shared properties across the shader (like MP_Normal, MP_BaseColor, MP_Roughness, etc)

    - Generates initializers for them too




- Calls main compilation in **NewShaderMap->Compile():**
- **Material->SetupMaterialEnvironment()**: Sets majority of shader defines (including material specific ones like staticswitches, etc) by calling. Ex:
  
  - Defines from the umaterial uproperties such as: MATERIAL_TWOSIDED, MATERIAL_NONMETAL, MATERIAL_HQ_FORWARD_REFLECTIONS
  
  - Defines from the material itself such as: GetBlendMode() => MATERIALBLENDING_MASKED|MATERIALBLENDING_SOLID, MATERIAL_FULLY_ROUGH
  
  - Defines also fundamental things such as MATERIAL_DOMAIN_SURFACE|MATERIAL_DOMAIN_DEFERREDDECAL|… & MATERIAL_SHADINGMODEL_UNLIT|MATERIAL_SHADINGMODEL_DEFAULT_LIT|…
  
  - Also uses cvar values to determine whether to set defines or not: r.StencilForLODDither => USE_STENCIL_LOD_DITHER_DEFAULT


- Iterate over all vertex factories and materials and compile them together if this material applies
