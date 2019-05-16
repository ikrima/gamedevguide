*Physics simulation is run on both the client and the server. Updates are sent to the client from the server. The following struct is used to describe the physical state of a rigid body, and is replicated (as defined in **Actor**):*

struct RigidBodyState  
{  
var vector Position;  
var Quat Quaternion;  
var vector LinVel; // RBSTATE_LINVELSCALE times actual (precision reasons)  
var vector AngVel; // RBSTATE_ANGVELSCALE times actual (precision reasons)  
var int bNewData;  
};

*A struct used so that all properties change at the same time*. The vectors are compressed to integer resolution, so that they are scaled before sending. Quats are compressed to only send 3 values; the 4th value is inferred from the other 3.

*For physics replication, there are two types of correction:*

- *Small corrections and object moving: 20% position adjust, 80% additional velocity to target*

- *Large correction or object stopped: 100% position adjust*

Simulation

The following scenarios describe physics simulation:

- **\*ROLE_SimulatedProxy** Actor simulation\*

  - *The client continuously updates the simulated actor position based on the received position and velocity.*

  - *If **bUpdateSimulatedPosition** is true, authoritative position updates are continuously sent from the server to the client (otherwise, no position updates are sent after the initial replication of the Actor).*

- *Pawns on other clients*

  - *Unlike other Actors, simulated Pawns do not execute normal physics functions on the client. This means that physics events, like the **Landed()** event, are never called for pawns on non-owning clients.*

  - *The physics mode of the Pawn is inferred from its position, and the **bSimulateGravity** flag, and its predicted position is updated based on the replicated velocity.*

    - *The **bSimGravityDisabled** flag is set, temporarily turning off gravity simulation, if Pawn didn’t fit at the replicated position, and is in danger of falling through the world on the client.*

- **\*PHYS_RigidBody** Actors (Vehicles, KActors, etc.)\*

  - *Both client and server simulate the objects, but the server sends authoritative updates to the client periodically (when the object is awake). The client then moves the object to match the server version*

    - *Attempts to do so smoothly, by altering velocity to bring about convergence in positions rather than snapping the position if the error is below an acceptable threshold*

  - *Use **RigidBodyState** struct for atomic replication, when all properties must be received in synch.*

*For Ragdoll physics, only the hip location is replicated. It is often possible to tear off completely and not replicate at all.*

*For Vehicles (**PHYS_RigidBody** Actors), there is the following network flow:*

1. *Press key on client*

1. *Send inputs (throttle, sterring, rise) to server - replicated function **ServerDrive** called*

1. *Generate ouptut (OutputBrake, OutputGas, etc.); pack into replicated structs that can be sent to the client - **ProcessCarInput()** called on server*

1. *Update vehicle on server and client; use outputs (OutputBrake, OutputGas, etc.) to apply forces/torques to wheels/vehicle - **UpdateVehicle()** called on client and server*

*From &lt;<https://udn.epicgames.com/Three/NetworkingOverview.html#Physics>>*
