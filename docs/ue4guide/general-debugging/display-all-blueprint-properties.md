---
sortIndex: 1
sidebar: ue4guide
---

Add these settings in the DefaultEditorPerProjectUserSettings.ini:

```ini
[PropertySettings]
ShowHiddenProperties=True

[/Script/UnrealEd.EditorPerProjectUserSettings]
bShowAllAdvancedDetails=True
bShowHiddenPropertiesWhilePlaying=True

; Dangerous: Allow editing of all properties
[/Script/UnrealEd.EditorExperimentalSettings]
bAllowPotentiallyUnsafePropertyEditing=true
```


You can also create a custom detailview with `FDetailsViewArgs::bForceHiddenPropertyVisibility = true`