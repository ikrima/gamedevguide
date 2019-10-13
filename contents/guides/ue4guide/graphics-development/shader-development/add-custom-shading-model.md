---
sortIndex: 2
---

# Add Custom Shading Model

Global Shader: https://www.unrealengine.com/en-US/blog/how-to-add-global-shaders-to-ue4
Custom Shading Model: http://blog.felixkate.net/2016/05/22/adding-a-custom-shading-model-1/
Updated Method For Custom Shading Model: https://medium.com/@lordned/ue4-rendering-part-6-adding-a-new-shading-model-e2972b40d72d

## Add New Custom Material Properties

Add defaults to custom material properties (eg MP_CustomData2) in:

```cpp
int32 FMaterialAttributeDefintion::CompileDefaultValue(FMaterialCompiler* Compiler)
{
  int32 Ret;

    // @third party code - BEGIN Bebylon - #Eng-Feature: BBFakeSSShadingMode - Adding new property
    if (Compiler->GetMaterialShadingModel() == MSM_BBFakeSS &&
        (Property == MP_CustomData0 || Property == MP_CustomData1 || Property == MP_CustomData2 || Property == MP_CustomData3))
    {
        // Standard value type
        switch (Property)
        {
        case MP_CustomData0: Ret = Compiler->Constant(0.0f); break;
        case MP_CustomData1: Ret = Compiler->Constant(0.0f); break;
        case MP_CustomData2: Ret = Compiler->Constant(0.0f); break;
        case MP_CustomData3: Ret = Compiler->Constant(0.0f); break;
        }
    }
  // @third party code - END Bebylon
  ...
}
```

## GBuffer/Viewmode extensions

Useful Links:
https://www.unrealengine.com/en-US/blog/how-to-add-global-shaders-to-ue4
http://blog.felixkate.net/2016/05/22/adding-a-custom-shading-model-1/
https://medium.com/@lordned/ue4-rendering-part-6-adding-a-new-shading-model-e2972b40d72d
https://forums.unrealengine.com/development-discussion/rendering/1409859-custom-hlsl-tips
https://forums.unrealengine.com/development-discussion/rendering/113855-extending-custom-hlsl-custom-expressions

https://wiki.unrealengine.com/HLSL_Shaders
https://forums.unrealengine.com/showthread.php?71334-Anybody-written-a-Plugin-that-adds-Material-Nodes
https://forums.unrealengine.com/showthread.php?27766-Odessey-Creating-my-own-G-Buffer-in-UE4
https://forums.unrealengine.com/showthread.php?58489-Tutorial-Pixel-and-Compute-Shaders-in-UE4
Compute and pixel shader: https://github.com/sp0lsh/UE4ShaderPluginDemo/
https://github.com/slomp/UE4RenderDocPlugin

## Example Custom Material Model

Toon Shading: https://github.com/marynate/UnrealEngine/tree/4.16-release-toon
Compute Shader Sample with FluidSurface: https://github.com/marynate/FluidSurface

# Custom Shaders Development Brain Dump

Overview documentation at <https://docs.unrealengine.com/latest/INT/Programming/Rendering/ShaderDevelopment/index.html>

Vertex Factories interface between specific mesh & shader

FVertexFactoryType represents a unique mesh type

FVertexFactory instance contains per-instance data to support that unique mesh (e.g. bone matrices needed for skinning)

## Config settings

```ini
r.ShaderDevelopmentMode=1
; Uncomment to dump shaders in the Saved folder
; Warning: leaving this on for a while will fill your hard drive with many small files and folders
r.DumpShaderDebugInfo=1
r.CompileShadersForDevelopment=1
```

VertexFactory:

- Creates/Sets shader bindings through ConstructShaderParameters & FVertexFactoryShaderParameters

- Sets the Vertex Declaration Format (FVertexDeclarationElementList) through FVertexFactory::DataType which contains FVertexStreamComponent structs that define the stride, offset, size of each vertex element

- FVertexStreamComponent is intiialized with macros such as STRUCTMEMBER_VERTEXSTREAMCOMPONENT

- FLocalVertexFactory::InitRHI is where all the magic happens. It actually sets everything

1. Set the uniform buffers

1. Modify localvertexfactory.usf

1. Checkout PreRenderView to update constantbuffers

   A. PreRenderView is deprecated

* * *

1. Add ResourceRelease for all the uniformbuffers/vertexfactories

Interesting code to look at to directly render stuff, create uniform constant buffers, and create a custom vertex declaration:

UnrealEngine\\Engine\\Source\\Runtime\\Engine\\Private\\Particles\\ParticleBeamTrailVertexFactory.cpp

UnrealEngine\\Engine\\Source\\Runtime\\Eengine\\Private\\Particles\\ParticleVertexFactory.cpp

To bind LocalVertexFactory with a shader you have to use:

