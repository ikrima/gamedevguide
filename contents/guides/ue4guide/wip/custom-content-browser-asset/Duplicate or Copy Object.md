---
sortIndex: 12
---

1. Generic object copy
 UEngine::CopyPropertiesForUnrelatedObjects(ObjectTemplate, SpawnedActor, CopyParams);

2. Fast copy of specific class

     StaticDuplicateObject(Instance, &OwnerMovieScene, TemplateName, RF_AllFlags & ~RF_Transient);

3. For actors:

     EditorUtilities::CopySingleProperty()

     EditorUtilities::CopyActorProperties()



NOTE: You can pass a template object but Subobject Instancing needs a special case:

```cpp
UCLASS()

class UDuplicateTestSubObject : public UObject

{

GENERATED_BODY()

public:

UPROPERTY()

int32 TestValue;

};

UCLASS()

class UDuplicateTestObject : public UObject

{

GENERATED_BODY()

public:

UPROPERTY(Instanced)

UDuplicateTestSubObject\* SubObject;

};

UCLASS()

class ADuplicateTestActor : public AActor

{

GENERATED_BODY()

virtual void BeginPlay() override

{

Super::BeginPlay();

UDuplicateTestObject\* SrcObject = NewObject&lt;UDuplicateTestObject>();

SrcObject->SubObject = NewObject&lt;UDuplicateTestSubObject>(SrcObject);

UDuplicateTestObject\* DestObject = NewObject&lt;UDuplicateTestObject>();

for (int32 i = 0; i &lt; 100; ++i)

{

SrcObject->SubObject->TestValue = i;

DestObject = NewObject&lt;UDuplicateTestObject>(DestObject->GetOuter(), DestObject->GetFName(), RF_NoFlags, SrcObject);

// DestObject = DuplicateObject(SrcObject, DestObject->GetOuter(), DestObject->GetFName());

check(DestObject);

check(DestObject->SubObject);

check(DestObject->SubObject != SrcObject->SubObject);

check(DestObject->SubObject->TestValue == i);

}

}

};

 void UDuplicateTestObject::BeginDestroy()

 {

 if (SubObject != nullptr)

 {

 SubObject->ConditionalBeginDestroy();

 }

 Super::BeginDestroy();

 }
```
<https://udn.unrealengine.com/questions/458532/view.html>


