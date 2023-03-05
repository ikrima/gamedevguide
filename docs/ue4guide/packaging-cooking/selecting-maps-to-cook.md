---
sortIndex: 5
sidebar: ue4guide
---

**DefaultGame.ini**

**[Script/UnrealEd.ProjectPackagingSettings]**

- bCookAll: if true, cook everything in the content directory. This means that if you have an asset that is not referenced by any others, it will still end up in the cook. From this it follows that the list of maps to be cooked is simply all of them, even if they are not in any other .inis.

- bCookMapsOnly: this setting **only** has any effect if bCookAll is set. If it is true, "cook all" does not actually cook every asset, just all maps and the assets they reference.

- DirectoriesToAlwaysCook: like bCookAll for subdirectories. You can have more than one of these (possibly combined with DirectoriesToNeverCook) to get more fine-grained control than you would with bCookAll.

- bCookSinglePackage: affects MapsToCook behaviour (and nothing else), see below.

- \+MapsToCook: which maps to cook if: (1) bCookSinglePackage is false (the default), and (2) there are no maps specified on the command line.

**DefaultEditor.ini**

**[AlwaysCookMaps]**

\+Map: map(s) to always cook (one line for each). Despite what the filename suggests, this setting is also used by the automation tool and project launcher/frontend. And as you suspected, these maps are cooked regardless of whether they are selected in the launcher or not.

**[AllMaps]**

\+Map: map(s) listed here (one line for each) are used as a fallback option in case there are (1) no maps specified on the command line and (2) no maps in MapsToCook. This is for backwards compatibility only.

If you want to make a selection of maps that should really always be cooked, use AlwaysCookMaps. I would not recommend using either AllMaps or MapsToCook, since their behaviour depends on other environment variables which makes them prone to unexpected breakage. If you want you can set MapsToCook, but be aware that if you specify maps on the command line this setting will be ignored.

*Reference From <https://forums.unrealengine.com/development-discussion/c-gameplay-programming/72687-list-of-maps-to-cook>*
