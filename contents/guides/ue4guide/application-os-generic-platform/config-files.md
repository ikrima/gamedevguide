---
sortIndex: 10
---

# Overview

- Config files are key-value pairs
- Config sections are stored as [(package).(modulename).(classname)] . Ex: [/Script/ModuleName.ExampleClass]
- Classes can be decorated with UCLASS(Config=Game) to specify their variables can be read from config
- Calling SaveConfig() on a class will write all property values to the corresponding config file
- Demarcate config properties with UPROPERTY(Config)
- Derived classes can write/read config properties from parent
- Per class instance config can also be saved with the UCLASS(PerObjectConfig) stored in config as \[ObjectName ClassName]

## Configuration Ini Names

### Metadata

**UCLASS:**
config=… => Ini to use
defaultconfig => store in default/base ini
globaluserconfig => Save object config only to global user overrides, never to local INIs (aka Unreal Engine/Engine/Config/User*.ini)
perObjectConfig => Handle object configuration on a per-object basis, rather than per-class.
Configdonotcheckdefaults => Determine whether on serialize to configs a check should be done on the base/defaults ini's

**UPROP:**
config => serialize property to config
gobalconfig => load ini from baseclass only
ConfigHierarchyEditable => Edit the values for the config hierarchy

### **Configuration Categories**

Each config category has its own file hierarchy that specifies engine-specific/project-specific/platform-specific configurations
- Compat
- DeviceProfiles
- Editor
- EditorGameAgnostic
- EditorKeyBindings
- EditorUserSettings
- Engine
- Game
- Input
- Lightmass
- Scalability

Config Category code name | metadata name (aka config=Game)

GEngineIni            | Engine            /* Engine ini filename */

/** Editor ini file locations - stored per engine version (shared across all projects). Migrated between versions on first run. */
GEditorIni            | Editor            /* Editor ini filename */
GEditorKeyBindingsIni | EditorKeyBindings /* Editor Key Bindings ini file */
GEditorLayoutIni      | EditorLayout      /* Editor UI Layout ini filename */
GEditorSettingsIni    | EditorSettings    /* Editor Settings ini filename */

/** Editor per-project ini files - stored per project. */
GEditorPerProjectIni | EditorPerProjectUserSettings   /* Editor User Settings ini filename */

GCompatIni           | Compat
GLightmassIni        | Lightmass         /* Lightmass settings ini filename */
GScalabilityIni      | Scalability       /* Scalability settings ini filename */
GHardwareIni         | Hardware          /* Hardware ini filename */
GInputIni            | Input             /* Input ini filename */
GGameIni             | Game              /* Game ini filename */
GGameUserSettingsIni | GameUserSettings  /* User Game Settings ini filename */

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*

## File Hierarchy

The configuration file hierarchy is read in starting with Base.ini, with values in later files in the hierarchy overriding earlier values. All files in the Engine folder will be applied to all projects, while project-specific settings should be in files in the project directory. Finally, all project-specific and platform-specific differences are saved out to \[ProjectDirectory]/Saved/Config/\[Platform]/\[Category].ini

The below file hierarchy example is for the Engine category of configuration files.

1. `ini>Engine/Config/Base.ini`
   Base.ini is usually empty.
1. `ini>Engine/Config/BaseEngine.ini`
1. `ini>Engine/Config/[Platform]/[Platform]Engine.ini`
1. `ini>[ProjectDirectory]/Config/DefaultEngine.ini`
1. `ini>[ProjectDirectory]/Config/[Platform]/[Platform]Engine.ini`
1. `ini>[ProjectDirectory]/Saved/Config/[Platform]/Engine.ini`
   The configuration file in the Saved directory only stores the project-specific and platform-specific differences in the stack of configuration files.

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*

## Syntax

### Sections and Key-Value Pairs

Typical configuration files consist of sections of key-value pairs, arranged as follows:

```ini
[Section]
Key=Value
```

### Special Characters

- *+* - Adds a line if that property doesn't exist yet (from a previous configuration file or earlier in the same configuration file).

- *-* - Removes a line (but it has to be an exact match).

- *.* - Adds a new property.

  - **Note**: _**. is like +**_ except it will potentially add a duplicate line. This is useful for the bindings (as seen in DefaultInput.ini), for instance, where the bottom-most binding takes effect, so if you add something like:

    ```ini
    [/Script/Engine.PlayerInput]
    Bindings=(Name="Q",Command="Foo")
    .Bindings=(Name="Q",Command="Bar")
    .Bindings=(Name="Q",Command="Foo")
    ```

    It will work appropriately. Using a *+* there would fail to add the last line, and your bindings would be incorrect. Due to configuration file combining, the above usage pattern can happen.

