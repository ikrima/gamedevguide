---
sortIndex: 1
sidebar: ue4guide
---

Command params are parsed in:

protected virtual void ConfigureProjectFileGeneration( String\[] Arguments, ref bool IncludeAllPlatforms )

abstract class ProjectFileGenerator

```cpp
{

 /// Global static that enables generation of project files. Doesn't actually compile anything.

 /// This is enabled only via UnrealBuildTool command-line.

 public static bool bGenerateProjectFiles = false;

 /// True if we're generating lightweight project files for a single game only, excluding most engine code, documentation, etc.

 public bool bGeneratingGameProjectFiles = false;

 /// Optional list of platforms to generate projects for

 readonly List&lt;UnrealTargetPlatform&gt; ProjectPlatforms = new List&lt;UnrealTargetPlatform&gt;();

 /// When bGeneratingGameProjectFiles=true, this is the game name we're generating projects for

 protected string GameProjectName = null;

 /// Global static that only adds platforms that are supported when generating a given target.

 /// This was the old behavior, and it resulted in scenarios where having an unsupported platform selected

 /// in the platform drop-down would silently 'switch' to building Win32.

 /// The new behavior is to add all platforms when generating a target, and then check if it is supported

 /// at build time. If it is not, then a BuildException is thrown informing the user of an unsupported platform.

 /// NOTE: This only matters when using "-AllProjects". It can increase the project file load times though, because of all

 /// of the extra project configuration combinations we need to store

 public static bool bCreateDummyConfigsForUnsupportedPlatforms = true;

 /// Whether we should include configurations for "Test" and "Shipping" in generated projects (pass "-NoShippingConfigs" to disable this)

 public static bool bIncludeTestAndShippingConfigs = true;

 /// True if intellisense data should be generated (takes a while longer)

 bool bGenerateIntelliSenseData = true;

 /// True if we should include documentation in the generated projects

 \[XmlConfigFile\]

 protected bool bIncludeDocumentation = false;

 /// True if all documentation languages should be included in generated projects, otherwise only "INT" will be included

 bool bAllDocumentationLanguages = false;

 /// True if build targets should pass the -useprecompiled argument

 public static bool bUsePrecompiled = false;

 /// True if we should include engine source in the generated solution

 protected bool bIncludeEngineSource = true;

 /// True if shader source files should be included in the generated projects

 protected bool bIncludeShaderSource = true;

 /// True if build system files should be included

 bool bIncludeBuildSystemFiles = true;

 /// True if we should include config files (.ini files) in the generated project

 protected bool bIncludeConfigFiles = true;

 /// True if we should include localization files (.int/.kor/etc files) in the generated project

 bool bIncludeLocalizationFiles = false;

 /// True if we should include template files (.template files) in the generated project

 protected bool bIncludeTemplateFiles = true;

 /// True if we should include program projects in the generated solution

 protected bool IncludeEnginePrograms = true;

 /// True if we should include .NET Core projects in the generated solution

 bool bIncludeDotNETCoreProjects = false;

 /// True if we should reflect "Source" sub-directories on disk in the master project as master project directories.

 /// This arguably adds some visual clutter to the master project, but is truer to the on-disk file organization.

 bool bKeepSourceSubDirectories = true;

 /// Relative path to the directory where the master project file will be saved to

 public static DirectoryReference MasterProjectPath = UnrealBuildTool.RootDirectory; // We'll save the master project to our "root" folder

 /// Name of the UE4 engine project that contains all of the engine code, config files and other files

 public static readonly string EngineProjectFileNameBase = "UE4";

 /// Name of the UE4 enterprise project that contains all of the enterprise code, config files and other files

 public static readonly string EnterpriseProjectFileNameBase = "Studio";

 /// When ProjectsAreIntermediate is true, this is the directory to store generated project files

 // @todo projectfiles: Ideally, projects for game modules/targets would be created in the game's Intermediate folder!

 public static DirectoryReference IntermediateProjectFilesPath = DirectoryReference.Combine( UnrealBuildTool.EngineDirectory, "Intermediate", "ProjectFiles" );

 /// Path to timestamp file, recording when was the last time projects were created.

 public static string ProjectTimestampFile = Path.Combine(IntermediateProjectFilesPath.FullName, "Timestamp");

 /// Global static new line string used by ProjectFileGenerator to generate project files.

 public static readonly string NewLine = Environment.NewLine;

 /// If true, we'll parse subdirectories of third-party projects to locate source and header files to include in the

 /// generated projects. This can make the generated projects quite a bit bigger, but makes it easier to open files

 /// directly from the IDE.

 bool bGatherThirdPartySource = false;

 /// Indicates whether we should process dot net core based C\# projects

 bool AllowDotNetCoreProjects = false;

 /// Name of the master project file (e.g. base file name for the solution file for Visual Studio, or the Xcode project file on Mac)

 protected string MasterProjectName = "UE4";

}
```
