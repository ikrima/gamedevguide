---
sortIndex: 3
---

NetSerialization.h:

# An Overview of Net Serialization and how this all works

Everything originates in UNetDriver::ServerReplicateActors.

Actors are chosen to replicate, create actor channels, and UActorChannel::ReplicateActor is called.

ReplicateActor is ultimately responsible for deciding what properties have changed, and constructing a FOutBUnch to send to clients.

The UActorChannel has 2 ways to decide what properties need to be sent.

The traditional way, which is a flat TArray&lt;uint8> buffer: UActorChannel::Recent. This represents a flat block of the actor properties.

This block literally can be cast to an AActor\* and property values can be looked up if you know the UProperty offset.

The Recent buffer represents the values that the client using this actor channel has. We use recent to compare to current, and decide what to send.

This works great for 'atomic' properties; ints, floats, object\*, etc.

It does not work for 'dynamic' properties such as TArrays, which store values Num/Max but also a pointer to their array data,

The array data has no where to fit in the flat ::Recent buffer. (Dynamic is probably a bad name for these properties)

To get around this, UActorChannel also has a TMap for 'dynamic' state. UActorChannel::RecentDynamicState. This map allows us to look up

a 'base state' for a property given a property's RepIndex.

#### NetSerialize & NetDeltaSerialize

Properties that fit into the flat Recent buffer can be serialized entirely with NetSerialize. NetSerialize just reads or writes to an FArchive.

Since the replication can just look at the Recent\[] buffer and do a direct comparison, it can tell what properties are dirty. NetSerialize just reads or writes.

Dynamic properties can only be serialized with NetDeltaSerialize. NetDeltaSerialize is serialization from a given base state, and produces

both a 'delta' state (which gets sent to the client) and a 'full' state (which is saved to be used as the base state in future delta serializes).

NetDeltaSerialize essentially does the diffing as well as the serialization. It must do the diffing so it can know what parts of the property it must send.

#### Base States and dynamic properties replication.

As far as the replication system / UActorChannel is concerned, a base state can be anything. The base state only deals with INetDeltaBaseState\*.

UActorChannel::ReplicateActor will ultimately decide whether to call UProperty::NetSerializeItem or UProperty::NetDeltaSerializeItem.

As mentioned above NetDeltaSerialize takes in an extra base state and produces a diff state and a full state. The full state produced is used as the base state for future delta serialization. NetDeltaSerialize uses the base state and the current values of the actor to determine what parts it needs to send.

The INetDeltaBaseStates are created within the NetDeltaSerialize functions. The replication system / UActorChannel does not know about the details.

Right now, there are 2 forms of delta serialization: Generic Replication and Fast Array Replication.

#### Generic Delta Replication

Generic Delta Replication is implemented by UStructProperty::NetDeltaSerializeItem, UArrayProperty::NetDeltaSerializeItem, UProperty::NetDeltaSerializeItem.

It works by first NetSerializing the current state of the object (the 'full' state) and using memcmp to compare it to previous base state. UProperty
is what actually implements the comparison, writing the current state to the diff state if it has changed, and always writing to the full state otherwise.

The UStructProperty and UArrayProperty functions work by iterating their fields or array elements and calling the UProperty function, while also embedding meta data.

 For example UArrayProperty basically writes:
 "Array has X elements now" -> "Here is element Y" -> Output from UProperty::NetDeltaSerialize -> "Here is element Z" -> etc

Generic Data Replication is the 'default' way of handling UArrayProperty and UStructProperty serialization. This will work for any array or struct with any

sub properties as long as those properties can NetSerialize.

#### Custom Net Delta Serialiation

Custom Net Delta Serialiation works by using the struct trait system. If a struct has the WithNetDeltaSerializer trait, then its native NetDeltaSerialize

function will be called instead of going through the Generic Delta Replication code path in UStructProperty::NetDeltaSerializeItem.

#### Fast TArray Replication

Fast TArray Replication is implemented through custom net delta serialization. Instead of a flat TArray buffer to repesent states, it only is concerned with a TMap of IDs and ReplicationKeys. The IDs map to items in the array, which all have a ReplicationID field defined in FFastArraySerializerItem.

FFastArraySerializerItem also has a ReplicationKey field. When items are marked dirty with MarkItemDirty, they are given a new ReplicationKey, and assigned a new ReplicationID if they don't have one.

FastArrayDeltaSerialize (defined below)

During server serialization (writing), we compare the old base state (e.g, the old ID&lt;->Key map) with the current state of the array. If items are missing we write them out as deletes in the bunch. If they are new or changed, they are written out as changed along with their state, serialized via a NetSerialize call.

For example, what actually is written may look like:

"Array has X changed elements, Y deleted elements" -> "element A changed" -> Output from NetSerialize on rest of the struct item -> "Element B was deleted" -> etc

Note that the ReplicationID is replicated and in sync between client and server. The indices are not.

During client serialization (reading), the client reads in the number of changed and number of deleted elements. It also builds a mapping of ReplicationID -> local index of the current array.

As it deserializes IDs, it looks up the element and then does what it needs to (create if necessary, serialize in the current state, or delete).

There is currently no delta serialization done on the inner structures. If a ReplicationKey changes, the entire item is serialized. If we had use cases where we needed it, we could delta serialization on the inner dynamic properties. This could be done with more struct customization.

ReplicationID and ReplicationKeys are set by the MarkItemDirty function on FFastArraySerializer. These are just int32s that are assigned in order as things change.

There is nothing special about them other than being unique.
