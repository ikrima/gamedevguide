---
sortIndex: 1
sidebar: ue4guide
---

![](../../assets/AbilitySystem-Overview.png)

# Overview

Excellent in-depth overview with an example project: https://github.com/tranek/GASDocumentation

####  FGameplayAttributeData /UAttributeSet:

- Define what can be changed

| Function Name                             | **Purpose**                                                                                                                                                                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PreAttributeChange PreAttributeBaseChange | These functions are called just before modifications to an Attribute. They are intended to enforce rules on the Attribute's value, such as "Health must be between 0 and MaxHealth", and should not trigger in-game reactions to Attribute changes.               |
| PreGameplayEffectExecute                  | Just before modifying an Attribute's value, this function can reject or alter the proposed modification.                                                                                                                                                          |
| PostGameplayEffectExecute                 | Immediately after modifying an Attribute's value, this function can react to the change. This often includes clamping the final value of the Attribute, or triggering an in-game reaction to the new value, like dying when the "health" Attribute falls to zero. |

*Reference From <https://docs.unrealengine.com/en-us/Gameplay/GameplayAbilitySystem/GameplayAttributesAndGameplayEffects>*

#### UGameplayEffect:

- Describe way to change attributes

  - Direct change: +5 to health

  - Temporary Buffs: +10 to movement

  - Over Time: +5 mana over 1 second

- Data only

- Properties:

  - **Duration**:

  - **Modifiers/Execution:** How effect interacts with attributes (increase armor by +5% but needs these tags)

    - **UGameplayEffectExecutionCalculation**: Executions are for applying more advanced math to the buffs/debuffs beyond modifiers

  - **Application Requirements**: Set of tags required for Effect

    - **UGameplayEffectCustomApplicationRequirement**: For more complex rules\\

  - **Granted Abilities**: Effecsts can grant abilities, not just tags. Useful to be used with executions: Ex: Actor gets bomb Gameplay Effect and actor has tag: CoveredInOil => grant OnFireAoT

  - **Stacking**

  - **Gameplay Cue Display:** Manage cosmetic effects

    - OnActive, While Active, Removed, Executed

    - **Gameplay Cue Manager** executes Gameplay Cues.

    - **IGameplayCueInterface**: Actors can respond to Gameplay Cues by implementing this and having a function whose name matches the Gameplay Cue's tag.

    - **Standalone Gameplay Cue Notify Blueprints:** can also respond to Gameplay Cues.

#### Gameplay Ability

*<https://docs.unrealengine.com/en-us/Gameplay/GameplayAbilitySystem/GameplayAbility>*

- Defines what an in-game ability does, what (if anything) it costs to use, when or under what conditions it can be used, and so on.

- Because Gameplay Abilities are capable of existing as instanced objects running asynchronously, you can run specialized, multi-stage tasks involving character animation, particle and sound effects, and even branching based on player input or character interactions that occur during execution.

- Gameplay Abilities can replicate themselves across the network, run on client or server machines (including client-side prediction support), and even sync variables and make Remote Procedure Calls (RPCs).

- **FGameplayEventData:**

  - Gameplay tags with optional payload data

  - Can be used to communicate between different parts of the ability system. ARPG uses them to pass information between montages and abilities.

  - Can be passed around to trigger Gameplay Abilities directly, sending a data payload for context, without going through the normal channels.

#### GameplayCue:

- Gameplay Cues are basically events. They are events with a Target, Tag, Type (OnActive/WhileActive/OnExecute/OnRemoved), and parameters (instigator, hit location, etc). Those events can come from Gameplay Effects, Abilities directly, or anywhere really. On Paragon our projectile code emits gameplay cues on their own for example.

*Reference From <https://udn.unrealengine.com/questions/319582/questions-about-gameplayability-system.html>*

# Reference Links

*These might be outdated*

| Description         | Link                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| UDN Answer Overview | <https://udn.unrealengine.com/questions/319582/questions-about-gameplayability-system.html>             |
| Overview #2         | <https://udn.unrealengine.com/questions/315010/view.html>                                               |
| Community Wiki      | <https://wiki.unrealengine.com/GameplayAbilities_and_You>                                               |
| Target Data         | <https://udn.unrealengine.com/questions/273352/abilitysystem-targeting-how-to-fetch-custom-target.html> |
| Sample Repo         | <https://github.com/daveratti/GameplayAbilitiesSample/tree/release/GAS>                                 |
