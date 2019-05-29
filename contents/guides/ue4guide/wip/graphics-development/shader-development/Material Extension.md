---
sortIndex: 3
---

Add defaults to custom material properties (eg MP_CustomData2) in:

```cpp
int32 FMaterialAttributeDefintion::CompileDefaultValue(FMaterialCompiler* Compiler)

{

int32 Ret;

// @third party code - BEGIN Bebylon - #Eng-Feature: BBFakeSSShadingMode - Adding new property

if (Compiler->GetMaterialShadingModel() == MSM_BBFakeSS &&

(Property == MP_CustomData0 || Property == MP_CustomData1 || Property == MP_CustomData2 || Property == MP_CustomData3))

{

// Standard value type

switch (Property)

{

case MP_CustomData0: Ret = Compiler->Constant(0.0f); break;

case MP_CustomData1: Ret = Compiler->Constant(0.0f); break;

case MP_CustomData2: Ret = Compiler->Constant(0.0f); break;

case MP_CustomData3: Ret = Compiler->Constant(0.0f); break;

}

}

// @third party code - END Bebylon
```
