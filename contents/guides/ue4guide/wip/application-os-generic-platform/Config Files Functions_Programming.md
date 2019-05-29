---
sortIndex: 11
---

**Wait on this delegate for using Config:**

GConfig->bIsReadyForUse = true;

FCoreDelegates::ConfigReadyForUse.Broadcast();

**Custom config file name for a class:**

- Specify by this:

  `UCLASS(config=GameplayTags, defaultconfig, notplaceable)`

- Get the name by this:

  `GetClass()->GetDefaultConfigFilename()`

   **or**

   `ConfigFileName = uobj->GetDefaultConfigFilename();`

- Custom config follows same hierarchy (BaseGameplayTags.ini, DefaultGameTags.ini, Windows\\WindowsGameplayTags.ini)

**Config file delegates:**

static FCountPreLoadConfigFileRespondersDelegate CountPreLoadConfigFileRespondersDelegate;

 static FPreLoadConfigFileDelegate PreLoadConfigFileDelegate;

 static FPreSaveConfigFileDelegate PreSaveConfigFileDelegate;

static FOnFConfigFileCreated OnFConfigCreated;

 static FOnFConfigFileDeleted OnFConfigDeleted;

static FOnApplyCVarFromIni OnApplyCVarFromIni;

**Manual save config example:**

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

Sec->Add(NAME_ConfigRecentsFilesyKey, *RecentsFiles\[Index]);

}

}

GConfig->EmptySection(TEXT("Internationalization.AssetGroupCultures"), GGameUserSettingsIni);

GConfig->Flush(false, GGameUserSettingsIni);

GConfig->Flush(false);

}
```

**Get value from Config:**

GConfig->GetBool(TEXT("/Script/UnrealEd.EditorLoadingSavingSettings"), TEXT("bForceCompilationAtStartup"), bNeedCompile, GEditorPerProjectIni)

static const FBoolConfigValueHelper DisplayPrintStringSource(TEXT("Kismet"), TEXT("bLogPrintStringSource"), GEngineIni);

GConfig->GetString(\*IniSection, \*(InConfigKey + TEXT(".EditorShowFlags")), ViewportInstanceSettings.EditorShowFlagsString, GEditorPerProjectIni);

**Save UProperties manually to config:**

```cpp
{

int32 PortFlags = 0;

for (UProperty* Property = GetClass()->PropertyLink; Property; Property = Property->PropertyLinkNext)

{

if (!Property->HasAnyPropertyFlags(CPF_Config))

{

continue;

}

FString Section = TEXT("FBX*Import_UI_Option*") + GetClass()->GetName();

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

**Inject our key bind into the debug execs**

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

 FConfigSection\* Section = ConfigFile->Find(TEXT("/Script/Engine.PlayerInput"));

 if (Section != nullptr)

 {

 Section->HandleAddCommand(TEXT("DebugExecBindings"), TEXT(" (Key=F12,Command=\\"RenderDoc.CaptureFrame\\", Alt=true)"), true);

 }
```

**Loading Properties manually from config:**

```cpp
void UFbxAssetImportData::LoadOptions() {}
```

**Main Structs:**

```cpp
class FConfigFile : public TMap<FString,FConfigSection>

FConfigFile PlatformIniFile;

 LocalConfigCache->LoadLocalIniFile(PlatformIniFile, *ClassConfigName, true, *SelectedTargetPlatform);

/**

* Loads and generates a destination ini file and adds it to GConfig:

* - Looking on commandline for override source/dest .ini filenames

* - Generating the name for the engine to refer to the ini

* - Loading a source .ini file hierarchy

* - Filling out an FConfigFile

* - Save the generated ini

* - Adds the FConfigFile to GConfig

*

* @param FinalIniFilename The output name of the generated .ini file (in Game\\Saved\\Config)

* @param BaseIniName The "base" ini name, with no extension (ie, Engine, Game, etc)

* @param Platform The platform to load the .ini for (if NULL, uses current)

* @param bForceReload If true, the destination .in will be regenerated from the source, otherwise this will only process if the dest isn't in GConfig

* @param bRequireDefaultIni If true, the Default\*.ini file is required to exist when generating the final ini file.

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
