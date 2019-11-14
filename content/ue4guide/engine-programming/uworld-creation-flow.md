---
sortIndex: 2
sidebar: ue4guide
---

# UWorld Creation Flow

```cpp
UWorld::CreateWorld()
  NewObject<UWorld>()
    OnPostWorldCreation.Broadcast()
  UWorld::InitializeNewWorld
    - Create persistent level
      PersistentLevel = NewObject<ULevel>(this, TEXT("PersistentLevel"));
      PersistentLevel->Initialize(FURL(nullptr));
      PersistentLevel->Model = NewObject<UModel>(PersistentLevel);
      PersistentLevel->Model->Initialize(nullptr, 1);
      PersistentLevel->OwningWorld = this;

    - Spawn World Settings
      AWorldSettings* WorldSettings = SpawnActor<AWorldSettings>( GEngine->WorldSettingsClass, SpawnInfo );
	    PersistentLevel->SetWorldSettings(WorldSettings);

    UWorld::InitWorld()
      FWorldDelegates::OnPreWorldInitialization.Broadcast(this, IVS)
      - Create various scenes/managers
        - CreatePhysicsScene(WorldSettings)
        - GetRendererModule().AllocateScene(this, bRequiresHitProxies, IVS.bCreateFXSystem, FeatureLevel)
        - CreateAISystem()
        - etc
      FWorldDelegates::OnPostWorldInitialization.Broadcast(this, IVS)
      PersistentLevel->InitializeRenderingResources()
```
