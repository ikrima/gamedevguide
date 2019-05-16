_Physics simulation is run on both the client and the server. Updates are sent to the client from the server. The following struct is used to describe the physical state of a rigid body, and is replicated (as defined in **Actor**):_

struct RigidBodyState  
{  
var vector Position;  
var Quat Quaternion;  
var vector LinVel; // RBSTATE_LINVELSCALE times actual (precision reasons)  
var vector AngVel; // RBSTATE_ANGVELSCALE times actual (precision reasons)  
var int bNewData;  
};

_A struct used so that all properties change at the same time_. The vectors are compressed to integer resolution, so that they are scaled before sending. Quats are compressed to only send 3 values; the 4th value is inferred from the other 3.

_For physics replication, there are two types of correction:_

- _Small corrections and object moving: 20% position adjust, 80% additional velocity to target_

- _Large correction or object stopped: 100% position adjust_

Simulation

The following scenarios describe physics simulation:

- **\*ROLE_SimulatedProxy** Actor simulation\*

  - _The client continuously updates the simulated actor position based on the received position and velocity._

  - _If **bUpdateSimulatedPosition** is true, authoritative position updates are continuously sent from the server to the client (otherwise, no position updates are sent after the initial replication of the Actor)._

- _Pawns on other clients_

  - _Unlike other Actors, simulated Pawns do not execute normal physics functions on the client. This means that physics events, like the **Landed()** event, are never called for pawns on non-owning clients._

  - _The physics mode of the Pawn is inferred from its position, and the **bSimulateGravity** flag, and its predicted position is updated based on the replicated velocity._

    - _The **bSimGravityDisabled** flag is set, temporarily turning off gravity simulation, if Pawn didn’t fit at the replicated position, and is in danger of falling through the world on the client._

- **\*PHYS_RigidBody** Actors (Vehicles, KActors, etc.)\*

  - _Both client and server simulate the objects, but the server sends authoritative updates to the client periodically (when the object is awake). The client then moves the object to match the server version_

    - _Attempts to do so smoothly, by altering velocity to bring about convergence in positions rather than snapping the position if the error is below an acceptable threshold_

  - _Use **RigidBodyState** struct for atomic replication, when all properties must be received in synch._

_For Ragdoll physics, only the hip location is replicated. It is often possible to tear off completely and not replicate at all._

_For Vehicles (**PHYS_RigidBody** Actors), there is the following network flow:_

1.  _Press key on client_

2.  _Send inputs (throttle, sterring, rise) to server - replicated function **ServerDrive** called_

3.  _Generate ouptut (OutputBrake, OutputGas, etc.); pack into replicated structs that can be sent to the client - **ProcessCarInput()** called on server_

4.  _Update vehicle on server and client; use outputs (OutputBrake, OutputGas, etc.) to apply forces/torques to wheels/vehicle - **UpdateVehicle()** called on client and server_

_From &lt;<https://udn.epicgames.com/Three/NetworkingOverview.html#Physics>&gt;_