- *!* - Removes a property; but you don't have to have an exact match, just the name of the property.
  - To clear an array, use ClearArray:

    ```ini
    !PrimaryAssetTypesToScan=ClearArray
    ```

- Escape a quote character: \~Quote\~, \~OpenBracket\~. Ex:

  ```ini
  UserDefinedChords=~OpenBracket~~Quote~BindingContext~Quote~:~Quote~PlayWorld~Quote~,~Quote~CommandName~Quote~:~Quote~PausePlaySession~Quote~,~Quote~ChordIndex~Quote~:1,~Quote~Control~Quote~:false,~Quote~Alt~Quote~:false,~Quote~Shift~Quote~:false,~Quote~Command~Quote~:false,~Quote~Key~Quote~:~Quote~None~Quote~~CloseBracket~
  ```

### Special Variables/Tokens

You can use these config vars in your ini's that UE4 will replace accordingly with expanded out string

- `ini>%GAME%`: Game Name
- `ini>%GAMEDIR%`: Game Directory
- `ini>%ENGINEDIR%`: Engine Directory
- `ini>%ENGINEUSERDIR%`: User's Engine Directory
- `ini>%ENGINEVERSIONAGNOSTICUSERDIR%`: User Engine Agnostic directory
- `ini>%APPSETTINGSDIR%`: Application Settings Directory

### Comments

Most people seem to be under the impression that the semicolon denotes comments in configuration files, but they aren't (FConfigFile::ProcessInputFileContents doesn't actually treat them, or any other string, as a comment delimiter). This behavior is intentional. Technically any character can represent a different key-value pair. Typically, a semicolon is placed at the beginning of a new line. It works like a comment, but it's not actually.

```ini
; This is a Comment
; So is this!
```

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*

# Command Line Switches

## Override Default Behavior

- `-ENGLISHCOALESCED`: Revert to the default (English) coalesced .ini if the language-localized version cannot be found.
- `-NOAUTOINIUPDATE`: Suppress prompts to update .ini files.
- `-NOINI`: Do not update the .ini files.
- `-REGENERATEINIS`: Forces .ini files to be regenerated

## Override Default INI

Use another command-line argument to temporarily override which INIs are loaded by the game or editor. For example, if a custom `MyGame.ini` is to be used instead of `MyOldGame.ini`, the argument would be `-GAMEINI=MyGame.ini`. This table lists the arguments used to override the different INI files used in UE4:

| Command-Line Argument | INI Override |
|---|---|
| DEFEDITORINI= | Default Editor |
| EDITORINI= | Editor |
| DEFEDITORUSERSETTINGSINI= | Default EditorUserSettings |
| EDITORUSERSETTINGSINI= | EditorUserSettings |
| DEFCOMPATINI= | Default Compat |
| COMPATINI= | Compat |
| DEFLIGHTMASSINI= | Default Lightmass |
| LIGHTMASSINI= | Lightmass |
| DEFENGINEINI= | Default Engine |
| ENGINEINI= | Engine |
| DEFGAMEINI= | Default Game |
| GAMEINI= | Game |
| DEFINPUTINI= | Default Input |
| INPUTINI= | Input |
| DEFUIINI= | Default UI |
| UIINI= | UI |

*Reference From: <https://docs.unrealengine.com/en-US/Programming/Basics/CommandLineArguments/index.html>*

# Programming

## Wait on this delegate for using Config

GConfig->bIsReadyForUse = true;

FCoreDelegates::ConfigReadyForUse.Broadcast();

## Custom config file name for a class

- Specify by this:

  `cpp>UCLASS(config=GameplayTags, defaultconfig, notplaceable)`

- Full example getting the proper full config file path name:

  ```cpp
  FString RelativePath;
  if (UsesPerObjectConfig(this))
  {
      RelativePath = GetConfigFilename(this);
  }
  else if (this->GetClass()->HasAnyClassFlags(CLASS_DefaultConfig))
  {
      RelativePath = this->GetClass()->GetDefaultConfigFilename();
  }
  else if (this->GetClass()->HasAnyClassFlags(CLASS_Config))
  {
      RelativePath = this->GetClass()->GetConfigName();
  }

  FString FullPath = FPaths::ConvertRelativePathToFull(RelativePath);
  ```

- Get custom config file name & load it

  ```cpp
  FString BebylonEngineIni;
  FConfigCacheIni::LoadGlobalIniFile(BebylonEngineIni, TEXT("BebylonEngine"));
  ```

