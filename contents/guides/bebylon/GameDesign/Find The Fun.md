<!-- markdownlint-disable -->

# P0: DELETE THE NAKED BABY
---

# Reaction Engine
  - ProcessOngoingEvents:
        - TODO:IKRIMA:REACTIONENGINE


      TODO:IKRIMA:REACTIONENGINE
        - Add async loading code


      TODO:IKRIMA:REACTIONENGINE:
        - Add TimeDelayDelegate for visuals to handle duration events
        -
  - TODO:IKRIMA:REACTIONENGINE
    - Taunting
      - Taunting charge
      - Taunting Half bar
      - Taunting Full Bar
        - Band Drum Beating visually frantically and drum beat tension
        - Whiff several times => play sad trombone
      - Madden Tag


---
# Reaction Engine


## Overview PseudoCode for how to create, configure, and trigger reaction events


  ### Configuration


  //---------
  // Config Params
  struct FBBCommonParms {}
  {
    bool bIsSet;
    float Duration;
  }
  struct FBBDisplayUXTextParms : FBBCommonParms {}
  struct FBBJumboTronParms {...}
  ... for each type of Parms
  //---------


  //---------
  // Reaction Datatable/DataAsset (need dataasset for async loading of stuff)
  USTRUCT(BlueprintType)
  struct FBBReactionEventParms : public FTableRowBase {


    FGameplayTag ReactionEventName;
    FBBDisplayUXTextParms DisplayUXTextParms;
    FBBJumboTronParms JumboTronParms;
  }


  UBBReactionEventConfigDataAsset : UBBSecondaryAssetCollection
  {
    UPROPERTY()
    UDataTable* ReactionEventCfgDataTable;
  }
  //---------


  //---------
  // Configuration In the UI:
  Creating a UBBReactionEventConfigDataAsset
    Set it's ReactionEventCfgDataTable property to a new DT_ReactionEventCfgDataTable


  Configure the DataTable by adding new rows to it.
  //---------


  ### Triggering an event


  GameplayLogic:
  ReactionEngine.TriggerReactionEvent((GameplayTag)ReactionEvent.LifeLost)


  ### Implementing processing an event


  ReacitonEngine::Process(InReactionEvent)
  {
    if (ReactionEventDataTable->Contains(InReactionEvent)) {
      FBBReactionEventParms aggregateParms = ReactionEventDataTable.Get(InReactionEvent)


      if (aggregateParms.DisplayUXParms.bIsSet):
        {
          // Logic for setting displayUI
          BP_MasterConsole::SetText(DisplayUXParms.Text);
          ...
        }


      if (aggregateParms.JumboTronParms.bIsSet):
        {
          // Logic for setting jumbotron
          ...
        }


      ....
    }
  }



## Feature Design Brainstorm


  ### Design Questions


    - Question: How to specify the events?
      - Answer: Use DataTables


    - Question: How to handle stacking/priorities?
      - Answer: Not sure about prioritization policy but we can add it in one place where everything is triggered (ReactionEngine::ProcessPendingEvent)


    - Question: One-off vs on-going events?
      - Answer: Use same our statbuff's tagging mechanism (while tag is in tagset, keep ticking the tag)


    - Question: How to handle Stage Specific Reactions?
      - Answer: Different datatables for each Stage (if needbe); also, can use hierarchical event tagging for specialization of specific events
        - We're not going to fire off stage specific reaction events but stages themselves can specialize how they handle specific events
        - Non-goal: Arena activations/stage specific game logic is not handled as part of this Reaction Engine section
        - Ex: Milk Maiden hands in air when going into beastmode?


  ### Brainstorm of possible features


BaseParms:
  - Duration


Types of "Actions/Events" we may potentially want to do:
- Display UX Text (can start off by copypasting sketch)
  - Parms:
    - Text
    - Image?
    - Widget?
  - Desc:
    - BP_MasterConsoleUI handles it
    - VR
      - In-world
      - HUD text
    - Non-VR
      - In-world
      - HUD text
