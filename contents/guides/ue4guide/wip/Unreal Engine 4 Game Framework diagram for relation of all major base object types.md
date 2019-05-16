Unreal Engine 4 Game Framework diagram for relation of all major base object types

[Unreal Engine 4 Input Event diagram, scroll down to section Input Processing Procedura ]

[RPCs official document, Must Read]

[Everything you should know about replication]

 

*From &lt;<https://forums.unrealengine.com/showthread.php?43714-Multicast-not-showing-on-Server>&gt;*

 

 

Useful Debug Commands:

-   Look at class ENGINE\_API UCheatManager : public Uobject in CheatManager.h

-   'ToggleDebugCamera'

-   showdebug bones

 

Physics Replication:

 Handling replication for an actor that is simulating physics on the client side is done in OnRep\_ReplicatedMovement() in /Engine/Source/Runtime/Engine/Private/ActorReplication.cpp. If you follow the chain you'll see the actual adjustments are done in ApplyRigidBodyState() in PrimitiveComponentPhysics.cpp. If you want to see how the server replicates the Actor's properties take a look at ServerReplicateActors() in NetworkDriver.cpp and its call to ReplicateActor() in DataChannel.cpp.

 

*From &lt;<https://forums.unrealengine.com/showthread.php?18789-Physics-replication-walkthrough>&gt;*

 

 

Look into these classes for gameplay:

-   UGameplayTask  
    
https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayTasks/UGameplayTask/index.html>
    
-   UAbilityTask  
    
https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayAbilities/Abilities/Tasks/UAbilityTask/index.html
    
-   UGameplayEffect  <https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayAbilities/UGameplayEffect/index.html>
    
-   UAbilitySystemComponent  
    
<https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayAbilities/UAbilitySystemComponent/index.html>
    
-   GamePlayTasks Module  
    
<https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayTasks/index.html>
    
-   GameplayAbilities Module  
    
    <https://docs.unrealengine.com/latest/INT/API/Runtime/GameplayAbilities/index.html>

 

 

Doing detail customization/PostEditChangeProperty in [[@UnrealEngine]](https://twitter.com/UnrealEngine)? Use GET\_MEMBER\_NAME\_CHECKED instead of a string for future-proofing

 

 

 

