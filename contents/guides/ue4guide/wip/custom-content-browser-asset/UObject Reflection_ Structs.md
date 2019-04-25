Initialize Struct:

-------------------------------------

StructMemory = (uint8\*)FMemory::Malloc(ActualStruct-&gt;GetStructureSize());

ActualStruct-&gt;InitializeStruct(StructMemory);

 

Copy struct:

-------------------------------------

if (ProcAnimComponent && OutInitValueStore)

{

void\* RowPtr = Table-&gt;FindRowUnchecked(RowName);

if (RowPtr != NULL)

{

UScriptStruct\* StructType = Table-&gt;RowStruct;

if (StructType != NULL)

{

StructType-&gt;CopyScriptStruct(OutRowPtr, RowPtr);

bFoundRow = true;

}

}

}

 

Destroy Struct:

-------------------------------------

 

UScriptStruct\* structType = FESCompSumType::GetStructType(CompStructType);

structType-&gt;DestroyStruct(StructData);

 

 

Reflection through struct params apart:

<https://forums.unrealengine.com/community/community-content-tools-and-tutorials/27351-tutorial-how-to-accept-wildcard-structs-in-your-ufunctions>

 

 

FMovieSceneEvalTemplatePtr& operator=(const FMovieSceneEvalTemplatePtr& RHS)

> {
>
> if (RHS.IsValid())
>
> {
>
> UScriptStruct::ICppStructOps& StructOps = \*RHS-&gt;GetScriptStruct().GetCppStructOps();

 

> void\* Allocation = Reserve(StructOps.GetSize(), StructOps.GetAlignment());
>
> StructOps.Construct(Allocation);
>
> StructOps.Copy(Allocation, &RHS.GetValue(), 1);
>
> }

 

> return \*this;
>
> }
