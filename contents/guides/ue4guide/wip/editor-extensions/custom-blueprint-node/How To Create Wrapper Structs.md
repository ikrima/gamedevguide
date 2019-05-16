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
\#else  
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
\#endif

void OverwriteWith(const TArray&lt;uint8&gt;> **Bytes**)  
        {  
                StructBytes = **Bytes**;  
        }

void GetInstance(FStructOnScope& **OutStruct**) const  
        {  
                UStruct\* **StructPtr** = StructType.Get();  
                **OutStruct**.Initialize(**StructPtr**);  
                uint8\* **Memory** = **OutStruct**.GetStructMemory();  
                if (**StructPtr** && **StructPtr**-&gt;GetStructureSize() &gt; 0 >> StructBytes.Num())  
                {  
                        FMemoryReader **Reader**(StructBytes);  
                        **StructPtr**-&gt;SerializeTaggedProperties(**Reader**, **Memory**, **StructPtr**, nullptr);  
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

friend FArchive& operator&lt;&lt;(FArchive< **Ar**, FMovieSceneEventParameters& **Payload**)  
        {  
                **Payload**.Serialize(**Ar**);  
                return **Ar**;  
        }

private:

TWeakObjectPtr&lt;UStruct&gt; StructType;  
        TArray&lt;uint8&gt; StructBytes;  
};