- Theatrics: Audience (can start off by copypasting sketch)
  - Parms:
    - Audio Assets
    - Animation Assets
    - Audience Rig Controls
    - Band Rig Controls
  - Desc:
    - Play Announcer stinger
    - Play Audience stinger
    - Play Audience Animation
    - Play Band Animation


- Theatrics: Jumbotron
  - Parms:
    - Selfie Cfg (TargetPOI/etc)
    - Potentially Future: Text
    - Potentially Future: JumboTronDisplayType (Text/selfie/flipbook)
    - Potentially Future: Flipbook/video asset
  - Desc:
    - Display some text
    - Display Selfies
    - Display animated flipbook/"video"


- Theatrics: Lighting Donut
  - Parms:
    - Lighting Donut Rig Controls
  - Desc
    - Change rig controls (should be a struct)


- Theatrics: Arena Ring
  - Parms:
    - Material Data
  - Desc
    - Change Stadium Ring/Ground SpotLights


- Theatrics: Lighting
  - Parms:
    - Lighting Ambiance Controls
  - Desc
    - Change Lighting/Ambiance



//Everything below here doesn't seem we need to stub out now
- Theatrics: BG Music
  - Parms:
    - Audio Assets
    - Tempo? Audio settings?
  - Desc:
    - Change Background music
    - Probably only with events that are not one-off
    - Either tempo (Ex: When low on life or near end of match timeout, play )
- Targetting/Highlighting/Selection Outlines
  - Parms:
    - Target
    - Reason (or what type of outline)


  ### Implementation PseudoCode


  - ReactionEngine::EnqueueReactionEvent(GameplayTag):  Function To trigger the event
    - Add the ReactionEvent Params to a pendingEventsArray
  - On Tick:
    - ProcessPendingEvents: Fire them (aka create them/fire them off)
      - Foreach reactionEventTag in the pendingEventsArray: Trigger the specific action
        - ReactionEventCfg.DisplayUXTextMap[reactionEventTag]:
          - Do DisplayUX Functionality
        - ReactionEventCfg.TheatricsEventAudienceMap[reactionEventTag]:
          - Do TheatricsEventAudienceMap functionality

## Actual Events To Greybox


- Life Lost
  - DisplayUX
  - Theatrics:Audience (Cheering/booing + announcer)
- Beast Mode
  - DisplayUX
  - Theatrics:Audience
  - Theatrics:Jumbotron
  - Theatrics:LightingDonut
  - Theatrics:StadiumRing
  - Theatrics:Lighting
- Special
  - Whiff
    - DisplayUX
    - Theatrics:Audience (booing)
    - Theatrics:Jumbotron
- Ragdoll
  - Launch
    - DisplayUX (in-world)
    - Theatrics:Audience ("oooh")
    - Theatrics:LightingDonut
    - Theatrics:StadiumRing
  - Landing
    - DisplayUX
    - Theatrics:Audience ("oooh")
    - Theatrics:LightingDonut
    - Theatrics:StadiumRing
    - Theatrics:Lighting
  - Whiff
    - DisplayUX (in-world)
    - Theatrics:Audience (play sadtrombone)
- Score/Likes/Followers/Money
  - DisplayUX (in-world & text + image asset)





---
# Hansoft

## End Desired Questions to answer:
- What is everyone working on?
- Verify someone is working on right stuff
- Track what's is on someone's plate
- Track highlevel overview from
  - milestone granularity
  - larger time window
  - feature set

## Open Questions
- Where do Bugs Fit in Hansoft?
  - Tech Debt bugs
  - Bugs that come up
  - Blocking bugs on Feature development
- Where do general features fit?
- Where do playtesting go?

Add autotarget
  - Use POI to query for object locations

## Definitions:

### Design Prototyping
1. Backlog
2. Pseudocode Scaffolding
3. UE4 Scaffolding
4. Greyboxing
5. Done

### Dev Feature
1. Backlog
2. In Progress
3. Code Complete
4. Network DefinitionsFeature Complete

### Bebylon Production Assets
1. Backlog
2. Concepting
3. Production
4. Polish
5. Delivery

### Dev feature infra???
1. ????

