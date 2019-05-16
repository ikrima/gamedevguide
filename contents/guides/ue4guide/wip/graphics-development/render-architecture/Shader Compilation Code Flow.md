FMaterial::BeginCompileShaderMap

-   Initializes **FHLSLMaterialTranslator**()

    - Set up which material properties are shared (ex: SharedPixelProperties\[MP\_Normal\] = true;)
    
      

-   Calls **FHLSLMaterialTranslator::Translate():** Translate from Material Node graph into textual shader code representation

    -   Material-&gt;GatherExpressionsForCustomInterpolators(Expressions);

    -   GatherCustomVertexInterpolators(Expressions);

    -   Material-&gt;GatherCustomOutputExpressions(CustomOutputExpressions);

    -   CompileCustomOutputs(CustomOutputExpressions, SeenCustomOutputExpressionsClases, true);                        

    -   Material-&gt;CompilePropertyAndSetMaterialProperty() on MP\_Normal, MP\_DiffuseColor, MP\_Specular, MP\_Roughness, etc

    -   Determines if properties are actually used && validation checking. Eg:

bUsesEmissiveColor = IsMaterialPropertyUsed(MP\_EmissiveColor, Chunk\[MP\_EmissiveColor\], FLinearColor(0, 0, 0, 0), 3);

-   Determines number of vertex interpolators/uv tex coords/etc

-   MaterialCompilationOutput.UniformExpressionSet.SetParameterCollections(ParameterCollections);

-   MaterialCompilationOutput.UniformExpressionSet.CreateBufferStruct();

 



-   Calls **FHLSLMaterialTranslator::GetMaterialEnvironment()**

    -   Sets more fundamental defines such as: NEEDS\_PARTICLE\_POSITION, NEEDS\_SCENE\_TEXTURES, USES\_TRANSFORM\_VECTOR, USES\_EMISSIVE\_COLOR

    -   Add uniform buffer declarations for any parameter collections referenced

const FString CollectionName = FString::Printf(TEXT("MaterialCollection%u"), CollectionIndex);

FShaderUniformBufferParameter::ModifyCompilationEnvironment(\*CollectionName, ParameterCollections\[CollectionIndex\]-&gt;GetUniformBufferStruct(), InPlatform, OutEnvironment);

 

-   Calls **FHLSLMaterialTranslator::GetMaterialShaderCode():**

    -   Responsible for compiling and filling MaterialTemplate.ush

    -   Uses **LazyPrintf.PushParam()** and Printf() to stringify everything into the generated Material.ush file

    -   **GetSharedInputsMaterialCode**():

        -   Generates the fields for FPixelMaterialInputs which are shared properties across the shader (like MP\_Normal, MP\_BaseColor, MP\_Roughness, etc)

        -   Generates initializers for them too

  

-   Calls main compilation in **NewShaderMap-&gt;Compile():**

    -   **Material-&gt;SetupMaterialEnvironment()**: Sets majority of shader defines (including material specific ones like staticswitches, etc) by calling. Ex:

        -   Defines from the umaterial uproperties such as: MATERIAL\_TWOSIDED, MATERIAL\_NONMETAL, MATERIAL\_HQ\_FORWARD\_REFLECTIONS

        -   Defines from the material itself such as: GetBlendMode() =&gt; MATERIALBLENDING\_MASKED|MATERIALBLENDING\_SOLID, MATERIAL\_FULLY\_ROUGH

        -   Defines also fundamental things such as MATERIAL\_DOMAIN\_SURFACE|MATERIAL\_DOMAIN\_DEFERREDDECAL|… & MATERIAL\_SHADINGMODEL\_UNLIT|MATERIAL\_SHADINGMODEL\_DEFAULT\_LIT|…

        -   Also uses cvar values to determine whether to set defines or not: r.StencilForLODDither =&gt; USE\_STENCIL\_LOD\_DITHER\_DEFAULT



-   Iterate over all vertex factories and materials and compile them together if this material applies
