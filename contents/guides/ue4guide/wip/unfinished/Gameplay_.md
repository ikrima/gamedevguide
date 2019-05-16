Gameplay:

3 different controller rotations:

-   Player Controller Rotation: The aim rotation (e.g. where you are targeting)

-   Camera rotation: Where the camera's pointing, can be different from PC b/c of 3rd person

-   Pawn Rotation: Can be different from PC or Camera. Pawn may not visually change rotation (e.g. missile turret aiming system where missile turret doesn't change rotation)

 

Camera responsibility chain from top to bottom:

 

PlayerCameraManager is class responsible for managing camera for a particular player

-   Generally won't need to update it

-   Responsible for computing final camera properties used by renderer & other systems

-   Can compute it directly or blend between different ones (e.g. linear blend from one cameractor to another)

-   Primary external responsibility is Get\*() functions (e.g. GetCameraViewPoint)

-   Can apply effects such as camera animations, shakes, post-process effects, dirt on lens

-   Maintains ViewTarget which encapsulates minimal camera info (e.g. primary actor associated with camera, player controller, perspective, fov, etc)

  

ViewTarget is encapsulates data responsible for the camera viewpoint

-   Tracks primary actor associated with camera, player state, player controller

-   Also tracks camera properties such as fov, clip planes, etc

 

Actor/PlayerController

-   CalcCamera function returns first CameraComponent if it exists && bFindCameraComponentWhenViewTarget == true

-   If not, returns the actor's view rotation & position

-   Pawns: bTakeCameraControlWhenPossessed allows them to auto overtake ViewTarget when possessed

 

You can control when an actor ticks:

- Each actor has a ETickingGroup that can define when it will tick

  UENUM(BlueprintType)  
  enum ETickingGroup  
  {  
          /\*\* Any item that needs to be executed before physics simulation starts. \*/  
          TG\_PrePhysics UMETA(DisplayName="Pre Physics"),  

          /\*\* Special tick group that starts physics simulation. \*/                                                          
          TG\_StartPhysics UMETA(Hidden, DisplayName="Start Physics"),  

          /\*\* Any item that can be run in parallel with our physics simulation work. \*/  
          TG\_DuringPhysics UMETA(DisplayName="During Physics"),  

          /\*\* Special tick group that ends physics simulation. \*/          TG\_EndPhysics UMETA(Hidden, DisplayName="End Physics"),  

          /\*\* Any item that needs physics to be complete before being executed. \*/  
          TG\_PreCloth UMETA(Hidden, DisplayName="Pre Cloth"),  

          /\*\* Any item that needs to be updated after rigid body simulation is done, but before cloth is simulation is done. \*/  
          TG\_StartCloth UMETA(Hidden, DisplayName = "Start Cloth"),  

          /\*\* Any item that needs rigid body and cloth simulation to be complete before being executed. \*/  
          TG\_PostPhysics UMETA(DisplayName="Post Physics"),  

          /\*\* Any item that needs the update work to be done before being ticked. \*/  
          TG\_PostUpdateWork UMETA(DisplayName="Post Update Work"),  

          /\*\* Special tick group that ends cloth simulation. \*/  
          TG\_EndCloth UMETA(Hidden, DisplayName="End Cloth"),  

          /\*\* Special tick group that is not actually a tick group. After every tick group this is repeatedly re-run until there are no more newly spawned items to run. \*/  
          TG\_NewlySpawned UMETA(Hidden, DisplayName="Newly Spawned"),  

          TG\_MAX,  
  };

- You can also specify dependencies based on other components by calling AddTickPrerequisiteComponent() or AddTickPrerequisiteActor()

