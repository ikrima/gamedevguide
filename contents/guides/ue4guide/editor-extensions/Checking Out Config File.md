---
sortIndex: 12
---

# Checking Out Default*.ini file for a class

You can also mark it as writable, test if it's under source control, etc. Here are the helper functions to use:

```cpp
Engine\Source\Developer\SharedSettingsWidgets\Public\SSettingsEditorCheckoutNotice.h:

namespace SettingsHelpers
{
	SHAREDSETTINGSWIDGETS_API bool IsSourceControlled(const FString& InFileToCheckOut, bool bForceSourceControlUpdate = false);
	SHAREDSETTINGSWIDGETS_API bool IsCheckedOut(const FString& InFileToCheckOut, bool bForceSourceControlUpdate = false);
	SHAREDSETTINGSWIDGETS_API bool CheckOutOrAddFile(const FString& InFileToCheckOut, bool bForceSourceControlUpdate = false, bool ShowErrorInNotification = true, FText* OutErrorMessage = nullptr);
	SHAREDSETTINGSWIDGETS_API bool MakeWritable(const FString& InFileToMakeWritable, bool ShowErrorInNotification = true, FText* OutErrorMessage = nullptr);
}
```