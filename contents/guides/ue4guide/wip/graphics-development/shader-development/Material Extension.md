Add defaults to custom material properties (eg MP\_CustomData2) in:

int32 FMaterialAttributeDefintion::CompileDefaultValue(FMaterialCompiler\* Compiler)

{

int32 Ret;

 

// @third party code - BEGIN Bebylon - \#Eng-Feature: BBFakeSSShadingMode - Adding new property

if (Compiler-&gt;GetMaterialShadingModel() == MSM\_BBFakeSS &&

(Property == MP\_CustomData0 || Property == MP\_CustomData1 || Property == MP\_CustomData2 || Property == MP\_CustomData3))

{

// Standard value type

switch (Property)

{

case MP\_CustomData0: Ret = Compiler-&gt;Constant(0.0f); break;

case MP\_CustomData1: Ret = Compiler-&gt;Constant(0.0f); break;

case MP\_CustomData2: Ret = Compiler-&gt;Constant(0.0f); break;

case MP\_CustomData3: Ret = Compiler-&gt;Constant(0.0f); break;

}

}

// @third party code - END Bebylon
