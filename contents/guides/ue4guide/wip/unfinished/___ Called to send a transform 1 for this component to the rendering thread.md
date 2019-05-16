/\*\* Called to send a transform 1 for this component to the rendering thread  
        \*  
        \* \*\*Caution\*\*, this is called concurrently on multiple threads (but never the same component concurrently)  
        \*/  
virtual void SendRenderTransform\_Concurrent();

 

 

 

void [UActorComponent::DoDeferredRenderUpdates\_Concurrent](http://api.unrealengine.com/INT/API/Runtime/Engine/Components/UActorComponent/DoDeferredRenderUpdates_Concurre-/index.html)()

{

    checkf([!HasAnyFlags(RF\_Unreachable)](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/EObjectFlags/index.html), TEXT("%s"), \*[GetFullName](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/GetFullName/index.html)());

    checkf(! [IsTemplate](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/IsTemplate/index.html)(), TEXT("%s"), \*[GetFullName][]());

    checkf(! [IsPendingKill](http://api.unrealengine.com/INT/API/Runtime/CoreUObject/UObject/UObjectBaseUtility/IsPendingKill/index.html) (), TEXT("%s"), \*[GetFullName][]());

 

    if(! [IsRegistered](http://api.unrealengine.com/INT/API/Runtime/Engine/Components/UActorComponent/IsRegistered/index.html) ())

    {

        UE\_LOG(LogActorComponent, [[Log](http://api.unrealengine.com/INT/API/Runtime/Core/Misc/ELogVerbosity__Type/index.html)], TEXT("UpdateComponent: (%s) Not registered, Aborting."), \*[GetPathName][]());

        return;

    }

 

    if(bRenderStateDirty)

    {

        SCOPE\_CYCLE\_COUNTER(STAT\_PostTickComponentRecreate);

        [RecreateRenderState\_Concurrent][]();

        checkf(!bRenderStateDirty, TEXT("Failed to route CreateRenderState\_Concurrent (%s)"), \*[GetFullName][]());

    }

    else

    {

        SCOPE\_CYCLE\_COUNTER(STAT\_PostTickComponentLW);

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

 

*From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Components/UActorComponent/DoDeferredRenderUpdates_Concurre-/index.html>&gt;*

 

void [UActorComponent::MarkRenderDynamicDataDirty][]()

{

    // If registered and has a render state to make as dirty

    if([IsRegistered][]() && \[bRenderStateCreated\](API\\Runtime\\Engine\\Components\\UActorComponent\\bRenderStateCreated))

    {

        // Flag as dirty

        bRenderDynamicDataDirty = true;

        [MarkForNeededEndOfFrameUpdate][]();

    }

}

 

*From &lt;<https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Components/UActorComponent/MarkRenderDynamicDataDirty/index.html>&gt;*

 

 

