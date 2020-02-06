---
sortIndex: 5
sidebar: ue4guide
---

# Exposing Wrapper/SumType/Variant Structs to Blueprints

I think you should be able to produce this sort of effect similar to the Get Data Table Row node, which casts the values in a data table to the correct output pin type based on a **UScriptStruct** which is derived from the inputs.

It may help to visualize by dropping one of these nodes into a blueprint editor (also have a data table to actually hook it up to). You'll see the output type changes according to the type in the data table row.

In C++, reference **UK2Node_GetDataTableRow**. I think of particular interest for the purpose of controlling the output pin type will be the **SetReturnTypeForStruct** method .

Depending on how you do it, it may also be useful to use a UK2Node_CallFunction, which you can see an example of in **ExpandNode** where we use **GetDataTableRowFromName** . Here it's used to transform the row name, but you may find a similar use for this elsewhere.

*Reference From <https://udn.unrealengine.com/questions/458599/view.html>*


# How To Create Wrapper Structs

```cpp
USTRUCT()
struct FMovieSceneEventParameters
{
  GENERATED_BODY()

  FMovieSceneEventParameters() {}

  /** Construction from a struct type */
  FMovieSceneEventParameters(UStruct& InStruct)
    : StructType(&InStruct)
  {
  }

  FMovieSceneEventParameters(const FMovieSceneEventParameters& RHS) = default;
  FMovieSceneEventParameters& operator=(const FMovieSceneEventParameters& RHS) = default;

#if PLATFORM_COMPILER_HAS_DEFAULTED_FUNCTIONS
  FMovieSceneEventParameters(FMovieSceneEventParameters&&) = default;
  FMovieSceneEventParameters& operator=(FMovieSceneEventParameters&&) = default;
#else
  FMovieSceneEventParameters(FMovieSceneEventParameters&& RHS)
  {
    *this = MoveTemp(RHS);
  }
  FMovieSceneEventParameters& operator=(FMovieSceneEventParameters&& RHS)
  {
    StructType = MoveTemp(RHS.StructType);
    StructBytes = MoveTemp(RHS.StructBytes);
    return *this;
  }
#endif

  void OverwriteWith(const TArray<uint8>& Bytes)
  {
    StructBytes = Bytes;
  }

  void GetInstance(FStructOnScope& OutStruct) const
  {
    UStruct* StructPtr = StructType.Get();
    OutStruct.Initialize(StructPtr);
    uint8* Memory = OutStruct.GetStructMemory();
    if (StructPtr && StructPtr->GetStructureSize() > 0 && StructBytes.Num())
    {
      FMemoryReader Reader(StructBytes);
      StructPtr->SerializeTaggedProperties(Reader, Memory, StructPtr, nullptr);
    }
  }

  UStruct* GetStructType() const
  {
    return StructType.Get();
  }

  void Reassign(UStruct* NewStruct)
  {
    StructType = NewStruct;

    if (!NewStruct)
    {
      StructBytes.Reset();
    }
  }

  bool Serialize(FArchive& Ar)
  {
    UStruct* StructTypePtr = StructType.Get();
    Ar << StructTypePtr;
    StructType = StructTypePtr;

    Ar << StructBytes;

    return true;
  }

  friend FArchive& operator<<(FArchive& Ar, FMovieSceneEventParameters& Payload)
  {
    Payload.Serialize(Ar);
    return Ar;
  }

private:

  TWeakObjectPtr<UStruct> StructType;
  TArray<uint8> StructBytes;
};

```
