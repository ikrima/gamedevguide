```
sortIndex: 2
```

http://dmitry-yanovsky.com/2015/08/unreal-engine-4-build-file-demystified/

https://www.slideshare.net/GerkeMaxPreussner/plugins-thirdparty-sdks-in-ue4

## Project Generation

•UBT searches entire solution for \*.Build.cs files

•GenerateProjectFiles.bat invokes UBT to generate

Visual Studio solution files containing all modules

## Project Compilation

•Visual Studio invokes UBT to...

- find all \*.Build.cs files
- compile and instantiate them
- create a module dependency graph
- generate compiler and linker settings
- compile all C++ modules

• A module is compiled if it is...

- a dependency of another module
- required by an enabled plug-in, or the project itself

## PublicDependencyModuleNames vs PrivateDependencyModuleNames:

- Asked around, got some clarification. At the end of the day, yes both private and public stuff all gets linked when you include a given module. However, it controls include paths and defines available to a module
- So if \`A\` publicly requires \`B\` but privately requires \`C\`, the Include paths and defines specified by \`C\` don't get added to your module when you include \`A\`
- So if you had a plugin that privately included an SDK's include paths/etc., then including that plugin wouldn't make the SDKs include paths as part of your include paths.
- DynamicallyLoadedModuleNames are dynamically linked whereas others are statically/implicitly linked

## DynamicallyLoadedModuleNames:

- Public and Private dependencies are staticly linked into your project and visible to public and or private code, respectively.

- Public implies that you may also expose such functionality to whatever tools, editors or plugins are dependent on your game/module. It is also important to keep in mind that with the static linking, the header files are included.

- Dynamically loaded modules do not include the header files at link time, and instead should be treated as an external dll, loaded when needed. The key difference is that because of the static linking, if the module is missing your code will fail out.

_Reference From https://wiki.unrealengine.com/An_Introduction_to_UE4_Plugins_
