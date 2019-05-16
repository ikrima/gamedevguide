1.  Generic object copy

> UEngine::CopyPropertiesForUnrelatedObjects(ObjectTemplate, SpawnedActor, CopyParams);

2. Fast copy of specific class

> StaticDuplicateObject(Instance, &OwnerMovieScene, TemplateName, RF_AllFlags & ~RF_Transient);

3. For actors:

> EditorUtilities::CopySingleProperty()
>
> EditorUtilities::CopyActorProperties()

NOTE: You can pass a template object but Subobject Instancing needs a special case:

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

UDuplicateTestObject\* SrcObject = NewObject&lt;UDuplicateTestObject&gt;();

SrcObject-&gt;SubObject = NewObject&lt;UDuplicateTestSubObject&gt;(SrcObject);

UDuplicateTestObject\* DestObject = NewObject&lt;UDuplicateTestObject&gt;();

for (int32 i = 0; i &lt; 100; ++i)

{

SrcObject-&gt;SubObject-&gt;TestValue = i;

DestObject = NewObject&lt;UDuplicateTestObject&gt;(DestObject-&gt;GetOuter(), DestObject-&gt;GetFName(), RF_NoFlags, SrcObject);

// DestObject = DuplicateObject(SrcObject, DestObject-&gt;GetOuter(), DestObject-&gt;GetFName());

check(DestObject);

check(DestObject-&gt;SubObject);

check(DestObject-&gt;SubObject != SrcObject-&gt;SubObject);

check(DestObject-&gt;SubObject-&gt;TestValue == i);

}

}

};

> void UDuplicateTestObject::BeginDestroy()
>
> {
>
> if (SubObject != nullptr)
>
> {
>
> SubObject-&gt;ConditionalBeginDestroy();
>
> }
>
> Super::BeginDestroy();
>
> }

<https://udn.unrealengine.com/questions/458532/view.html>

>
