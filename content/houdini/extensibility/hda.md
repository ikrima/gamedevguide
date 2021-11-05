# Houdini Digital Assets
HDAs are a bundle of functionality e.g. a module or library

## Parameters
Auto-import params
- Can import blocks of params from subnodes by using import blocks
- Mark folder param as import settings
- Mark attributes in subnode (like a Parms_HDA null node) as available for import
- ***Source:*** path to node. Ex: op:Parms_HDA
- ***Token:*** Entity to import from. Syntax:
  - ***Folder =>*** commonSettingsFolder:CommonSettingsFolderLable
  - ***Importblock =>*** importblock:commonImportBlockLabel
  - ***Blank =>*** imports everything
- **Mask:** import attributes matching this pattern

## VEX
Structs
- You can expose them by adding a myCustomStruct.json type definition file
- File should be in `$HOUDINI\_VOP\_DEFINITIONS\_PATH` (ex:`$HFS/vop/myStructs.json`)
- You can also define the structs in a header file and link it by adding `"definitionCode":"#include &lt;dualrest.h>"`
  - Examples: `$HFS/houdini/vop/structs.json`
  - Schema is located `$HFS/houdini/vop/TypeDefinitions.json.schema`

Vex Profiling
- command: `vexprofile -n -a start opcook /obj/geo1/v_mountain1 vexprofile > /tmp/mountain.stats`
- [Reference](https://www.sidefx.com/docs/houdini/commands/vexprofile.html)

## UI
Handles
- Can expose handles by right click on operator and say promote to handle
  [](../../assets/hda_handles.png)
- The movetool_candidate flag is used to indicate whether the handle can simply be changed to support one of the move tools (translate/rotate/scale).
- The ownerop setting specifies an alternate node whose space is used for the handle to operate in.
- The owneropgroup setting specifies the name of the group parameter on its owner node. This is used by the handle to know which geometry it should use to compute centroids for positioning itself.

HDA
- `help -k flags` or `help -k select`
- Opset
- Kwargs[1] = full path of operator


## Tutorials
- [HDA Building | Jeff Wagner | Houdini Illume Webinar](https://vimeo.com/279588789)
- [HDA Building - Pt 2 | Jeff Wagner | Houdini Illume Webinar](https://vimeo.com/280639638)
- [HDAs & Houdini Engine | Jeff Wagner | Houdini Illume Webinar](https://vimeo.com/284044473)