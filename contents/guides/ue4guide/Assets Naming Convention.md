UPDATED VERSION HERE: <https://github.com/Allar/ue4-style-guide>
================================================================

> *-------------------------------------------------------------------------------------------------------------------*
>
> *From &lt;<http://www.tomlooman.com/ue4-naming-convention/>&gt;*
>
> # Unreal Engine 4: Naming Convention
>
> The goal of this document is to share our internal naming conventions with the community to give everyone something to start out with. Using and getting comfortable with  a strict naming convention is essential before your projects grows beyond a few dozen files.
>
> ***Disclaimer**: This document is a constant work in progress, more asset types are added over time as we start using them with our game projects. If you have suggestions or comments you can leave them at the bottom of this page. Feedback is appreciated to improve this page.*
>
> Last Revision: ***July 15, 2014***
>
> **Contents **\[[hide]\]

-   [1 General Naming]

-   [2 Prefixes]

-   [3 Suffixes]

-   [3.1 Textures]

-   [3.2 Animation]

-   [4 Texture Masks]

-   [5 Content Directories]

-   [6 Coding Standards]

> ## **General Naming**

-   All names in English.

-   All asset dependencies should be in the same folder. (except for shared assets)

-   Asset type determines prefix.

-   *Blueprint is** BP\_**assetname\_01*

-   Certain types (eg. textures) use a suffix to specify sub-types.* *

-   *T\_Grass\_01**\_N **for normal maps*

-   Use underscores to split type from identifier and numeric values.

-   *SM**\_**DoorHandle**\_**01*

-   Use numeric values with 2 digits.

-   *SM\_Pipe\_**01***

> **Prefixes**

<table><thead><tr class="header"><th><strong>Asset Type</strong></th><th><strong>Prefix</strong></th><th><strong>Example</strong></th><th><strong>Comment</strong></th></tr></thead><tbody><tr class="odd"><td>Blueprint</td><td>BP_</td><td>BP_WallLight_01</td><td> </td></tr><tr class="even"><td>Blueprint Interface</td><td>BPI_</td><td>BPI_InventoryItem_01</td><td> </td></tr><tr class="odd"><td>Material</td><td>M_</td><td>M_Grass_01</td><td> </td></tr><tr class="even"><td>Material Instance</td><td>MI_</td><td>MI_Grass_01</td><td> </td></tr><tr class="odd"><td>Material Function</td><td>MF_</td><td>MF_CheapContrast</td><td>Not numbered</td></tr><tr class="even"><td>Material Parameter Collection</td><td>MPC_</td><td>MPC_EnvironmentSettings_01</td><td> </td></tr><tr class="odd"><td>Static Mesh</td><td>SM_</td><td>SM_Wall_01</td><td> </td></tr><tr class="even"><td>Skeletal Mesh</td><td>SK_</td><td>SK_Character_01</td><td> </td></tr><tr class="odd"><td>Texture</td><td>T_</td><td>T_Grass_01_D</td><td>Has suffix for texture types. See suffixes table.</td></tr><tr class="even"><td>Particle System</td><td>PS_</td><td>PS_Fire_01</td><td> </td></tr><tr class="odd"><td>Physics Material</td><td>PM_</td><td>PM_Dirt</td><td>Not numbered</td></tr><tr class="even"><td>Sound</td><td>S_</td><td>S_HitImpact_01</td><td> </td></tr><tr class="odd"><td>Sound Cue</td><td>SC_</td><td>SC_HitImpact_01</td><td> </td></tr><tr class="even"><td>Enumeration</td><td>E</td><td>EWeaponType</td><td>Not numbered. Similar to convention in code (enum EWeaponType)</td></tr><tr class="odd"><td>Render Target</td><td>RT_</td><td>RT_CameraCapturePoint_01</td><td> </td></tr></tbody></table>

> **Suffixes**
>
> **Textures**
>
> Texture types all use the T\_ prefix.

