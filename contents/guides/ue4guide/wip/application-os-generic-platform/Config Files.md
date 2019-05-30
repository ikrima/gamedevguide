---
sortIndex: 10
---

- Config files are key-value pairs

- Config sections are stored as [(package).(modulename).(classname)] . Ex: [/Script/ModuleName.ExampleClass]

- Classes can be decorated with UCLASS(Config=Game) to specify their variables can be read from config

- Calling SaveConfig() on a class will write all property values to the corresponding config file

- Demarcate config properties with UPROPERTY(Config)

- Derived classes can write/read config properties from parent

- Per class instance config can also be saved with the UCLASS(PerObjectConfig) stored in config as \[ObjectName ClassName]

#### Configuration Ini Names

#### Metadata

**UCLASS**:

config=… => Ini to use

defaultconfig => store in default/base ini

perObjectConfig => Handle object configuration on a per-object basis, rather than per-class.

Configdonotcheckdefaults => Determine whether on serialize to configs a check should be done on the base/defaults ini's

**UPROP:**

config => serialize property to config

gobalconfig => load ini from baseclass only

ConfigHierarchyEditable => Edit the values for the config hierarchy

#### **Configuration Categories**

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

GEngineIni | Engine /\* Engine ini filename \*/

/\*\* Editor ini file locations - stored per engine version (shared across all projects). Migrated between versions on first run. \*/

GEditorIni | Editor /\* Editor ini filename \*/

GEditorKeyBindingsIni | EditorKeyBindings /\* Editor Key Bindings ini file \*/

GEditorLayoutIni | EditorLayout /\* Editor UI Layout ini filename \*/

GEditorSettingsIni | EditorSettings /\* Editor Settings ini filename \*/

/\*\* Editor per-project ini files - stored per project. \*/

GEditorPerProjectIni | EditorPerProjectUserSettings /\* Editor User Settings ini filename \*/

GCompatIni | Compat

GLightmassIni | Lightmass /\* Lightmass settings ini filename \*/

GScalabilityIni | Scalability /\* Scalability settings ini filename \*/

GHardwareIni | Hardware /\* Hardware ini filename \*/

GInputIni | Input /\* Input ini filename \*/

GGameIni | Game /\* Game ini filename \*/

GGameUserSettingsIni | GameUserSettings /\* User Game Settings ini filename \*/

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*

**Custom config file name for a class:**

- Specify by this:

  `UCLASS(config=GameplayTags, defaultconfig, notplaceable)`

- Get the name by this:

   `cpp>GetClass()->GetDefaultConfigFilename()`

   **or**

  `cpp>ConfigFileName = uobj->GetDefaultConfigFilename();`

- Custom config follows same hierarchy (BaseGameplayTags.ini, DefaultGameTags.ini, Windows\\WindowsGameplayTags.ini)

**Override Config Ini files with command line argument:**

| **Commandline Argument**  | **INI Override**           |
| ------------------------- | -------------------------- |
| DEFEDITORINI=             | Default Editor             |
| EDITORINI=                | Editor                     |
| DEFEDITORUSERSETTINGSINI= | Default EditorUserSettings |
| EDITORUSERSETTINGSINI=    | EditorUserSettings         |
| DEFCOMPATINI=             | Default Compat             |
| COMPATINI=                | Compat                     |
| DEFLIGHTMASSINI=          | Default Lightmass          |
| LIGHTMASSINI=             | Lightmass                  |
| DEFENGINEINI=             | Default Engine             |
| ENGINEINI=                | Engine                     |
| DEFGAMEINI=               | Default Game               |
| GAMEINI=                  | Game                       |
| DEFINPUTINI=              | Default Input              |
| INPUTINI=                 | Input                      |
| DEFUIINI=                 | Default UI                 |
| UIINI=                    | UI                         |

*Reference From <https://docs.unrealengine.com/en-us/Programming/Basics/CommandLineArguments>*

### File Hierarchy

The configuration file hierarchy is read in starting with Base.ini, with values in later files in the hierarchy overriding earlier values. All files in the Engine folder will be applied to all projects, while project-specific settings should be in files in the project directory. Finally, all project-specific and platform-specific differences are saved out to \[ProjectDirectory]/Saved/Config/\[Platform]/\[Category].ini

The below file hierarchy example is for the Engine category of configuration files.

1. Engine/Config/Base.ini

   Base.ini is usually empty.

1. Engine/Config/BaseEngine.ini

1. Engine/Config/\[Platform]/\[Platform]Engine.ini

1. \[ProjectDirectory]/Config/DefaultEngine.ini

1. \[ProjectDirectory]/Config/\[Platform]/\[Platform]Engine.ini

1. \[ProjectDirectory]/Saved/Config/\[Platform]/Engine.ini

   The configuration file in the Saved directory only stores the project-specific and platform-specific differences in the stack of configuration files.

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*

### **File Format**

**Sections and Key-Value Pairs**

Typical configuration files consist of sections of key-value pairs, arranged as follows:

\[Section]
Key=Value

**Special Characters**

- *+* - Adds a line if that property doesn't exist yet (from a previous configuration file or earlier in the same configuration file).

- *-* - Removes a line (but it has to be an exact match).

- *.* - Adds a new property.

- *!* - Removes a property; but you don't have to have an exact match, just the name of the property.

**Note**: **.* is like *+** except it will potentially add a duplicate line. This is useful for the bindings (as seen in DefaultInput.ini), for instance, where the bottom-most binding takes effect, so if you add something like:

\[/Script/Engine.PlayerInput]
Bindings=(Name="Q",Command="Foo")
.Bindings=(Name="Q",Command="Bar")
.Bindings=(Name="Q",Command="Foo")

It will work appropriately. Using a *+* there would fail to add the last line, and your bindings would be incorrect. Due to configuration file combining, the above usage pattern can happen.

- Escape a quote character: ~Quote~, ~OpenBracket~. Ex:


    UserDefinedChords=~OpenBracket~~Quote~BindingContext~Quote~:~Quote~PlayWorld~Quote~,~Quote~CommandName~Quote~:~Quote~PausePlaySession~Quote~,~Quote~ChordIndex~Quote~:1,~Quote~Control~Quote~:false,~Quote~Alt~Quote~:false,~Quote~Shift~Quote~:false,~Quote~Command~Quote~:false,~Quote~Key~Quote~:~Quote~None~Quote~~CloseBracket~

**Comments**

Most people seem to be under the impression that the semicolon denotes comments in configuration files, but they aren't (FConfigFile::ProcessInputFileContents doesn't actually treat them, or any other string, as a comment delimiter). This behavior is intentional. Technically any character can represent a different key-value pair. Typically, a semicolon is placed at the beginning of a new line. It works like a comment, but it's not actually.

; This is a Comment
; So is this!

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/Basics/ConfigurationFiles/index.html>*
