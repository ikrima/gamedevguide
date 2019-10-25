---
sortIndex: 11
---

# Overview

Here's how player movement prediction, replication and correction works in network games:

Every tick, the TickComponent() function is called. It figures out the acceleration and rotation change for the frame, and then calls PerformMovement() (for locally controlled Characters), or ReplicateMoveToServer() (if it's a network client).

**PerformMovement():** Root Motion is calculated inside here

  ```cpp
  if (CharacterMesh->ShouldTickPose())
    {
      // Keep track of if we're playing root motion, just in case the root motion montage ends this frame.
      const bool bWasPlayingRootMotion = CharacterOwner->IsPlayingRootMotion();

      CharacterMesh->TickPose(DeltaTime, true);
      ...
  ```

**ReplicateMoveToServer()** saves the move (in the PendingMove list), calls PerformMovement(), and then replicates the move to the server by calling the replicated function ServerMove() - passing the movement parameters, the client's resultant position, and a timestamp.

**ServerMove()** is executed on the server. It decodes the movement parameters and causes the appropriate movement to occur. It then looks at the resulting position an if enough time has passed since the last response, or the position error is significant enough, the server calls ClientAdjustPosition(), a replicated function.

**ClientAdjustPosition()** is executed on the client. The client sets its position to the servers version of position, and sets the bUpdatePosition flag to true.

When **TickComponent()** is called on the client again, if bUpdatePosition is true, the client will call ClientUpdatePosition() before calling PerformMovement(). ClientUpdatePosition() replays all the moves in the pending move list which occurred after the timestamp of the move the server was adjusting.

| UNetDriver::ServerReplicateActors              | <https://docs.unrealengine.com/latest/INT/API/Runtime/Engine/Engine/UNetDriver/ServerReplicateActors/index.html>                                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                | Also look at PlayerController::SendClientAdjustment & INetworkPredictionInterface                                                                                                                                                                                                                                                                                            |
| **Authoritative Networked Character Movement** | **Custom Character Movement:** <https://docs.unrealengine.com/en-us/Gameplay/Networking/CharacterMovementComponent>                                                                                                                                                                                                                                                          |
|                                                | **Concrete example of networked custom character movement:**   1) <https://wiki.unrealengine.com/Authoritative_Networked_Character_Movement#Boost_Dodge>                             2) <http://error454.com/2015/03/20/ue4/movement/replication>                                                          3) <https://github.com/error454/CharacterMovementReplication-UE4> |
| **Rollback Networking in INVERSUS**            | <http://blog.hypersect.com/rollback-networking-in-inversus>                                                                                                                                                                                                                                                                                                                  |

# Details

- PerformMovement():
  - Does the actual location update in characters
  - StartNewPhysics(float deltaTime, int32 Iterations): Actual physics application
    - MoveAlongFloor() - does walking movement on the ground
- ServerMove()
  - What authoratatively does the move:
  - MoveAutonomous()
