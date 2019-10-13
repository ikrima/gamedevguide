---
sortIndex: 24
---

<https://docs.unrealengine.com/latest/INT/Programming/Gameplay/Framework/index.html>

<https://docs.unrealengine.com/latest/INT/Programming/Gameplay/Framework/QuickReference/index.html>

Engine conceptually divided into 3 Different categories:

1. Gametype, which creates

1. Player, which creates

1. Interface

Using hypothetical example of a game where rabbit races snail,

- **GameMode** defines game rules and spawns players (e.g. animal that crosses finish line first wins)

- **PlayerController** sets up player (human or AI)

  - **Controllers** sets rules for Pawn behavior

  - Possesses **Pawn,** physical representation of player

    - **Characters** are a special subclass of Pawns with built-in functionality for running & jumping

    - Can extend Pawn class for special behavior (e.g. Snail Pawn)

  - **PlayerCameraManager** defines the camera view for the player controller

# Camera

**Camera Component** defines all camera properties. **CameraActor** is just an actor so you can drop camera into scene

- Can visualize Camera Frustum

PlayerCameraManager controls changing cameras.

- Queries **ViewTarget** for determining camera viewport

- Generally don't need to subclass it

- If it is necessary to subclass the PlayerCameraManager, and you are doing so with Blueprints instead of C++, the BlueprintUpdateCamera function exists to allow custom camera implementations. When using this function, return *true* to use the returned values, or return *false* to ignore them.

*Reference From: <https://docs.unrealengine.com/latest/INT/Programming/Gameplay/Framework/Camera/index.html>*

## ViewTarget

The ViewTarget struct, defined in PlayerCameraManager, is responsible for providing the PlayerCameraManager with an ideal Point of View (POV). ViewTarget contains information on the target Actor, the Controller of the target Actor (for non-locally controlled Pawns), and the PlayerState, which is used to follow the same player through Pawn transitions and other changes while spectating. The camera information passed to PlayerCameraManager through the POV property is in the form of a FMinimalViewInfo struct. This struct contains the basic camera information from a CameraComponent, including the location, rotation, projection mode (Perspective or Orthographic), FOV, orthographic width, aspect ratio, and post process effects. Providing the PlayerCameraManager with access to these values allows the PlayerCameraManager to blend between two camera modes during its camera management.

*Reference From: <https://docs.unrealengine.com/latest/INT/Programming/Gameplay/Framework/Camera/index.html>*

## Camera Responsibility Chain

Game-specific camera behavior can be provided at any point along the camera "responsibility chain", which flows from top to bottom through the following classes before passing to ALocalPlayer and ending with rendering, scene view, and other related systems:

## CameraComponent

A CameraComponent will provide information about the camera's properties if the ViewTarget is a CameraActor or an Actor that contains a CameraComponent and has bFindCameraComponentWhenViewTarget set to true. A related property that can be set for any Pawn isbTakeCameraControlWhenPossessed, where the Pawn will automatically become the ViewTarget upon possession by the PlayerController.

## Actor or PlayerController

Both PlayerControllers and Actors contain a CalcCamera function. An Actor's CalcCamera function returns the camera view of the first CameraComponent in the Actor, if bFindCameraComponentWhenViewTarget is true and a CameraComponent is present.

Otherwise, it gets the Actor's location and rotation. In PlayerController, the CalcCamera function behaves similarly to this second case, returning the location of the possessed Pawn if it exists, and the control rotation of the PlayerController.

## PlayerCameraManager

The UpdateViewTarget function in PlayerCameraManager queries the ViewTarget and returns that ViewTarget's Point Of View. This function is also what calls BlueprintUpdateCamera if you have subclassed APlayerCameraManager and are not looking through a CameraComponent.

<https://docs.unrealengine.com/latest/INT/Programming/Gameplay/Framework/Camera/index.html>

# Engine Game Flow

![GameFlowChart](/assets/GameFlowChart.png)

<https://docs.unrealengine.com/latest/INT/Gameplay/Framework/GameFlow/index.html>

# Fast Architectural Summary

![Fast_Architectural_Summary](/assets/Fast_Architectural_Summary.png)

A game is made up of a GameMode and GameState. Human players joining the game are associated with PlayerControllers. These PlayerControllers allow players to possess pawns in the game so they can have physical representations in the level. PlayerControllers also give players input controls, a heads-up display, or HUD, and a PlayerCameraManager for handling camera views.

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/index.html>*

UObject: Base class for all UE4 objects

- Actor: Base spawnable class

- Pawns:
  - Can be possessed by Controller.
  - Pawn not assumed to be humanoid

- weee
  - ooo
    - kkk

- Character:
  - Humanoid specialized Pawn
  - CapsuleComponent for collision detection
  - CharacterMovement for movement \* Replicates movement smoothly across network

- Controller: Actors that possesses/control pawns

  - PlayerController: Interface between Pawn & human

  - AI: Computer driven controller

- HUD: Class responsible for HUD

- CameraActor: Wraps Camera Component so you can drop it into the scene

- GameMode: Defines rules of the game

  - GameState: State of the game (# of players connected, chess piece locations in game, etc)

  - PlayerState: State of each player (name of player, whether they're carrying flag, etc)
