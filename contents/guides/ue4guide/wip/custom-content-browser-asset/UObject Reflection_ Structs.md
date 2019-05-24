---
sortIndex: 5
---

#### Initialize Struct:

* * *
```cpp
StructMemory = (uint8\*)FMemory::Malloc(ActualStruct->GetStructureSize());

ActualStruct->InitializeStruct(StructMemory);

Copy struct:

* * *

if (ProcAnimComponent && OutInitValueStore)

{

void\* RowPtr = Table->FindRowUnchecked(RowName);

if (RowPtr != NULL)

{

UScriptStruct\* StructType = Table->RowStruct;

if (StructType != NULL)

{

StructType->CopyScriptStruct(OutRowPtr, RowPtr);

bFoundRow = true;

}

}

}
```
#### Destroy Struct:

* * *
```cpp
UScriptStruct\* structType = FESCompSumType::GetStructType(CompStructType);

structType->DestroyStruct(StructData);

Reflection through struct params apart:
```
<https://forums.unrealengine.com/community/community-content-tools-and-tutorials/27351-tutorial-how-to-accept-wildcard-structs-in-your-ufunctions>
```cpp
FMovieSceneEvalTemplatePtr& operator=(const FMovieSceneEvalTemplatePtr& RHS)

 {

 if (RHS.IsValid())

 {

 UScriptStruct::ICppStructOps& StructOps = \*RHS->GetScriptStruct().GetCppStructOps();

 void\* Allocation = Reserve(StructOps.GetSize(), StructOps.GetAlignment());

 StructOps.Construct(Allocation);

 StructOps.Copy(Allocation, &RHS.GetValue(), 1);

 }

 return \*this;

 }
```