- Get the final config file name (aka coalesced between Base*.ini, Default*.ini, User*.ini, etc) by this: _*IMPORTANT!! This does not take into account perObjectConfig*_

  ```cpp
  GetClass()->GetConfigName();
  uobj->GetConfigName();
  ```

- `cpp>GetConfigFilename()`: _*!!IMPORTANT!! DO NOT USE*_ It's supposed to take into account perObjectConfig but does not actually work. The code is ifdef'ed out and reverts to calling `GetConfigName()`

- Get the Default*.ini config file name

  ```cpp
  GetClass()->GetDefaultConfigFilename();
  uobj->GetDefaultConfigFilename();
  ```

- Custom config follows same hierarchy (BaseGameplayTags.ini, DefaultGameTags.ini, Windows\\WindowsGameplayTags.ini)

## Config file delegates

```cpp
static FCountPreLoadConfigFileRespondersDelegate CountPreLoadConfigFileRespondersDelegate;
static FPreLoadConfigFileDelegate PreLoadConfigFileDelegate;
static FPreSaveConfigFileDelegate PreSaveConfigFileDelegate;
static FOnFConfigFileCreated OnFConfigCreated;
static FOnFConfigFileDeleted OnFConfigDeleted;
static FOnApplyCVarFromIni OnApplyCVarFromIni;
```

## Saving To Custom Config File

### Manually Saving

```cpp
void SaveConfig() const
{
  GConfig->SetString(STR_ConfigSection, STR_ConfigDirectoryKey, *LastDirectory, ConfigFilename);

  FConfigSection* Sec = GConfig->GetSectionPrivate(STR_ConfigSection, true, false, ConfigFilename);
  if (Sec)
  {
      Sec->Remove(NAME_ConfigRecentsFilesyKey);
      for (int32 Index = RecentsFiles.Num() - 1; Index >= 0; --Index)
      {
          Sec->Add(NAME_ConfigRecentsFilesyKey, *RecentsFiles[Index]);
      }
  }

  GConfig->EmptySection(TEXT("Internationalization.AssetGroupCultures"), GGameUserSettingsIni);
  GConfig->Flush(false, GGameUserSettingsIni);

  GConfig->Flush(false);
}
```

### Using KeyValueStore

The engine provides this functionality through `cpp>FGenericPlatformMisc::SetStoredValue/GetStoredValue`. Note: For Windows/iOS, this writes it out to the Registry/pList file

```cpp
bool FGenericPlatformMisc::SetStoredValue(const FString& InStoreId, const FString& InSectionName, const FString& InKeyName, const FString& InValue)
{
  check(!InStoreId.IsEmpty());
  check(!InSectionName.IsEmpty());
  check(!InKeyName.IsEmpty());

  // This assumes that FPlatformProcess::ApplicationSettingsDir() returns a user-specific directory; it doesn't on Windows, but Windows overrides this behavior to use the registry
  const FString ConfigPath = FString(FPlatformProcess::ApplicationSettingsDir()) / InStoreId / FString(TEXT("KeyValueStore.ini"));

  FConfigFile ConfigFile;
  ConfigFile.Read(ConfigPath);

  FConfigSection& Section = ConfigFile.FindOrAdd(InSectionName);

  FConfigValue& KeyValue = Section.FindOrAdd(*InKeyName);
  KeyValue = FConfigValue(InValue);

  ConfigFile.Dirty = true;
  return ConfigFile.Write(ConfigPath);
}
```

## Get value from Config

```cpp
GConfig->GetBool(TEXT("/Script/UnrealEd.EditorLoadingSavingSettings"), TEXT("bForceCompilationAtStartup"), bNeedCompile, GEditorPerProjectIni)
static const FBoolConfigValueHelper DisplayPrintStringSource(TEXT("Kismet"), TEXT("bLogPrintStringSource"), GEngineIni);
GConfig->GetString(*IniSection, *(InConfigKey + TEXT(".EditorShowFlags")), ViewportInstanceSettings.EditorShowFlagsString, GEditorPerProjectIni);
```

## Editor Helper Functions