<table><thead><tr class="header"><th><strong>Texture type</strong></th><th><strong>Suffix</strong></th></tr></thead><tbody><tr class="odd"><td>Color Map</td><td>_C</td></tr><tr class="even"><td>Normal Map</td><td>_N</td></tr><tr class="odd"><td>Emissive Map</td><td>_E</td></tr><tr class="even"><td>Mask Map</td><td>_M</td></tr><tr class="odd"><td>Roughness Map</td><td>_R</td></tr><tr class="even"><td>Metallic Map</td><td>_MT</td></tr><tr class="odd"><td>Specular</td><td>_S</td></tr><tr class="even"><td>Displacement</td><td>_DP</td></tr><tr class="odd"><td>Ambient Occlusion</td><td>_AO</td></tr><tr class="even"><td>Height Map</td><td>_H</td></tr><tr class="odd"><td>Flow Map</td><td>_F</td></tr><tr class="even"><td>Light Map (custom)</td><td>_L</td></tr></tbody></table>

> **Animation**
>
> These types have no prefix.

<table><thead><tr class="header"><th><strong>Asset type</strong></th><th><strong>Suffix</strong></th></tr></thead><tbody><tr class="odd"><td>Animation Blueprint</td><td>_AnimBlueprint</td></tr><tr class="even"><td>Physics Asset</td><td>_Physics</td></tr><tr class="odd"><td>Skeleton</td><td>_Skeleton</td></tr><tr class="even"><td>Blendspace</td><td>use descriptive name: _AimOffsets</td></tr><tr class="odd"><td>AnimMontage</td><td>use descriptive name: _Death _Equip etc.</td></tr></tbody></table>

> **Texture Masks**
>
> RGB Mask for environment:

-   R = Metallic

-   G = Roughness

-   B = Ambient Occlusion

> **Content Directories**

<table><thead><tr class="header"><th>Content\<strong>Animations</strong></th><th>all imported animation files.</th></tr></thead><tbody><tr class="odd"><td>Content\<strong>Base</strong></td><td>base assets (eg. master materials) material functions and other "foundations" assets.</td></tr><tr class="even"><td>Content\<strong>Characters</strong></td><td>character meshes / blueprints and skeletons.</td></tr><tr class="odd"><td>Content\<strong>Dev</strong></td><td>development assets / mockup meshes / special textures and icons. Not part of final build</td></tr><tr class="even"><td>Content\<strong>Effects</strong></td><td>particle effects and dependencies.</td></tr><tr class="odd"><td>Content\<strong>Environment</strong></td><td>environment assets (meshes – materials – textures)</td></tr><tr class="even"><td>Content\<strong>Gameplay</strong></td><td>gameplay specific assets (eg. flag mesh &amp; dependencies for Capture The Flag)</td></tr><tr class="odd"><td>Content\<strong>PostProcess</strong></td><td>post process chains and its dependencies</td></tr><tr class="even"><td>Content\<strong>Sound</strong></td><td>sounds and sound cues</td></tr><tr class="odd"><td>Content\<strong>UI</strong></td><td>menu and HUD assets</td></tr><tr class="even"><td>Content\<strong>Weapons</strong></td><td>weapons and projectiles</td></tr></tbody></table>

> **Coding Standards**
>
> Epic has set up a [Coding Standards] page at the Unreal documentation pages.
>
> Parts of this document were taken and/or modified from the [naming convention page] over at Unreal’s wiki.

 

> **Old Asset Naming Convention**
>
>  
>
>  
>
> **Contents**
>
>  \[[hide][naming convention page]\] 

