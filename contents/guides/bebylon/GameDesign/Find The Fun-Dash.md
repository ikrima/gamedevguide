<!-- markdownlint-disable -->

# Dashing

1. Variant - Gas N dash aka Normal Dashing that depletes Meter
   1. Maybe skid out of control at end (esp. if you use it all the way)
   2. Supe variatn - KHZ blink
2. Dash Charge Attack
   1. Seems good for Bentley
      ![Kirby Dash](../assets/5uv8hjfy.bmp)
3. Dash + Block => Monkey Balls
4. Air Dash ?
5. Charge up into Dash Strike
6. Spin Charge
   ![Sanic Spin](../assets/9eghmjuz.bmp)

## Implement
- Gas N Dash
  - InputBind -> TryActivate Ability
    - Get Ability Graph Object
    - Call CanActivate?
      - Yes ?: EgoMeter > Cost && !Cooldown :> Activate Ability
        - Add Dash Ability Instance to Ability Component
        - On next tick, AbilitySystem will activate
          - Grant Tag: Ability.Type.Dash.GasNDash
          - Create Ability Instance
          - Create Ability Scratchpad context
      - No -> Noop
  - Dash Ability Graph
    - OnCanActivate
    - OnActivate
      - Play Seq Ability: Dash Startup
        - Seq Cfg:
          - Timing Control: One shot
        - Seq Def:
          - TaskTrack: Hitbox
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc) = 0 movement
          - TaskTrack: Add Game Effect - Cost = -10 Ego
      - Play Seq Ability: Dash Active
        - Seq Cfg:
          - Time Control: Loop
        - Seq Def: (sequence length is atomic dash unit)
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc)
          - TaskTrack: Branch - Input != pressed => { Ability.EndCause.Finished|Expired|Cancelled|Interrupted, Ability.Cause.Input.Released }
          - TaskTrack: Branch - Ego < 0 => { Ability.Exit, Ability.Cause.Expired }
          - TaskTrack: Hitbox Modification:
            - Configure Damage Game Effect
          - TaskTrack: Add Game Effect - Cost = -10 Ego per second
      - Play Seq Ability: Dash Recovery
        - Seq Cfg:
          - Time Control: One Shot
        - Seq Def:
          - TaskTrack: Add Game Effect - Cooldown
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc) = skidding

### Implements Adv

SequenceAbility
  Track: Ability
    Still Active:
      Gas'ed version: Button still pressed while ego is active
      Until Wall Hit
  Track: MovementComponentProcAnimator
    Set custom movement
    Reference to movement component
  Track: Active Hitboxes
    Animate Position (Relative)
    Set Active State (Invincible/etc)
    Set GameEffect On Hit
      Wild Knockback/Richochet
      Do Stun
      Damage

  Track: GameEffect
    Deplete Ego continuously

  Track: Visuals

TimePlayback:
  Startup
  Active
  Recovery

# Blocking

1. Shield Bubble
2. Weaken over time (smaller+visuals?)
3. Shatter once shield health is zero
4. Dash + Block => ??? could be an interesting thing (eg. for Bentley in Beast)

# Implements

- Shield Bubble
  - InputBind -> TryActivate Ability
    - Get Ability Graph Object
    - Call CanActivate?
      - Yes ?: Shield Health > 0 && !Cooldown :> Activate Ability
        - Add ShieldBubble Ability Instance to Ability Component
        - On next tick, AbilitySystem will activate
      - No -> Noop
  - ShieldBubble Ability Graph
    - OnCanActivate
    - OnActivate
      - Grant Tag: Ability.Type.Shield.Bubble
      - Play Seq Ability: ShieldBubble Startup
        - Seq Cfg:
          - Timing Control: One shot
        - Seq Def:
          - TaskTrack: Hitbox
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc) = 0 movement
          - TaskTrack: Add Game Effect - ShieldHealth = -10 Ego
      - Play Seq Ability: Dash Active
        - Seq Cfg:
          - Time Control: Loop
        - Seq Def: (sequence length is atomic dash unit)
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc)
          - TaskTrack: Branch - Input != pressed => { Ability.EndCause.Finished|Expired|Cancelled|Interrupted, Ability.Cause.Input.Released }
          - TaskTrack: Branch - Ego < 0 => { Ability.Exit, Ability.Cause.Expired }
          - TaskTrack: Hitbox Modification:
            - Configure Damage Game Effect
          - TaskTrack: Add Game Effect - Cost = -10 Ego per second
      - Play Seq Ability: Dash Recovery
        - Seq Cfg:
          - Time Control: One Shot
        - Seq Def:
          - TaskTrack: Add Game Effect - Cooldown
          - TaskTrack: Add Game Effect - Movement Modification (Speed,Friction,etc) = skidding

