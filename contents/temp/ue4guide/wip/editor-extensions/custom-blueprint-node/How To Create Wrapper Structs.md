---
sortIndex: 3
---

```cpp
USTRUCT()  
struct FMovieSceneEventParameters  
{  
        GENERATED_BODY()

FMovieSceneEventParameters() {}

/\*\* Construction from a struct type \*/  
        FMovieSceneEventParameters(UStruct& **InStruct**)  
                : StructType(&**InStruct**)  
        {  
        }

FMovieSceneEventParameters(const FMovieSceneEventParameters& **RHS**) = default;  
        FMovieSceneEventParameters& operator=(const FMovieSceneEventParameters& **RHS**) = default;

\#if PLATFORM_COMPILER_HAS_DEFAULTED_FUNCTIONS  
        FMovieSceneEventParameters(FMovieSceneEventParameters&&) = default;  
        FMovieSceneEventParameters& operator=(FMovieSceneEventParameters&&) = default;  
#else  
        FMovieSceneEventParameters(FMovieSceneEventParameters&& **RHS**)  
        {  
                \*this = MoveTemp(**RHS**);  
        }  
        FMovieSceneEventParameters& operator=(FMovieSceneEventParameters&& **RHS**)  
        {  
                StructType = MoveTemp(**RHS**.StructType);  
                StructBytes = MoveTemp(**RHS**.StructBytes);  
                return \*this;  
        }  
#endif

void OverwriteWith(const TArray&lt;uint8>> **Bytes**)  
        {  
                StructBytes = **Bytes**;  
        }

void GetInstance(FStructOnScope& **OutStruct**) const  
        {  
                UStruct\* **StructPtr** = StructType.Get();  
                **OutStruct**.Initialize(**StructPtr**);  
                uint8\* **Memory** = **OutStruct**.GetStructMemory();  
                if (**StructPtr** && **StructPtr**->GetStructureSize() > 0 >> StructBytes.Num())  
                {  
                        FMemoryReader **Reader**(StructBytes);  
                        **StructPtr**->SerializeTaggedProperties(**Reader**, **Memory**, **StructPtr**, nullptr);  
                }  
        }

UStruct\* GetStructType() const  
        {  
                return StructType.Get();  
        }

void Reassign(UStruct\* **NewStruct**)  
        {  
                StructType = **NewStruct**;

if (!**NewStruct**)  
                {  
                        StructBytes.Reset();  
                }  
        }

bool Serialize(FArchive& **Ar**)  
        {  
                UStruct\* **StructTypePtr** = StructType.Get();  
                **Ar** &lt;&lt; **StructTypePtr**;  
                StructType = **StructTypePtr**;

**Ar** &lt;&lt; StructBytes;

return true;  
        }

friend FArchive& operator&lt;&lt;(FArchive&lt; **Ar**, FMovieSceneEventParameters& **Payload**)  
        {  
                **Payload**.Serialize(**Ar**);  
                return **Ar**;  
        }

private:

TWeakObjectPtr&lt;UStruct> StructType;  
        TArray&lt;uint8> StructBytes;  
};
```
