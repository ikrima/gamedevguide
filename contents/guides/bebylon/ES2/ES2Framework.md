<!-- markdownlint-disable -->


# ECS Code Flow

# Code Review

- Maybe interfaces? Can have pure functions

  ```cpp
  UINTERFACE(MinimalAPI, meta=(CannotImplementInterfaceInBlueprint))
  class UESComponentInterface : public UInterface
  {
      GENERATED_BODY()
  };

  class BBR_API IESComponentInterface
  {
      GENERATED_BODY()

  public:
      virtual FESComponentID GetOwningCID()   const { return OwningCID;  }
      virtual ESCTypeID GetComponentTypeID() const = 0;// PURE_VIRTUAL(IESComponentInterface::GetComponentTypeID, return ESCTypeID::COUNT;)
  protected:
      virtual void SetOwningCID(FESComponentID InCID) { OwningCID = InCID; }
      FESComponentID OwningCID = FESComponentID::Invalid;

      friend class ESEntityAdmin;
  };

  UCLASS(BlueprintType)
  class BBR_API ABBItem : public AActor, public IESComponentInterface, public IESEntityInterface
  {...}
  ```

- check()/ensure() => grdchk0/1/2/3/4 + grdvfy0/1/2/3/4

==============================================================================================================

# Questions

- Confirm: ES22Driver delegate events going away? going away?

==============================================================================================================

# Notes/Fixes/YOLOs

- Monkey patched the gamemode to quickly decouple old ecsa stuff
![](2019-09-05-04-37-06.png)

- Couldn't update old map bc exclusive checkout so made a new one. Old one won't work if you sync
![](2019-09-05-04-38-34.png)

- Added your ES2AdminActor to the map, configured it to use my mock classes, and removed old ECS Actor
  - Also added new ECSManagerActor that's responsible for all the ECS stuff. Need persistent configuration changes from Map to Game so I rely on CreateDefaultSubobject()
![](2019-09-05-04-40-42.png)

- Everything that's a stub/monkeypatch is commented, prefixed with ES2Stubs, and when possible, placed in separate classes/files. Note: For the most part, kept the logic parity so "cleanup" will be just removing the old ECS classes
  - What will change & was quick & dirtied is the exact interface/where the shim/stub code will finally live (ie any shim/glue code isn't encapsulated very well; this is on purpose to get stuff working quickly)


Map: ActorClass => Archetype
  - Create Entity
  - Create Components


Map: Component => EntityComponent
  - 