# Combo




====================================================================================




# Ability

## Ability Logic

- Branching
- Async Dependency logic (wait until)
- Prevent abilities (stun should cancel all abiltiies + prevent movement)

## Ability Tasks

### Control
- Activate/Commit/Cancel/End
	- CanActivateAbility()	- const function to see if ability is activatable. Callable by UI etc
	- TryActivateAbility()	- Attempts to activate the ability. Calls CanActivateAbility(). Input events can call this directly.
  	- Also handles instancing-per-execution logic and replication/prediction calls.
	- CallActivateAbility()	- Protected, non virtual function. Does some boilerplate 'pre activate' stuff, then calls ActivateAbility()
	- ActivateAbility()		- What the abilities *does*. This is what child classes want to override.	//
	- CommitAbility()			- Commits reources/cooldowns etc. ActivateAbility() must call this!
	- CancelAbility()			- Interrupts the ability (from an outside source).
	- EndAbility()			- The ability has ended. This is intended to be called by the ability to end itself.
- Time
  - Length
    - Explicit
    - Periodic
      - loop count
      - infinit loop
    - Indefinite
- Cost
  - Game Effect: Instant
- Cooldown
  - Game Effect: Instant
  - Map of GameTag + cooldown time + current time
- Ability
- Tag Query mechanism for Requirement Condition Logic
  - Cancel Abilities With Tag
  - Block Abilities With Tag
  - Activation Owned Tags
  - Activation Required Tags
  - Activation Blocked Tags
  - Target Required Tags
  - Target Blocked Tags

### Activation
ActivationCondition
  - Explicit ActivationBlocked condition (ie if not have any of these tags)

TickCondition/TerminationCondition

### Context
- Same as procedural sequence context
- Targeting
  - Use POI system

### Conditions
- Input
  - Just pressed
  - While pressed
  - Just released
- Velocity
- Custom

### Tasks
- ~~Create Entity/Spawn Visuals~~
- ~~Branching~~
  - ~~Decision: Branching controlled by ability graph~~
  - ~~Should be a block where it's active~~
- ~~Maybies~~
  - ~~Play Animation?~~
  - ~~Wait for Event/Action?~~
- ~~Custom~~
  - ~~Custom ScratchPad Object(InAbilityContext)~~
  - ~~TaskStart~~
  - ~~Tick~~
  - ~~End~~
  - ~~IsActive~~

### Misc
- Passive vs. Active
- If using Sequencer => need to be able to turn off visual tracks for dedicated server
- Grant/Revoke/Block abilities on other actors
- INterruptability
- Stacking
- Leveling up abilities
- Task Async
  - Task dependencies

====================================================================================

# Ability System
Ability => pure behavioral Logic
  Defined in an Ability Graph
    Using Ability Task building block nodes
  In a sense, they define a system

Ability/Ability Graph:
  - Orchestrates logic using async building block tasks
  - Only one task active at a time
  - Immutable
  - Can handle state capture/rollback

Ability Tasks:
  - Actions that can exist in ability graph
  - Ticks on Sim Tick only
  - Async
  - Can be orchestrated in a sequence for sequential time based logic
  - Can handle rollback/rollforth
  - Config Data
    - Static
    - Instanced
  - Run Time Data
    - Context
      - Captured (Actor,Target)
      - Computed (StartTime, EndTime)
    - Transient (should be zero)
      - Intermedaite temporary data (ideally none of this)
      - Output data


  - AbilityTask: Sequence Ability
    - Exit using enums

Game Effects:
  - Pure data that describes attribute modification (including granting abilities through modifying what tags are applied/removed)
  - Base Value, Min, Max