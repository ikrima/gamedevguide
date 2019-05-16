========================================================================

Here's how player movement prediction, replication and correction works in network games:

Every tick, the TickComponent() function is called. It figures out the acceleration and rotation change for the frame,

and then calls PerformMovement() (for locally controlled Characters), or ReplicateMoveToServer() (if it's a network client).

- Root Motion is calculated inside of PerformMovement()

  if (CharacterMesh-&gt;ShouldTickPose())

  {

  // Keep track of if we're playing root motion, just in case the root motion montage ends this frame.

  const bool bWasPlayingRootMotion = CharacterOwner-&gt;IsPlayingRootMotion();

​ CharacterMesh-&gt;TickPose(DeltaTime, true);

ReplicateMoveToServer() saves the move (in the PendingMove list), calls PerformMovement(), and then replicates the move

to the server by calling the replicated function ServerMove() - passing the movement parameters, the client's

resultant position, and a timestamp.

ServerMove() is executed on the server. It decodes the movement parameters and causes the appropriate movement

to occur. It then looks at the resulting position an if enough time has passed since the last response, or the

position error is significant enough, the server calls ClientAdjustPosition(), a replicated function.

ClientAdjustPosition() is executed on the client. The client sets its position to the servers version of position,

and sets the bUpdatePosition flag to true.

When TickComponent() is called on the client again, if bUpdatePosition is true, the client will call

ClientUpdatePosition() before calling PerformMovement(). ClientUpdatePosition() replays all the moves in the pending

move list which occurred after the timestamp of the move the server was adjusting.

\*/

<table><thead><tr class="header"><th>UNetDriver::ServerReplicateActors</th><th><p><a href="https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UNetDriver/ServerReplicateActors/index.html">https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UNetDriver/ServerReplicateActors/index.html</a></p><p>Also look at PlayerController::SendClientAdjustment &amp; INetworkPredictionInterface</p></th></tr></thead><tbody><tr class="odd"><td>Authoritative Networked Character Movement</td><td><p>Custom Character Movement:</p><ul><li><blockquote><p><a href="https://docs.unrealengine.com/en-us/Gameplay/Networking/CharacterMovementComponent">https://docs.unrealengine.com/en-us/Gameplay/Networking/CharacterMovementComponent</a></p></blockquote></li></ul><p>Concrete example of networked custom character movement</p><ul><li><blockquote><p><a href="https://wiki.unrealengine.com/Authoritative_Networked_Character_Movement#Boost_Dodge">https://wiki.unrealengine.com/Authoritative_Networked_Character_Movement#Boost_Dodge</a></p></blockquote></li><li><blockquote><p><a href="http://error454.com/2015/03/20/ue4/movement/replication">http://error454.com/2015/03/20/ue4/movement/replication</a></p></blockquote></li><li><blockquote><p><a href="https://github.com/error454/CharacterMovementReplication-UE4">https://github.com/error454/CharacterMovementReplication-UE4</a></p></blockquote></li></ul></td></tr><tr class="even"><td>Rollback Networking in INVERSUS</td><td><a href="http://blog.hypersect.com/rollback-networking-in-inversus/">http://blog.hypersect.com/rollback-networking-in-inversus/</a></td></tr></tbody></table>

**Details:**

- PerformMovement():

  - Does the actual location update in characters

  - StartNewPhysics(float deltaTime, int32 Iterations): Actual physics application

    - MoveAlongFloor() - does walking movement on the ground

- ServerMove()

  - Wwhat authoratatively does the move:

  - MoveAutonomous()