```cpp
/**
 * Save configuration out to ini files
 * @warning Must be safe to call on class-default object
 */
void SaveConfig( uint64 Flags=CPF_Config, const TCHAR* Filename=NULL, FConfigCacheIni* Config=GConfig );

/**
 * Saves just the section(s) for this class into the default ini file for the class (with just the changes from base)
 */
void UpdateDefaultConfigFile(const FString& SpecificFileLocation = "");

/**
 * Saves just the section(s) for this class into the global user ini file for the class (with just the changes from base)
 */
void UpdateGlobalUserConfigFile();

/**
 * Saves just the property into the global user ini file for the class (with just the changes from base)
 */
void UpdateSinglePropertyInConfigFile(const UProperty* InProperty, const FString& InConfigIniName);

/**
 * Get the default config filename for the specified UObject
 */
FString GetDefaultConfigFilename() const;

/**
 * Get the global user override config filename for the specified UObject
 */
FString GetGlobalUserConfigFilename() const;

/**
 * Imports property values from an .ini file.
 *
 * @param Class    the class to use for determining which section of the ini to retrieve text values from
 * @param Filename   indicates the filename to load values from; if not specified, uses ConfigClass's ClassConfigName
 * @param PropagationFlags indicates how this call to LoadConfig should be propagated; expects a bitmask of UE4::ELoadConfigPropagationFlags values.
 * @param PropertyToLoad  if specified, only the ini value for the specified property will be imported.
 */
void LoadConfig( UClass* ConfigClass=NULL, const TCHAR* Filename=NULL, uint32 PropagationFlags=UE4::LCPF_None, class UProperty* PropertyToLoad=NULL );

/**
 * Wrapper method for LoadConfig that is used when reloading the config data for objects at runtime which have already loaded their config data at least once.
 * Allows the objects the receive a callback that its configuration data has been reloaded.
 *
 * @param Class    the class to use for determining which section of the ini to retrieve text values from
 * @param Filename   indicates the filename to load values from; if not specified, uses ConfigClass's ClassConfigName
 * @param PropagationFlags indicates how this call to LoadConfig should be propagated; expects a bitmask of UE4::ELoadConfigPropagationFlags values.
 * @param PropertyToLoad  if specified, only the ini value for the specified property will be imported
 */
void ReloadConfig( UClass* ConfigClass=NULL, const TCHAR* Filename=NULL, uint32 PropagationFlags=UE4::LCPF_None, class UProperty* PropertyToLoad=NULL );
```

## Save UProperties manually to config

```cpp
void UFbxAssetImportData::SaveOptions()
{
  int32 PortFlags = 0;

  for (UProperty* Property = GetClass()->PropertyLink; Property; Property = Property->PropertyLinkNext)
  {
    if (!Property->HasAnyPropertyFlags(CPF_Config))
    {
      continue;
    }
    FString Section = TEXT("FBX_Import_UI_Option_") + GetClass()->GetName();
    FString Key = Property->GetName();

    const bool bIsPropertyInherited = Property->GetOwnerClass() != GetClass();
    UObject* SuperClassDefaultObject = GetClass()->GetSuperClass()->GetDefaultObject();

    UArrayProperty* Array = dynamic_cast<UArrayProperty*>(Property);
    if (Array)
    {
      FConfigSection* Sec = GConfig->GetSectionPrivate(*Section, 1, 0, *GEditorPerProjectIni);
      check(Sec);
      Sec->Remove(*Key);

      FScriptArrayHelper_InContainer ArrayHelper(Array, this);
      for (int32 i = 0; i < ArrayHelper.Num(); i++)
      {
        FString Buffer;
        Array->Inner->ExportTextItem(Buffer, ArrayHelper.GetRawPtr(i), ArrayHelper.GetRawPtr(i), this, PortFlags);
        Sec->Add(*Key, *Buffer);
      }
    }
    else
    {
      TCHAR TempKey[MAX_SPRINTF] = TEXT("");
      for (int32 Index = 0; Index < Property->ArrayDim; Index++)
      {
        if (Property->ArrayDim != 1)
        {
          FCString::Sprintf(TempKey, TEXT("%s[%i]"), *Property->GetName(), Index);
          Key = TempKey;
        }

        FString Value;
        Property->ExportText_InContainer(Index, Value, this, this, this, PortFlags);
        GConfig->SetString(*Section, *Key, *Value, *GEditorPerProjectIni);
      }
    }
  }
  GConfig->Flush(0);
}
```

## Inject our key bind into the debug exec

```cpp
FConfigFile* ConfigFile = nullptr;
// Look for the first matching INI file entry
for (TMap<FString, FConfigFile>::TIterator It(*GConfig); It; ++It)
{
  if (It.Key().EndsWith(TEXT("Input.ini")))
  {
    ConfigFile = &It.Value();
    break;
  }
}
check(ConfigFile != nullptr);
FConfigSection* Section = ConfigFile->Find(TEXT("/Script/Engine.PlayerInput"));
if (Section != nullptr)
{
  Section->HandleAddCommand(TEXT("DebugExecBindings"), TEXT("(Key=F12,Command=\"RenderDoc.CaptureFrame\", Alt=true)"), true);
}
```

## Loading Properties manually from config

```cpp
void UFbxAssetImportData::LoadOptions() {}
```

