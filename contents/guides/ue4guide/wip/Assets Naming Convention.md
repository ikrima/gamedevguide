---
sortIndex: 23
---

 UPDATED VERSION HERE: <https://github.com/Allar/ue4-style-guide>

*Reference From <http://www.tomlooman.com/ue4-naming-convention/>>*

# Unreal Engine 4: Naming Convention

 The goal of this document is to share our internal naming conventions with the community to give everyone something to start out with. Using and getting comfortable with  a strict naming convention is essential before your projects grows beyond a few dozen files.

 **\*Disclaimer**: This document is a constant work in progress, more asset types are added over time as we start using them with our game projects. If you have suggestions or comments you can leave them at the bottom of this page. Feedback is appreciated to improve this page.\*

 Last Revision: ***July 15, 2014***

 **Contents ** [hide](http://www.tomlooman.com/ue4-naming-convention/#)

- [1 General Naming](http://www.tomlooman.com/ue4-naming-convention/#General_Naming)

- [2 Prefixes](http://www.tomlooman.com/ue4-naming-convention/#Prefixes)

- [3 Suffixes](http://www.tomlooman.com/ue4-naming-convention/#Suffixes)

- [3.1 Textures](http://www.tomlooman.com/ue4-naming-convention/#Textures)

- [3.2 Animation](http://www.tomlooman.com/ue4-naming-convention/#Animation)

- [4 Texture Masks](http://www.tomlooman.com/ue4-naming-convention/#Texture_Masks)

- [5 Content Directories](http://www.tomlooman.com/ue4-naming-convention/#Content_Directories)

- [6 Coding Standards](http://www.tomlooman.com/ue4-naming-convention/#Coding_Standards)

## General Naming

- All names in English.

- All asset dependencies should be in the same folder. (except for shared assets)

- Asset type determines prefix.

- *Blueprint is** BP\_**assetname_01*

- Certain types (eg. textures) use a suffix to specify sub-types. 

- *T_Grass_01**\_N **for normal maps*

- Use underscores to split type from identifier and numeric values.

- *SM**\_**DoorHandle**\_**01*

- Use numeric values with 2 digits.

- \*SM_Pipe\_**01\***

  **Prefixes**

| **Asset Type**                | **Prefix** | **Example**                | **Comment**                                                    |
| ----------------------------- | ---------- | -------------------------- | -------------------------------------------------------------- |
| Blueprint                     | BP\_       | BP_WallLight_01            |                                                                |
| Blueprint Interface           | BPI\_      | BPI_InventoryItem_01       |                                                                |
| Material                      | M\_        | M_Grass_01                 |                                                                |
| Material Instance             | MI\_       | MI_Grass_01                |                                                                |
| Material Function             | MF\_       | MF_CheapContrast           | Not numbered                                                   |
| Material Parameter Collection | MPC\_      | MPC_EnvironmentSettings_01 |                                                                |
| Static Mesh                   | SM\_       | SM_Wall_01                 |                                                                |
| Skeletal Mesh                 | SK\_       | SK_Character_01            |                                                                |
| Texture                       | T\_        | T_Grass_01_D               | Has suffix for texture types. See suffixes table.              |
| Particle System               | PS\_       | PS_Fire_01                 |                                                                |
| Physics Material              | PM\_       | PM_Dirt                    | Not numbered                                                   |
| Sound                         | S\_        | S_HitImpact_01             |                                                                |
| Sound Cue                     | SC\_       | SC_HitImpact_01            |                                                                |
| Enumeration                   | E          | EWeaponType                | Not numbered. Similar to convention in code (enum EWeaponType) |
| Render Target                 | RT\_       | RT_CameraCapturePoint_01   |                                                                |

### Suffixes

 **Textures**

 Texture types all use the T\_ prefix.

| **Texture type**   | **Suffix** |
| ------------------ | ---------- |
| Color Map          | \_C        |
| Normal Map         | \_N        |
| Emissive Map       | \_E        |
| Mask Map           | \_M        |
| Roughness Map      | \_R        |
| Metallic Map       | \_MT       |
| Specular           | \_S        |
| Displacement       | \_DP       |
| Ambient Occlusion  | \_AO       |
| Height Map         | \_H        |
| Flow Map           | \_F        |
| Light Map (custom) | \_L        |

 **Animation**

 These types have no prefix.

| **Asset type**      | **Suffix**                                 |
| ------------------- | ------------------------------------------ |
| Animation Blueprint | \_AnimBlueprint                            |
| Physics Asset       | \_Physics                                  |
| Skeleton            | \_Skeleton                                 |
| Blendspace          | use descriptive name: \_AimOffsets         |
| AnimMontage         | use descriptive name: \_Death \_Equip etc. |

**Texture Masks**

 RGB Mask for environment:

- R = Metallic

- G = Roughness

- B = Ambient Occlusion

  **Content Directories**

| **Content Directories**   |                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| Content\\ **Animations**  | all imported animation files.                                                            |
| Content\\ **Base**        | base assets (eg. master materials) material functions and other "foundations" assets.    |
| Content\\ **Characters**  | character meshes / blueprints and skeletons.                                             |
| Content\\ **Dev**         | development assets / mockup meshes / special textures and icons. Not part of final build |
| Content\\ **Effects**     | particle effects and dependencies.                                                       |
| Content\\ **Environment** | environment assets (meshes –materials – textures)                                        |
| Content\\ **Gameplay**    | gameplay specific assets (eg. flag mesh & dependencies for Capture The Flag)             |
| Content\\ **PostProcess** | post process chains and its dependencies                                                 |
| Content\\ **Sound**       | sounds and sound cues                                                                    |
| Content\\ **UI**          | menu and HUD assets                                                                      |
| Content\\ **Weapons**     | weapons and projectiles                                                                  |

 **Coding Standards**

 Epic has set up a [Coding Standards] page at the Unreal documentation pages.

 Parts of this document were taken and/or modified from the [naming convention page] over at Unreal’s wiki.

 **Old Asset Naming Convention**

 **Contents**

[hide](http://www.tomlooman.com/ue4-naming-convention/)

- [1 Overview](https://wiki.unrealengine.com/Assets_Naming_Convention#Overview)

- [2 Basics](https://wiki.unrealengine.com/Assets_Naming_Convention#Basics)

- [3 Assets folders](https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_folders)

- [4 Folders by categories](https://wiki.unrealengine.com/Assets_Naming_Convention#Folders_by_categories)

- [5 Assets names](https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_names)

- [6 Texture Masks](https://wiki.unrealengine.com/Assets_Naming_Convention#Texture_Masks)

### Overview

This article contains ideas for assets naming convention and content folders structure.

### Basics

1. All names in **English**.

1. All asset dependencies should be in it’s folder (instead of some shared assets).

### Assets folders

| (maps)                                   |                                                                |
| ---------------------------------------- | -------------------------------------------------------------- |
| **Content\\Maps**                        | parent maps folder                                             |
| ............ **Maps\\Episode(\_Number)** | game episodes, where (\_Number) is 01, 02, 03, etc             |
| ............ **Maps\\TestMaps**          | test maps, maps prototypes and other levels not for production |

| (assets)                                 |                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------ |
| **Content\\Base**                        | basic materials, material functions and other “foundation” assets        |
| **Content\\Characters**                  | folder for characters                                                    |
| ............ **Characters\\NPC**         | NPCs                                                                     |
| ............ **Characters\\Player**      | player character(s)                                                      |
| **Content\\Dev**                         | development assets, like objects icons, special meshes and textures, etc |
| **Content\\Effects**                     | various shared effects                                                   |
| **Content\\Environment**                 | environment assets                                                       |
| ............ **Environment\\Background** | backgrounds                                                              |
| ............ **Environment\\Buildings**  | buildings (simple or procedural)                                         |
| ............ **Environment\\Foliage**    | foliage                                                                  |
| ............ **Environment\\Props**      | various props                                                            |
| ............ **Environment\\Sky**        | skies                                                                    |
| ............ **Environment\\Landscape**  | terrains assets                                                          |
| ............ **Environment\\Water**      | water meshes and materials                                               |
| **Content\\Gameplay**                    | assets for various gameplay purposes                                     |
| **Content\\PostProcess**                 | post process chains and it’s assets                                      |
| **Content\\Sound**                       | sounds and sound cues                                                    |
| **Content\\UI**                          | UI assets                                                                |
| **Content\\Vehicles**                    | vehicles with effects                                                    |
| **Content\\Weapons**                     | weapons with effects                                                     |

| Folders by categories |                                             |
| --------------------- | ------------------------------------------- |
| **Blueprints**        | blueprints                                  |
| **Meshes**            | static and skeletal meshes, physical assets |
| **Materials**         | materials and instances                     |
| **Textures**          | textures                                    |
| **Animations**        | animations                                  |
| **Particles**         | particle systems                            |
| **LensFlares**        | flares                                      |
| **Sounds**            | sounds + cues                               |
| **Morphs**            | morphs                                      |
| **FaceFX**            | FaceFX assets                               |

### Assets names

**Form:**

(Prefix\_)AssetName(\_Number)(\_Suffix)

Example:

T_Rock_01_D

**Prefixes:** (optional because of filters in content browser)

| (by usage) |                |
| ---------- | -------------- |
| CH\_       | Characters     |
| UI\_       | User Interface |
| VH\_       | Vehicles       |
| WP\_       | Weapons        |

| (by type) |                                |
| --------- | ------------------------------ |
| BP\_      | Blueprint                      |
| SK\_      | Skeletal Mesh                  |
| SM\_      | Static Mesh                    |
| AD\_      | Apex Destructible Asset        |
| AC\_      | Apex Cloth Asset               |
| MT\_      | Morph Target                   |
| ST\_      | Speed Tree                     |
| PS\_      | Particle System                |
| LF\_      | Lens Flare                     |
| VF\_      | Vector Field                   |
| S\_       | Sound                          |
| SC\_      | Sound Cue                      |
| M\_       | Material                       |
| MI\_      | Material Instance              |
| MITV\_    | Material Instance Time Varying |
| MF\_      | Material Function              |
| MPC\_     | Material Parameter Collection  |
| T\_       | Texture                        |
| TC\_      | Texture Cube                   |
| RT\_      | Render Target                  |
| PM\_      | Physical Material              |

**Suffixes:**

| (textures) |                   |
| ---------- | ----------------- |
| \_BC       | Base Color        |
| \_MT       | Metallic          |
| \_S        | Specular          |
| \_R        | Roughness         |
| \_N        | Normal            |
| \_DP       | Displacement      |
| \_AO       | Ambient Occlusion |
| \_H        | Height Map        |
| \_FM       | Flow Map          |
| \_L        | Light Map (fake)  |
| \_M        | Mask              |

| (meshes)  |                                 |
| --------- | ------------------------------- |
| \_Physics | physics assets (generated name) |
| \_FaceFX  | FaceFx assets                   |

| (animations)    |                                      |
| --------------- | ------------------------------------ |
| \_BlendSpace    | blend space (generated name)         |
| \_AnimBlueprint | animation blueprint (generated name) |

Texture Masks

RGB Mask for characters:

- R = Metallic
- G = Roughness
- B = Subsurface Opacity

RGB Mask for character's Hair:

- R = Hair Alpha
- G = Specular/Roughness map
- B = Anisotropic direction map

RGB Mask for environment:

- R = Metallic
- G = Roughness
- B = Ambient Occlusion

*Reference From [\[https://wiki.unrealengine.com/Assets_Naming_Convention\]\\(&lt;https://wiki.unrealengine.com/Assets_Naming_Convention)]([https://wiki.unrealengine.com/Assets_Naming_Convention]\(<https://wiki.unrealengine.com/Assets_Naming_Convention))*