-   [[1 Overview]](https://wiki.unrealengine.com/Assets_Naming_Convention#Overview)

-   [[2 Basics]](https://wiki.unrealengine.com/Assets_Naming_Convention#Basics)

-   [[3 Assets folders]](https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_folders)

-   [[4 Folders by categories]](https://wiki.unrealengine.com/Assets_Naming_Convention#Folders_by_categories)

-   [[5 Assets names]](https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_names)

-   [[6 Texture Masks]](https://wiki.unrealengine.com/Assets_Naming_Convention#Texture_Masks)



### Overview

This article contains ideas for assets naming convention and content folders structure.



### Basics

1. All names in **English**.

2. All asset dependencies should be in it’s folder (instead of some shared assets).



### Assets folders

(maps)

<table><thead><tr class="header"><th><strong>Content\Maps</strong></th><th>parent maps folder</th></tr></thead><tbody><tr class="odd"><td>............ <strong>Maps\Episode(_Number)</strong></td><td>game episodes, where (_Number) is 01, 02, 03, etc</td></tr><tr class="even"><td>............ <strong>Maps\TestMaps</strong></td><td>test maps, maps prototypes and other levels not for production</td></tr></tbody></table>

> (assets)

<table><thead><tr class="header"><th><strong>Content\Base</strong></th><th>basic materials, material functions and other “foundation” assets</th></tr></thead><tbody><tr class="odd"><td><strong>Content\Characters</strong></td><td>folder for characters</td></tr><tr class="even"><td>............ <strong>Characters\NPC</strong></td><td>NPCs</td></tr><tr class="odd"><td>............ <strong>Characters\Player</strong></td><td>player character(s)</td></tr><tr class="even"><td><strong>Content\Dev</strong></td><td>development assets, like objects icons, special meshes and textures, etc</td></tr><tr class="odd"><td><strong>Content\Effects</strong></td><td>various shared effects</td></tr><tr class="even"><td><strong>Content\Environment</strong></td><td>environment assets</td></tr><tr class="odd"><td>............ <strong>Environment\Background</strong></td><td>backgrounds</td></tr><tr class="even"><td>............ <strong>Environment\Buildings</strong></td><td>buildings (simple or procedural)</td></tr><tr class="odd"><td>............ <strong>Environment\Foliage</strong></td><td>foliage</td></tr><tr class="even"><td>............ <strong>Environment\Props</strong></td><td>various props</td></tr><tr class="odd"><td>............ <strong>Environment\Sky</strong></td><td>skies</td></tr><tr class="even"><td>............ <strong>Environment\Landscape</strong></td><td>terrains assets</td></tr><tr class="odd"><td>............ <strong>Environment\Water</strong></td><td>water meshes and materials</td></tr><tr class="even"><td><strong>Content\Gameplay</strong></td><td>assets for various gameplay purposes</td></tr><tr class="odd"><td><strong>Content\PostProcess</strong></td><td>post process chains and it’s assets</td></tr><tr class="even"><td><strong>Content\Sound</strong></td><td>sounds and sound cues</td></tr><tr class="odd"><td><strong>Content\UI</strong></td><td>UI assets</td></tr><tr class="even"><td><strong>Content\Vehicles</strong></td><td>vehicles with effects</td></tr><tr class="odd"><td><strong>Content\Weapons</strong></td><td>weapons with effects</td></tr></tbody></table>

>  
>
> Folders by categories

<table><thead><tr class="header"><th><strong>Blueprints</strong></th><th>blueprints</th></tr></thead><tbody><tr class="odd"><td><strong>Meshes</strong></td><td>static and skeletal meshes, physical assets</td></tr><tr class="even"><td><strong>Materials</strong></td><td>materials and instances</td></tr><tr class="odd"><td><strong>Textures</strong></td><td>textures</td></tr><tr class="even"><td><strong>Animations</strong></td><td>animations</td></tr><tr class="odd"><td><strong>Particles</strong></td><td>particle systems</td></tr><tr class="even"><td><strong>LensFlares</strong></td><td>flares</td></tr><tr class="odd"><td><strong>Sounds</strong></td><td>sounds + cues</td></tr><tr class="even"><td><strong>Morphs</strong></td><td>morphs</td></tr><tr class="odd"><td><strong>FaceFX</strong></td><td>FaceFX assets</td></tr></tbody></table>



### Assets names

**Form:**

(Prefix_)AssetName(_Number)(_Suffix)

Example:

T_Rock_01_D

 

**Prefixes:** (optional because of filters in content browser)

(by usage)



<table><thead><tr class="header"><th>CH_</th><th>Characters</th></tr></thead><tbody><tr class="odd"><td>UI_</td><td>User Interface</td></tr><tr class="even"><td>VH_</td><td>Vehicles</td></tr><tr class="odd"><td>WP_</td><td>Weapons</td></tr></tbody></table>

(by type)

<table><thead><tr class="header"><th>BP_</th><th>Blueprint</th></tr></thead><tbody><tr class="odd"><td>SK_</td><td>Skeletal Mesh</td></tr><tr class="even"><td>SM_</td><td>Static Mesh</td></tr><tr class="odd"><td>AD_</td><td>Apex Destructible Asset</td></tr><tr class="even"><td>AC_</td><td>Apex Cloth Asset</td></tr><tr class="odd"><td>MT_</td><td>Morph Target</td></tr><tr class="even"><td>ST_</td><td>Speed Tree</td></tr><tr class="odd"><td>PS_</td><td>Particle System</td></tr><tr class="even"><td>LF_</td><td>Lens Flare</td></tr><tr class="odd"><td>VF_</td><td>Vector Field</td></tr><tr class="even"><td>S_</td><td>Sound</td></tr><tr class="odd"><td>SC_</td><td>Sound Cue</td></tr><tr class="even"><td>M_</td><td>Material</td></tr><tr class="odd"><td>MI_</td><td>Material Instance</td></tr><tr class="even"><td>MITV_</td><td>Material Instance Time Varying</td></tr><tr class="odd"><td>MF_</td><td>Material Function</td></tr><tr class="even"><td>MPC_</td><td>Material Parameter Collection</td></tr><tr class="odd"><td>T_</td><td>Texture</td></tr><tr class="even"><td>TC_</td><td>Texture Cube</td></tr><tr class="odd"><td>RT_</td><td>Render Target</td></tr><tr class="even"><td>PM_</td><td>Physical Material</td></tr></tbody></table>

**Suffixes:**

(textures)

<table><thead><tr class="header"><th>_BC</th><th>Base color</th></tr></thead><tbody><tr class="odd"><td>_MT</td><td>Metallic</td></tr><tr class="even"><td>_S</td><td>Specular</td></tr><tr class="odd"><td>_R</td><td>Roughness</td></tr><tr class="even"><td>_N</td><td>Normal</td></tr><tr class="odd"><td>_DP</td><td>Displacement</td></tr><tr class="even"><td>_AO</td><td>Ambient Occlusion</td></tr><tr class="odd"><td>_H</td><td>Height Map</td></tr><tr class="even"><td>_FM</td><td>Flow Map</td></tr><tr class="odd"><td>_L</td><td>Light Map (fake)</td></tr><tr class="even"><td>_M</td><td>Mask</td></tr></tbody></table>

(meshes)

<table><thead><tr class="header"><th>_Physics</th><th>physics assets (generated name)</th></tr></thead><tbody><tr class="odd"><td>_FaceFX</td><td>FaceFx assets</td></tr></tbody></table>

(animations)

<table><thead><tr class="header"><th>_BlendSpace</th><th>blend space (generated name)</th></tr></thead><tbody><tr class="odd"><td>_AnimBlueprint</td><td>animation blueprint (generated name)</td></tr></tbody></table>

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

 

From <<https://wiki.unrealengine.com/Assets_Naming_Convention>> 



[hide]: http://www.tomlooman.com/ue4-naming-convention/
[1 General Naming]: http://www.tomlooman.com/ue4-naming-convention/#General_Naming
[2 Prefixes]: http://www.tomlooman.com/ue4-naming-convention/#Prefixes
[3 Suffixes]: http://www.tomlooman.com/ue4-naming-convention/#Suffixes
[3.1 Textures]: http://www.tomlooman.com/ue4-naming-convention/#Textures
[3.2 Animation]: http://www.tomlooman.com/ue4-naming-convention/#Animation
[4 Texture Masks]: http://www.tomlooman.com/ue4-naming-convention/#Texture_Masks
[5 Content Directories]: http://www.tomlooman.com/ue4-naming-convention/#Content_Directories
[6 Coding Standards]: http://www.tomlooman.com/ue4-naming-convention/#Coding_Standards
[Coding Standards]: https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html
[naming convention page]: https://wiki.unrealengine.com/Assets_Naming_Convention
[1 Overview]: https://wiki.unrealengine.com/Assets_Naming_Convention#Overview
[2 Basics]: https://wiki.unrealengine.com/Assets_Naming_Convention#Basics
[3 Assets folders]: https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_folders
[4 Folders by categories]: https://wiki.unrealengine.com/Assets_Naming_Convention#Folders_by_categories
[5 Assets names]: https://wiki.unrealengine.com/Assets_Naming_Convention#Assets_names
[6 Texture Masks]: https://wiki.unrealengine.com/Assets_Naming_Convention#Texture_Masks
