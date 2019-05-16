## Enable Visual Studio syntax highlighting in .usf files

<s>Import this registery key:</s>

<s>Windows Registry Editor Version 5.00</s>

<s>\[HKEY_CURRENT_USER\\Software\\Microsoft\\VisualStudio\\14.0_Config\\Languages\\File Extensions\\.usf]</s>

<s>"HLSLFile"=dword:00000001</s>

<s>@="{B2F072B0-ABC1-11D0-9D62-00C04FD9DFD9}"</s>

Add extension support in options directly

![ShaderDev_TipsnTricks](C:\devguide\conversion\FINISHED\assets\ShaderDev_TipsnTricks.jpg)

Not needed anymore

## Visual Studio HLSL with intellisense extension:

<https://marketplace.visualstudio.com/items?itemName=TimGJones.HLSLToolsforVisualStudio>

## Fast Custom Shader Iteration Tips:

### Creating Global Functions

As stated above, the compiler will literally copy-paste the text in a Custom node into a function. So if you have the following:

return 1;

The compiler will paste it into a *CustomExpressionX* function. It doesn’t even indent it!

MaterialFloat3 CustomExpression0(FMaterialPixelParameters Parameters)  
{  
return 1;  
}

Look what happens if you use this code instead:

return 1;  
}

float MyGlobalVariable;

int MyGlobalFunction(int x)  
{  
return x;

The generated HLSL now becomes this:

MaterialFloat3 CustomExpression0(FMaterialPixelParameters Parameters)  
{  
return 1;  
}

float MyGlobalVariable;

int MyGlobalFunction(int x)  
{  
return x;  
}

As you can see, MyGlobalVariable and MyGlobalFunction() are not contained within a function. This makes them global and means you can use them anywhere.

*Note:* Notice that the final brace is missing in the input code. This is important since the compiler inserts a brace at the end. If you leave in the brace, you will end up with two braces and receive an error.

Now let’s use this behavior to create the Gaussian function.

*From &lt;<https://www.raywenderlich.com/190254/unreal-engine-4-custom-shaders-tutorial>>*

### Define Multiple Functions inside UE4's Custom Node:

\#1 - Custom Functions

Modifying the Engine's USF files to define custom functions triggers an overhaul shader recompilation of thousands of materials. This is unusable for creative iteration. Also #include-ing files outsides the Engine's Shaders directory crashes the Editor at startup. CustomExpression nodes wrap your code inside CustomExpression#() functions, and that normally prohibits defining your own functions.

However, there seems to be a barely documented feature in HLSL that allows defining functions (methods) inside struct definitions. struct definitions can be nested inside functions (like the wrapper CustomExpression#).

So in your CustomExpression Code you can do:

*struct Functions  
{*

*float3 OrangeBright(float3 c)  
{  
return c \* float3(1, .7, 0);  
}*

*float3 Out()  
{  
return OrangeBright(InColor);  
}*

*};*

*Functions f;  
return f.Out();*

Create and connect an input pin "InColor" of float3 on the CustomExpression node. Any Node inputs passed into CustomExpression#(), like InColor above is available inside nested function definitions.

The cool part is, this is all happening inside your own effective namespace, not interfering with Unreal's USF files, and the compilation is Fast for iteration. So now, you can start to build a library of custom functions, and more complex shaders. It seems HLSL is prohibiting defining a struct nested inside a struct, so make sure to define your custom structs above and outside struct Functions.

### Include custom hlsl file inside UE4's Custom Node:

\#2 - External Code Editing and #include

Instead of editing intricate code and custom libraries inside the little primitive textbox of CustomExpression, you can edit them in a better external editor with syntax highlighting, code navigation etc, and #include that file. So if you put the above code in a file named Test.hlsl, you can:

*#include "Your Path...\\Test.hlsl"  
return 0;  
// enter spaces here and press enter to retrigger compilation*

The dummy "return 0;" is to tell CustomExpression node that this not a single line expression but a full function body. The spaces will be required to signal the CustomExpression textbox that it changed, and pressing enter will compile your externally changed and saved Test.hlsl. Of course, you can split the external file and the dynamic code portion, if you prefer to make quick changes and compiles inside the textbox.

*From &lt;<https://forums.unrealengine.com/development-discussion/rendering/113855-extending-custom-hlsl-custom-expressions>>*

### General Tips:

- In newer UE4 (I'm using 4.18 but I think it was added in 4.17) you can have per-plugin and per-project directories. For example, in my project I have:

*Code:*

*myprj\\myprj.uproject  
myprj\\Content  
...  
myprj\\Shaders\\myshader.ush*

*and then in my material I have a custom node with this:*

*Code:*

*#include "/Project/myshader.ush"  
return 0;*

If you create the directories while UE4 is running, you need to restart the editor before they get picked up - on editor startup you'll see some log messages about the mapping of virtual shader directories (e.g. from '/Project/' to the full path on disk).

- Editing the shader file outside of UE4 is of course a much better dev experience. Also, if you're just tweaking the shader code iteratively, your cycle can go like this:

  - edit code in external editor and save

  - in the material editor, make a dummy change (such as moving a node's position) and click the Apply button

At this point the changes are in effect - i.e. you can see them in the Level Editor w/o even starting PIE (assuming of course that the camera is looking at an object that uses the material, etc. - the point being that this ends up being a relatively fast way to iterate).

In the event that your edits cause a shader compilation error, you can't get by with a dummy change in the graph but instead you need to add a space at the end of the text in the custom node box as described in Büke's post. Still, that doesn't slow you down too much.

- See the generated code by looking in Window -> HLSL Code in the Material Editor. This is probably obvious to a lot of people, but it was awhile before I ever even saw it, so I figured I'd mention it. It's super helpful in troubleshooting because you can also see all of the auto-generated boilerplate code that gets included in the final shader.


- Even if you are not building from source, you can look at the code for built in shaders (assuming you checked the 'engine source' box in the engine options in the Epic Games Launcher) by going to e.g. c:\\Program Files\\Epic Games\\UE_4.18\\Engine\\Shaders - lots of good stuff in there.


- Some of the boilerplate code (mentioned in #4, above) uses conditional logic to determine what to make available to your Custom shader node. For example, I was working on a postprocessing material and by default I couldn't get access to PostProcessingInput0 in my shader code, so I just added a ShaderTexture:PostProcessInput0 node as an input to my Custom node. Not only did that make that value available to use in the shader (obviously), it triggered the boilerplate code to include some additional helper functions.


- In addition to whatever input parameters you explicitly pass to your Custom node, it will also receive a 'parameters' parameter that often has a lot of the inputs you might need. Look in the generated HLSL code for 'customexpression' to find your custom node and you'll see something like:

*MaterialFloat4 CustomExpression0(FMaterialPixelParameters Parameters,...)  
{  
#include "/Project/myshader.ush"  
return 0;  
}*

And then look in Engine/Source/Shaders/Private/MaterialTemplate.ush to see the definition of the struct (FMaterialPixelParameters in this case) - you may find what you need is already provided there (e.g. Parameters.SvPosition.xy).

*From &lt;<https://forums.unrealengine.com/development-discussion/rendering/1409859-custom-hlsl-tips>>*

## Misc:

Compile out Compute shader instructions with a define. Ex:

float DDY(float Input)  
{  
#if COMPUTESHADER  
        return 0;  
#else  
        return ddy(Input);  
#endif  
}

Useful functions:

UnitVectorToOctahedron()

Spherical Harmonic Functions:

Struct FTwoBandSHVectorRGB

MulSH()

AddSH()

DotSH()

SHBasisFunction3()

CalcDiffuseTransferSH3()
