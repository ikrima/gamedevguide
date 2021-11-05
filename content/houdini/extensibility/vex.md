# VEX

## Overview

VEX is Houdini's simd streaming scripting language

## Useful Functions
| Function | Description                                                                               |
| -------- | ----------------------------------------------------------------------------------------- |
| primuv   |                                                                                           |
| xyzdist  | return the distance from the sample point pt to the nearest point on the surface geometry |
| chramp   |                                                                                           |
| fit01    |                                                                                           |

## Common Tasks
- Print to Console: `printf("boobs %s %f", "wee", 1.0);`
- Pipe operator output referenced by parameter:
  - Object Merge Object1 field: `chsop("../../../export_node")`
  - `opfullpath("..") + "/fluid_obj/TRIANGLE_CLOUD"`
- [Loop over primitive points](https://gist.github.com/NSDesign/983bb7df6d6a154e9a19)
- [Ryoji CG Useful Snippets](https://sites.google.com/site/fujitarium/Houdini/useful-expressions-houdini)
- [Create Geo](https://houdinitricks.com/cvex-wrangle-vop-nodes/)

## Parameter Binding

| VEX type             | Syntax   |
| -------------------- | -------- |
| float                | `f@name` |
| vector2 (2 floats)   | `u@name` |
| vector (3 floats)    | `v@name` |
| vector4 (4 floats)   | `p@name` |
| int                  | `i@name` |
| matrix2 (2×2 floats) | `2@name` |
| matrix3 (3×3 floats) | `3@name` |
| matrix (4×4 floats)  | `4@name` |
| string               | `s@name` |
[Reference](http://www.sidefx.com/docs/houdini/vex/snippets)

## Tutorials
- [VEX tutorial](https://github.com/jtomori/vex_tutorial)
- [VEX Guide](http://www.tokeru.com/cgwiki/index.php?title=HoudiniVex)
