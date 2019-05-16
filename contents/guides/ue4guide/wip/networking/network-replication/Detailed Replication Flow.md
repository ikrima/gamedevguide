UNetDriver::ServerReplicateActors. This is where the server will gather all of the actors that it has determined to be relevant for each client, and send any properties that have changed since the last time each connected client was updated.

 

*From &lt;<https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>&gt;*

 

 

Important functions for how actors are updated:

-   AActor::NetUpdateFrequency - Used to determine how often an actor replicates

-   AActor::PreReplication - Called before any replication occurs

-   AActor::bOnlyRelevantToOwner - True if this actor only replicates to owner

-   AActor::IsRelevancyOwnerFor - Called to determine relevancy when bOnlyRelevantToOwner is true

-   AActor::IsNetRelevantFor - Called to determine relevancy when bOnlyRelevantToOwner is false

 

 

The high level flow looks like this:

-   Loop over each actor that is actively replicating (AActor::SetReplicates( true ))

    -   Determine if this actor is initially dormant (DORM\_Initial), and if so, skip immediately.

    -   Determine if the actor needs to update by checking the NetUpdateFrequency value, if not skip

    -   If AActor::bOnlyRelevantToOwner is true, check the owning connection of this actor for relevancy by calling AActor::IsRelevancyOwnerFor on the viewer of the owning connection. If relevant, add to owned relevant list on the connection.

        -   In this case, this actor will only send to a single connection.

    -   For any actor that passes these initial checks, AActor::PreReplication is called.

        -   PreReplication is a place where you can decide if you want properties to replicate for connections. Use the DOREPLIFETIME\_ACTIVE\_OVERRIDE for this.

    -   If we pass the above, add to the considered list

-   For each connection:

    -   For each considered actor from above

        -   Determine if dormant

        -   If there is no channel yet

            -   Determine if client has loaded the level the actor is in

                -   If not loaded, skip

            -   Determine if the actor is relevant by calling AActor::IsNetRelevantFor for the connection

                -   If not relevant, skip

    -   Add any actors on the connections owned relevant list from above

    -   At this point, we have a list of actors that are relevant for this connection

    -   Sort actors by priority

    -   For each sorted actor:

        -   If the connection hasn't loaded the level this actor is in, close the channel (if any), and continue

        -   Every 1 second, determine if actor is relevant to connection by calling AActor::IsNetRelevantFor

        -   If not relevant for 5 seconds, close channel

        -   If relevant and no channel is open, open one now

        -   If at any point this connection is saturated

            -   For remaining actors

                -   If relevant for less than 1 second, force an update next tick

                -   If relevant for more than 1 second, call AActor::IsNetRelevantFor to determine if we should update next tick

        -   For any actor that passes all of the above, the actor is replicated to the connection by calling UChannel::ReplicateActor

 

*From &lt;<https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>&gt;*

 

 

**Replicating an Actor to a Connection**

UChannel::ReplicateActor is the workhorse for replicating an actor and all of its components to a connection. The flow looks something like this:

-   Determine if this is the first update since this actor channel was opened

    -   If so, serialize specific information that is needed (initial location, rotation, etc)

-   Determine if this connection owns this actor

    -   If not owned, and this actor's role is ROLE\_AutonomousProxy, then downgrade to ROLE\_SimulatedProxy

-   Replicate this actors changed properties

-   Replicate each component's changed properties

-   For any deleted components, send special delete command

 

*From &lt;<https://docs.unrealengine.com/en-us/Gameplay/Networking/Actors/ReplicationFlow>&gt;*
