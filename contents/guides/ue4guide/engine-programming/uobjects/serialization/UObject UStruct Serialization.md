---
sortIndex: 1
---

### Serialize Struct:

```cpp
Ar << ObjectClass;

uStruct->SerializeItem(Ar, Allocation, nullptr);

if (Ar.ArIsLoading)
Object = NewObject&lt;UObject>(ObjectClass, ...);

if (Ar.WantBinaryPropertySerialization())
ObjectClass->SerializeBin(Ar, Object);
else
ObjectClass->SerializeTaggedProperties(Ar,Object,...);
```

**Serialize Enum:**

```cpp
FORCEINLINE friend FArchive& operator&lt;&lt;(FArchive& Ar, EnumType& Value)

 {

 return Ar &lt;&lt; (\_\_underlying_type(EnumType)&)Value;

 }
```

**UObject**

ObjectReader/ObjectWriter only to be able to serialize the actual objects into byte arrays. We have not found any other archives that do this for us in a good way.

*Reference From <https://udn.unrealengine.com/questions/299982/serialize-objects-for-loadsave.html>*

These will iterate through the UProperties in the class and either write binary (fast but difficult or impossible to save delta properties during development) or tagged properties (slower but allows delta properties). So the idea is to first serialize the object class using Ar &lt;&lt; ObjectClass; then spawn an instance of that class (if loading), then serialize the properties using the class and instance.

*Reference From <https://forums.unrealengine.com/development-discussion/c-gameplay-programming/1374656-how-to-load-an-object-from-binary-without-knowing-its-exact-class>*

### ArIsSaveGame = True

the super undocumented <span class="underline">secret to serializing any data to or from an object based on whether the CPF_SaveGame flag is set</span>, is super simple: When you are creating your FMemoryWriter, you MUST have the ArIsSaveGame flag set to true. By default, it's false. IF you forget to set this flag, the Memory Writer will try to serialize your ENTIRE object, and it will loop through EVERY property and try to serialize it.

*Reference From <https://forums.unrealengine.com/development-discussion/c-gameplay-programming/88477-spawning-actors-from-serialized-data?116235-Spawning-Actors-from-Serialized-Data=&viewfull=1>*

### Saving data to file

**Archive to bytearray to File**

```cpp
FActorSaveData ActorRecord;
ActorRecord.ActorName = FName(*Actor->GetName());
ActorRecord.ActorClass = Actor->GetClass()->GetPathName();
ActorRecord.ActorTransform = Actor->GetTransform();

FMemoryWriter MemoryWriter(ActorRecord.ActorData, true);
FSaveGameArchive Ar(MemoryWriter);
Actor->Serialize(Ar);

 SavedActors.Add(ActorRecord);
 ISaveableActorInterface::Execute_ActorSaveDataSaved(Actor);
```

After all the actor records are saved, we can create the final save game.

```cpp
FSaveGameData SaveGameData;

SaveGameData.GameID = "1234";
SaveGameData.Timestamp = FDateTime::Now();
SaveGameData.SavedActors = SavedActors;

FBufferArchive BinaryData;

BinaryData << SaveGameData;
```

After we have created the final save file and serialized it, we can store the byte array to a file.

```cpp
if (FFileHelper::SaveArrayToFile(BinaryData, *FString("TestSave.sav")))

{

UE_LOG(LogTemp, Warning, TEXT("Save Success! %s"), FPlatformProcess::BaseDir());

}

else

{

UE_LOG(LogTemp, Warning, TEXT("Save Failed!"));

}

BinaryData.FlushCache();

BinaryData.Empty();
```

*Reference From <http://runedegroot.com/saving-and-loading-actor-data-in-unreal-engine-4>*

**Alternate way to do it directly with proxy archive:**

```cpp
FArchive\* FileWriter = IFileManager::Get().CreateFileWriter(\*ProfileFileName);

if(FileWriter != nullptr)

{

FCollisionAnalyzerProxyArchive Ar(\*FileWriter);

int32 Magic = COLLISION_ANALYZER_MAGIC;

int32 Version = COLLISION_ANALYZER_VERSION;

Ar << Magic;

Ar << Version;

Ar << Queries;

FileWriter->Close();

delete FileWriter;

FileWriter = NULL;

UE_LOG(LogCollisionAnalyzer, Log, TEXT("Saved collision analyzer data to file '%s'."), \*ProfileFileName);

}
```

### Loading Actors

**Loading the data from file**

To load the binary data

```cpp
TArray<uint8>BinaryData;

if (!FFileHelper::LoadFileToArray(BinaryData, *FString("TestSave.sav")))
{
UE_LOG(LogTemp, Warning, TEXT("Load Failed!"));
return;
}
else
{
UE_LOG(LogTemp, Warning, TEXT("Load Succeeded!"));
}
```

##### Extracting data from binary

```cpp
FMemoryReader FromBinary = FMemoryReader(BinaryData, true);
FromBinary.Seek(0);

FSaveGameData SaveGameData;
FromBinary << SaveGameData;

FromBinary.FlushCache();
BinaryData.Empty();
FromBinary.Close();
```

*Reference From <http://runedegroot.com/saving-and-loading-actor-data-in-unreal-engine-4>*

### Serialize Objects & Names as strings:

```cpp
struct FSaveGameArchive : public FObjectAndNameAsStringProxyArchive

{

FSaveGameArchive(FArchive& InInnerArchive)

: FObjectAndNameAsStringProxyArchive(InInnerArchive, true)

{

ArIsSaveGame = true;

}

};
```

*Reference From <http://runedegroot.com/saving-and-loading-actor-data-in-unreal-engine-4>*

### PostFixupReferences

- Fixup actor/object references after serialization

*Reference From <https://forums.unrealengine.com/development-discussion/c-gameplay-programming/88477-spawning-actors-from-serialized-data?116235-Spawning-Actors-from-Serialized-Data=&viewfull=1>*


### Useful Array Serialization

`void BulkSerialize(FArchive& Ar, bool bForcePerElementSerialization = false)`

The BulkSerialize function is a serialization function that can be used as an alternative operator<< in order to serialize the array as a block of raw bytes, rather than doing per-element serialization. This can improve performance with trivial elements, like a built-in type or a plain data struct.