## Main Structs

```cpp
class FConfigFile : public TMap<FString,FConfigSection>
FConfigFile PlatformIniFile;
LocalConfigCache->LoadLocalIniFile(PlatformIniFile, *ClassConfigName, true, *SelectedTargetPlatform);

/**
  * Loads and generates a destination ini file and adds it to GConfig:
  *   - Looking on commandline for override source/dest .ini filenames
  *   - Generating the name for the engine to refer to the ini
  *   - Loading a source .ini file hierarchy
  *   - Filling out an FConfigFile
  *   - Save the generated ini
  *   - Adds the FConfigFile to GConfig
  *
  * @param FinalIniFilename The output name of the generated .ini file (in Game\Saved\Config)
  * @param BaseIniName The "base" ini name, with no extension (ie, Engine, Game, etc)
  * @param Platform The platform to load the .ini for (if NULL, uses current)
  * @param bForceReload If true, the destination .in will be regenerated from the source, otherwise this will only process if the dest isn't in GConfig
  * @param bRequireDefaultIni If true, the Default*.ini file is required to exist when generating the final ini file.
  * @param bAllowGeneratedIniWhenCooked If true, the engine will attempt to load the generated/user INI file when loading cooked games
  * @param GeneratedConfigDir The location where generated config files are made.
  * @return true if the final ini was created successfully.
  */
static bool LoadGlobalIniFile(FString& FinalIniFilename, const TCHAR* BaseIniName, const TCHAR* Platform=NULL, bool bForceReload=false, bool bRequireDefaultIni=false, bool bAllowGeneratedIniWhenCooked=true, const TCHAR* GeneratedConfigDir = *FPaths::GeneratedConfigDir());

/**
  * Load an ini file directly into an FConfigFile, and nothing is written to GConfig or disk.
  * The passed in .ini name can be a "base" (Engine, Game) which will be modified by platform and/or commandline override,
  * or it can be a full ini filenname (ie WrangleContent) loaded from the Source config directory
  *
  * @param ConfigFile The output object to fill
  * @param IniName Either a Base ini name (Engine) or a full ini name (WrangleContent). NO PATH OR EXTENSION SHOULD BE USED!
  * @param bIsBaseIniName true if IniName is a Base name, which can be overridden on commandline, etc.
  * @param Platform The platform to use for Base ini names, NULL means to use the current platform
  * @param bForceReload force reload the ini file from disk this is required if you make changes to the ini file not using the config system as the hierarchy cache will not be updated in this case
  * @return true if the ini file was loaded successfully
  */
static bool LoadLocalIniFile(FConfigFile& ConfigFile, const TCHAR* IniName, bool bIsBaseIniName, const TCHAR* Platform=NULL, bool bForceReload=false);

/**
  * Load an ini file directly into an FConfigFile from the specified config folders, optionally writing to disk.
  * The passed in .ini name can be a "base" (Engine, Game) which will be modified by platform and/or commandline override,
  * or it can be a full ini filenname (ie WrangleContent) loaded from the Source config directory
  *
  * @param ConfigFile The output object to fill
  * @param IniName Either a Base ini name (Engine) or a full ini name (WrangleContent). NO PATH OR EXTENSION SHOULD BE USED!
  * @param EngineConfigDir Engine config directory.
  * @param SourceConfigDir Game config directory.
  * @param bIsBaseIniName true if IniName is a Base name, which can be overridden on commandline, etc.
  * @param Platform The platform to use for Base ini names
  * @param bForceReload force reload the ini file from disk this is required if you make changes to the ini file not using the config system as the hierarchy cache will not be updated in this case
  * @param bWriteDestIni write out a destination ini file to the Saved folder, only valid if bIsBaseIniName is true
  * @param bAllowGeneratedIniWhenCooked If true, the engine will attempt to load the generated/user INI file when loading cooked games
  * @param GeneratedConfigDir The location where generated config files are made.
  * @return true if the ini file was loaded successfully
  */
static bool LoadExternalIniFile(FConfigFile& ConfigFile, const TCHAR* IniName, const TCHAR* EngineConfigDir, const TCHAR* SourceConfigDir, bool bIsBaseIniName, const TCHAR* Platform=NULL, bool bForceReload=false, bool bWriteDestIni=false, bool bAllowGeneratedIniWhenCooked = true, const TCHAR* GeneratedConfigDir = *FPaths::GeneratedConfigDir());

/**
  * Needs to be called after GConfig is set and LoadCoalescedFile was called.
  * Loads the state of console variables.
  * Works even if the variable is registered after the ini file was loaded.
  */
static void LoadConsoleVariablesFromINI();

```
