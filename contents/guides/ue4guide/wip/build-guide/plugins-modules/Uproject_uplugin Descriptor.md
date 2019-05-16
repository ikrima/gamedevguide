```js
sortIndex: 3;
```

UEBuildTarget.cs

    /// The name of the application the target is part of. For targets with bUseSharedBuildEnvironment = true, this is typically the name of the base application, eg. UE4Editor for any game editor.

    AppName

    TargetName

    //Root directory for the active project. Typically contains the .uproject file, or the engine root.

    ProjectDirectory

    TargetRules.cs

    LaunchModuleName

    SolutionDirectory

    OutputPaths

    .ueprojectdirs

    SharedBuildIdFile

    PreBuildStepScripts

    PostBuildStepScripts

    .uproject (C# is ProjectDescriptor.cs)

     PreBuildSteps

     PostBuildSteps

     AdditionalPluginDirectories

     PreBuildSteps

     PostBuildSteps

     Modules (C# is ModuleDescriptor.cs)

     Type = { Default, Runtime, RuntimeNoCommandlet, RuntimeAndProgram, CookedOnly, Developer, Editor, EditorNoCommandlet, Program, ServerOnly, ClientOnly }

     WhitelistPlatforms/BlacklistPlatforms = { Win32, Win64, Mac, etc }

     WhitelistTargets/BlacklistTargets = { Game, Editor, Client, Server, Program }

     LoadingPhase

     Plugins (C# is PluginReferenceDescriptor)

     Name

     Enabled

     Optional

     WhitelistPlatforms/BlacklistPlatforms = { Win32, Win64, Mac, etc }

     WhitelistTargets/BlacklistTargets = { Game, Editor, Client, Server, Program }

    .uplugin

    "CanBeUsedWithUnrealHeaderTool" : true,

    -basedir=

    "-BaseFromWorkingDir")))