```cpp
DECLARE_VERTEX_FACTORY_TYPE( FFluidSurfaceVertexFactory );

IMPLEMENT_VERTEX_FACTORY_TYPE( FFluidSurfaceVertexFactory, "FluidSurfaceVertexFactory", true, true, true, true, false );
```

VertexFactory::InitRHI() is where the vertex declaration is created

```cpp
void FLocalVertexFactory::InitRHI()

BEGIN_UNIFORM_BUFFER_STRUCT( FParticleSpriteUniformParameters, )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, AxisLockRight, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, AxisLockUp, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, TangentSelector, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, NormalsSphereCenter, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, NormalsCylinderUnitDirection, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector4, SubImageSize, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER( FVector4, MacroUVParameters )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( float, RotationScale, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( float, RotationBias, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( float, NormalsType, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( float, InvDeltaSeconds, EShaderPrecisionModifier::Half )
        DECLARE_UNIFORM_BUFFER_STRUCT_MEMBER_EX( FVector2D, PivotOffset, EShaderPrecisionModifier::Half )
END_UNIFORM_BUFFER_STRUCT( FParticleSpriteUniformParameters )
typedef TUniformBufferRef&lt;FParticleSpriteUniformParameters> FParticleSpriteUniformBufferRef;

FParticleVertexFactoryBase

FParticleSpriteVertexFactory

void FParticleSpriteVertexFactory::InitRHI()
{
        InitStreams();
        SetDeclaration(GetParticleSpriteVertexDeclaration(GetFeatureLevel()).VertexDeclarationRHI);
}

virtual void InitDynamicRHI()
        {
                FVertexDeclarationElementList Elements;
                int32        Offset = 0;

FillDeclElements(Elements, Offset);

// Create the vertex declaration for rendering the factory normally.
                // This is done in InitDynamicRHI instead of InitRHI to allow FParticleSpriteVertexFactory::InitRHI
                // to rely on it being initialized, since InitDynamicRHI is called before InitRHI.
                VertexDeclarationRHI = RHICreateVertexDeclaration(Elements);
        }
```

1. Need to run with -d3ddebug in order to set debug flag to device. Now I have informative errors descriptions.

1. float3 to float4 conversion is automatic for position elements, so thats why its defined as a float3 in code and float4 in the shader, And of course it's legal to use VET_Float4 for initialization.

1. this Data.PositionComponent = FVertexStreamComponent actually says which field in vertex structure points to which field in the stream. The actual binding of \*.usf and code fields are done, for example, in FLocalVertexFactory::InitRHI - attribute index is plays main role.

1. Similar way other attributes initialized in appropriate classes. In FInstancedStaticMeshVertexFactory::InitRHI, for example.

*Reference From <https://forums.unrealengine.com/showthread.php?15761-How-does-FVertexFactoryInput-works>*

FSkeletalMeshObject:Update -> Calculates new bones

- Calls on RenderThread UpdateDynamicData_RenderThread

  - UpdateBoneData() -> RHICreateUniformBuffer and stores locally to Uniform buffer

UpdateData_RenderThread calls CreateRenderThreadResources which calls UpdateRenderThraedResourcesEmitter

- FDynamicMeshEmitter::UpdateRenderThreadResourcesEmitter -> CreateUniformBufferImmediate and stores it in the class instance

During FParticleSystemSceneProxy::GetDynamicMeshElements

- GetDynamicMeshElementsEmitter-> Allocates Per Frame structure and sets a reference to the FDynamicMeshEmitter::UniformBuffer

HLSL

- Row-major addressing

- In shader code, always row-major

- When passing data to uniform buffers, you can specify packing order (default is column major)

How To Debug Shaders:

- Modify shader compiler compilation flags

```cpp
void FKAbcRigidVertexFactory::ModifyCompilationEnvironment(EShaderPlatform Platform, const FMaterial* Material, FShaderCompilerEnvironment& OutEnvironment) {

FVertexFactory::ModifyCompilationEnvironment(Platform, Material, OutEnvironment);

OutEnvironment.CompilerFlags.Remove(CFLAG_StandardOptimization);

OutEnvironment.CompilerFlags.Add(CFLAG_Debug);

OutEnvironment.CompilerFlags.Add(CFLAG_PreferFlowControl);

}
```

- Remove the call to D3DStripShader in D3D11ShaderCompiler.cpp. You have to recompile ShaderCompileWorker Win64 Development to propagate the change. And then add a space or something to common.usf to force shaders to recompile (if you are working on a global shader just edit it a bit).

- In UE4 we compile the shaders in a different app (ShaderCompileWorker) which allows making use of all your cores. However tools like NSight don't know about this other app and they only hook the compile calls in the main executable. If you open BaseEngine.ini and set bAllowCompilingThroughWorkers=False, any future shaders will be compiled from the main executable. Of course, this will make compiling super slow.

*Reference From <https://forums.unrealengine.com/showthread.php?6719-Debugging-USF-(Unreal-Shader-Files)>*
