---
sortIndex: 4
sidebar: ue4guide
---

# Adding Blueprint Static Analysis Tool

The easiest way to augment the compiler would be to write a `UBlueprintCompilerExtension`, just derive from that type and when you want to enable your extension (e.g. only when a commandlet is running, ini setting is set, or unconditionally at CDO creation time) just call FBlueprintCompilationManager::RegisterCompilerExtension. The first parameter is the type of blueprints you're interested in - e.g. UBlueprint::StaticClass() if you want to instrument all blueprint compilation.

Reference <https://udn.unrealengine.com/questions/513017/blueprint-static-analysis.html>
