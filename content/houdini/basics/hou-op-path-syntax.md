# Operator Path & Expression Syntax

## Overview

Operator parameters can be set with expressions, either in VEX or HScript
HScript is Houdini's older scripting language, primarly used for expressions in parameters
Should usually just use VEX but some places require hscript

## Cheat Sheet

- \` \` means evaluate expression inside of this string
- `Op:...` path reference syntax in VEX
  - can use full or relative path links
  - the second argument is either an int representing primitive number, or string representing primitive name
  ```c
  pig_mask = volumesample("op:/obj/examples/dopnet_vex_vops_volume:volume/pig_mask", 0, v@P);
  pig_mask = volumesample("op:" + opfullpath("../") + ":volume/pig_mask", "pig_mask", v@P);
  pig_mask = volumesample("op:../" + ":volume/pig_mask", 0, v@P); // op: syntax also accepts relative paths
  ```
  - for accessing DOP data is: `op:/DOP_node_path:dop_object_name/field_name`
  - we can also directly access SOP volumes using this syntax
    ```c
    pig_mask = volumesample("op:../../IN_VOLUMES", 1, v@P);
    ```
- `Op: syntax` in hscript can't use relative names. You have to use full path names
  ```hscript
  op:`opfullpath('..')`
  ```

- [Use/Reference operator output instead of file](http://www.sidefx.com/docs/houdini/io/op_syntax.html)
  - Can usually substitute `op:/path/to/node` for live node data instead of node file/file name parameter
  - Useful to use for referencing stuff into COPs or feeding COP outputs into materials
  ```hscript
  `op:/geo1/volume1`
  op:`opfullpath('../../volume1')`
  ```

- Get Obj Transform/Node Transform/Operator Transform:
  ```hscript
  `matrix m = optransform('/obj/cam1')`
  origin/vtorigin/vrorigin/vorigin
  originoffset
  optypeinfo
  opcreator
  oppwf
  opname
  ```

- Access channel data like a point() call, it lets you access other channels and other values of those channels.
  ```hscript
  chinput()
  ```

- Reference the input connection node:
  ```hscript
  `opinputpath("..", 0)`
  ```

- Useful operator functions
  | Function                 | Description                                               |
  | ------------------------ | --------------------------------------------------------- |
  | opparentbonetransform    | Returns the parent bone transform associated with an OP   |
  | opparenttransform        | Returns the parent transform associated with an OP        |
  | opparmtransform          | Returns the parm transform associated with an OP          |
  | oppreconstrainttransform | Returns the preconstraint transform associated with an OP |
  | oppretransform           | Returns the pretransform associated with an OP            |

## Common Recipes

- Create LookAt
  ```hscript
  explodematrix(mlookat(vtorigin("","/obj/from"),vtorigin("","/obj/to")),"SRT","XYZ","RX")
  explodematrix(
    rotate(180,"y") * mlookat(
      vector3(ch("xfmPosx"),ch("xfmPosy"),ch("xfmPosz")),
      vector3(ch("lookAtPointx"),ch("lookAtPointy"),ch("lookAtPointz"))
    ),"SRT","XYZ","RX")
  ```

- Add leading zeros
  ```hscript
  padzero(3,ch("frameToRenderVolumeTex")) => 020
  ```

- Custom HScript functions (they can be placed in an HDA and referenced directly by adding a codepage of type Expression)
  ```hscript
  string chmParmPath(string parmName, string nodePath, string component) {
    return nodePath + '/' + parmName + chs("loopIdx") + component;
  }
  string chmprms(string parmName) {
    return chs(chmParmPath(parmName, "../Parms_HDA", ""));
  }
  float chmprm(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", ""));
  }
  float chmprmEx(string parmName, string component) {
    return ch(chmParmPath(parmName, "../Parms_HDA", component));
  }
  float chmprmx(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "x"));
  }
  float chmprmy(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "y"));
  }
  float chmprmz(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "z"));
  }
  float chmprmr(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "r"));
  }
  float chmprmg(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "g"));
  }
  float chmprmb(string parmName) {
    return ch(chmParmPath(parmName, "../Parms_HDA", "b"));
  }
  ```

## Tutorials/Reference

- [Houdini's Expression Cookbook](http://www.sidefx.com/docs/houdini/ref/expression_cookbook.html)
