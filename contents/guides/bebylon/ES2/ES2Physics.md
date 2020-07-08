<!-- markdownlint-disable -->



1. Build Physics World
   1. Copy Transform Data into Collider Transform Data
   2. Create overlapping body pairs based on collision sweep
2. Physics Simulate
   1. Raycast/Sweep
   2. Get contact points
   3. Generated collision events
   4. Depenetrate/Calculate final position
3. Export Physics World


Physics Simulation Data

In:
- Transform
- RequestedTransform
- ColliderShapeComp
  - Shape
  - Filtering
  - Adv
  - RaiseCollisionEventTypes: Overlap|Block
- PhysicsBody
  - Type: Kinematic|Static|Dynamic
  - Velocity
  - Mass
  - Inertia
  - LastPosition
  - CurrentPosition

Out:
- PhysicsDynamics
- Velocity
- ColliderEvents
  - Collisions
  - Triggers



Movement:
