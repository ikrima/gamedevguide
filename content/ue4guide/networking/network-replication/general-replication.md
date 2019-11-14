---
sortIndex: 1
sidebar: ue4guide
---

Object reference replication:

- References are sent over with a special ID (FnetworkGUID).

- Server is in charge of assinging this ID and then notifying all connected clients of assignment

- For objects to be referenced, they have to return Uobject::IsSupportedForNetworking() which passes if:

  - Any replicated actor can be replicated as a reference

  - Any non-replicated actor must be stably named (UObject::IsNameStableForNetworking() == true)

  - Any replicated component

  - Any non-replicated component that is stably named (UObject::IsNameStableForNetworking() == true)

  - All UObjects loaded from packagese


- Stably Named (aka UObject::IsNameStableForNetworking() default implementation)

  - Actors - If loaded from packages

  - Components

    - Loaded from packages

    - Added via simple construction scripts/blueprints

    - Manually marked (UActorComponent::SetNetAddressable()) - You have to make sure the component has the same name on both client & server. Anything in the AActor C++ constructor fits this

    - If you spawn a component and then on the client spawn it with the same name, you can mark it as stable named (SetNetAddressable()) and UE4 won't try to replicate the object but instead try to match up the objects on the server/client through the name. If you spawn on the server + mark it as replicated, then you are telling the client to try to create a new component instead of matching it up with an existing one.
      <https://udn.unrealengine.com/questions/236164/dynamically-add-component-in-begin-play.html>
