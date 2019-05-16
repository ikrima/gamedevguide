![InputProcessingArchitectureDiagram_Flow](C:\devguide\conversion\FINISHED\assets\InputProcessingArchitectureDiagram_Flow.jpg)

<https://docs.unrealengine.com/latest/INT/Gameplay/Input/index.html>

Input Processing

UPlayerInput:

- PlayerInput Uobject exists within PlayerController class that manages player input state

- Handles mouse smoothing, custom debug , gesture recognition, etc

- Spawned only on clients

- Contains input **\*mappings\*** e.g. FInputActionKeyMapping & FInputAxisKeyMapping map friendly names to Keys e.g. 'W' to MoveForward

- **As an exception,** contains debug function **\*bindings\*** that can be executed through console.

- Bindings to actual functions (e.g. what happens when MoveForward is pressed) should be placed in UInputComponent

- InputCoreTypes.cpp contains the hardware button definition mappings to keys

UInputComponent

- Contains all the input delegate \***bindings\*** for an Actor

- Links AxisMappings/ActionMappings to game actions/functions

Input Processing Loop:

1.  FEngineLoop::Tick() process input

- FPlatformMisc::PumpMessages() processes mouse & keyboard while SlateApp.PollGameDeviceState() process gamepad

- The Windows MsgPump happens during the main engine loop (at least on Windows, controlled by GPumpingMessagesOutsideOfMainLoop)

- Gamepad input always happens inside the main loop

- Actual Input keys are recorded in a side band channel through WindowsMsgPmp-&gt;SceneViewport-&gt;GameViewport

  - Calls into PlayerController::InputKey() to give PlayerController a chance to add logic around input capture (e.g. execute custom debug binds)

    - We use PlayerController::InputKey() to execute our custom debug input binds before normal engine Input processing

    - PlayerInput::InputKey() - record the key events in PlayerInput::KeyStateMap. This is where you can add smoothing or custom input history

>

- Input is polled in FEngineLoop.Tick() by calling which is before GEngine-&gt;Tick()

2. World::Tick()=&gt; Process Input & Fire Bindings on components (during PlayerController's tick group, default PrePhysics

- PlayerController::TickActor() calls PlayerController::PlayerTick() **_only on local PlayerController that has PlayerInput object so not servers. Won't be called on servers for nonlocal PCs_**

- PlayerController::PlayerTick()

- PlayerController::TickPlayerInput()

- PlayerInput::Tick()

- PlayerController::ProcessPlayerInput

  - PlayerController::BuildInputStack() =&gt; Adds InputComponents in a stack that defines priority of what components get access to inputs first. Order from lowest priority to highest:

    - ControlledPawn (if input enabled)

    - any components inside ControlledPawn with InputComponent

    - LevelScriptActors with InputEnabled

    - PlayerController

    - All other Actors that have called Aactor::EnableInput(PlayerController) where PlayerController is this player controller

  - PlayerInput::ProcessInputStack() - Process the frame input's events with Input stack from BuildInputStack

    - virtual PlayerController::PreProcessInput() - can be overridden for work before firing input delegates

    - PlayerInput::ProcessInputStack() =&gt; Processes all the input delegate binds

    - virtual PlayerController::PostProcessInput() - can be overridden for work post firing input delegates

>

3. Tick Player Controller Actor
