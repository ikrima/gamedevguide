/\*\* Called to send a transform 1 for this component to the rendering thread  
        \*  
        \* \*\*Caution\*\*, this is called concurrently on multiple threads (but never the same component concurrently)  
        \*/  
virtual void SendRenderTransform_Concurrent();

void [UActorComponent::DoDeferredRenderUpdates_Concurrent](http://api.unrealengine.com/INT/API/Runtime/Engine/Components/UActorComponent/DoDeferredRenderUpdates_Concurre-/index.html)()

{

checkf([!HasAnyFlags(RF_Unreachable)](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/EObjectFlags/index.html), TEXT("%s"), \*[GetFullName](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/GetFullName/index.html)());

checkf(! [IsTemplate](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/IsTemplate/index.html)(), TEXT("%s"), \*[GetFullName][]());

checkf(! [IsPendingKill](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/IsPendingKill/index.html) (), TEXT("%s"), \*[GetFullName][]());

if(! [IsRegistered](http://api.unrealengine.com/INT/API/Runtime/Engine/Components/UActorComponent/IsRegistered/index.html) ())

{

UE_LOG(LogActorComponent, \[[Log](http://api.unrealengine.com/INT/API/Runtime/Core/Misc/ELogVerbosity__Type/index.html)], TEXT("UpdateComponent: (%s) Not registered, Aborting."), \*[GetPathName][]());

return;

}

if(bRenderStateDirty)

{

SCOPE_CYCLE_COUNTER(STAT_PostTickComponentRecreate);

[RecreateRenderState\_Concurrent][]();

checkf(!bRenderStateDirty, TEXT("Failed to route CreateRenderState_Concurrent (%s)"), \*[GetFullName][]());

}

else

{

SCOPE_CYCLE_COUNTER(STAT_PostTickComponentLW);

if(bRenderTransformDirty)

{

// Update the component's transform if the actor has been moved since it was last updated.

[SendRenderTransform\_Concurrent][]();

}

if(bRenderDynamicDataDirty)

{

[SendRenderDynamicData\_Concurrent][]();

}

}

}

*From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Components/UActorComponent/DoDeferredRenderUpdates_Concurre-/index.html>>*

void [UActorComponent::MarkRenderDynamicDataDirty][]()

{

// If registered and has a render state to make as dirty

if([IsRegistered][]() && \[bRenderStateCreated](API\\Runtime\\Engine\\Components\\UActorComponent\\bRenderStateCreated))

{

// Flag as dirty

bRenderDynamicDataDirty = true;

[MarkForNeededEndOfFrameUpdate][]();

}

}

*From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Components/UActorComponent/MarkRenderDynamicDataDirty/index.html>>*