---

# FINDING FUN MILESTONE DETAILS


# DELIVERABLE'S [SEPT]

- Networked over LAN (with dedicated server)
- Game is fun Play (Single level (Hook the Player)
- Standalone playable from start to finish


# Goals
- Find the fun
- Standalone end to end working game (Steve/Mo can download the build and play it)

# NonGoals [Sept]
- Multiple Levels
- Specials/Cinematics
- Leveling Up/Character progression
- Minigames
- More than two characters
- Awards
- Customization

# Game Feel/Find the Fun

- UI Visuals need better readability to
  - Basic attacks
  - Jumping
  - Landing
  - Dash
  - Sound FX for car

- Theatrics
  - Announcer Stings
  - Audience Stings
  - Jumbotron
  - Visual text
  - Selfies
  - Reaction Model
    - Detect combos
    - Detect punches
    - Detect other things
- Ragdolling
  - Implement Visuals for ragdolling impact
  - SFX for ragdoll blast
  - Implement fx for ragdoll



# Combat Exploration
- Add Grabbing
- Moveset reduction
- Ragdolling
  - Taunt Attacks
  - Ragdoll Canon
- Ability System

# Level Activations
- Stadium root movement as game play
  - Implement hex grid tiling
  - Implement sequencer procanims to move around
  - Implement rollforth/rollback guards
  - Visuals: Create hex grid tiles
  - Visuals: Create different arena zones
  - Visuals: Create sequences
- Arena Changes (Oil slick)
  - Implement Level Activation Item arch
    - Create data asset archetype

# Items
- Throwables (Bomb)
  - Polish grabbing/throwing
    - Animation
    - Polish timings
- Status Buffs
  - Implement Status Buff Feature
    - Allow rollback/rollforth
    - Handle stacking/unstacking
  - Implement Damage Effect type
- Interactive Stat Buffs (Ball & Chain/Ragzones)
  - Implement cinematic stat buffs
  - Handle rollback/rollforth
  - Handle other items/moves not being able to interrupt stat buff
  - Handle transitioning across level zones and/or specials
  - Implement Damage Effect type

# Networking

- Networking (2m: ikrimae) Playable over LAN
  - General Combat networking
      - Rollback of ...?
      - Rollforth of ...?
      - Simplify Networking
          - Undo being able to predict multiple gameticks in one frame
          -Change networking to assume client authoratative
          -Change networking to use not deterministic rollback/rollforth
      - Debugging tooling
          - Transaction log view of rollback/rollforth
          - UI for transaction log
          - Instrumenting code to save to transaction log (finish places where it wasnt placed)
  - Dedicated server
      - Get Dedicated Server Compiling
          - 1.0d:   Fix blueprints that are assuming listen server
          - 0.5d: Update jenkins to build the dedicated server
          - 0.5d: Fix code issues that may come up with dedicated server not compiling
          - 0.5d Cooking
              -Fix blueprints that reference non-dedicated server modules/assets
      - Dedicated server networking
          - Movement networked
          - Combat attacks networks
          - Get items networked
      - Dedicated server networking pt2
          - Get specials networked
          - Ragdollin
          - Physics based effects
          - Transitions
  - Listen server:
      - Get it networked as well (maintenance)
  - ~~Primitive Matchmaking~~
      - ~~Query LAN for matches~~
      - ~~Display LAN games~~

##
# Standalone Build

- Update Menu flow for Playing game:
  - Play game
      - Play local multiplayer
      - Play over LAN
          - Start Game
          - Join Game
      - Use the character selected in UI for playing
  - Pick Character
- Auto-launch dedicated server on client machine
  - Close dedicated server instance on match end
  - Add Lobby support (code side)
- ~~Gracefully handle error conditions:~~
  - ~~Handle server disconnect~~
    - ~~During joining~~
    - ~~Matchmaking~~
    - ~~Waiting to connect (add a timeout)~~
  - ~~Handle p1/p2 disconnect~~
    - ~~During joining~~
    - ~~Matchmaking~~
    - ~~Waiting to connect (add a timeout)~~

---