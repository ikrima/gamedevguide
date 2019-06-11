---
sortIndex: 2
---

# Overview

The ability system is a large, encompassing gameplay system that is shared between our internal game teams and remains a work-in-progress. It offers a lot of traditional RPG/attribute/skill functionality in a generic, yet powerful way.

**Ability System Component**
Core actor component of the system: pretty much everything using the system has one of these. Acts as manager for all the other pieces.

**GameplayTags**
Hierarchical tagging system. Used in many different areas of the system for writing designer driven rules.

**Attributes:**
Numeric (float) properties. Live in AttributeSets that are subobjects on the owning actor. ASC aggregates modifiers on attributes and pushes final value to the uproperty. Other places can reference attributes generically.

**GameplayEffects**
Modifies attributes and gameplay tags. Can be duration based (Buff/Debuff), instant (Damage/Heal), or periodic (Dots). ASC manages applying and handling lifespan of individual GameplayEffects. Defined as blueprint classes though they are not instanced and do not use event graphs or implement custom logic themselves.

**Abilities**
Implement  custom Gameplay Logic. System provides basic input binding, cost/cooldowns, instancing, and networking. Clients can predictively execute abilities. If instanced they are subobjects on the owning actor. We don't execute abilities on simulated proxies; side effects generically replicate in other ways.

**GameplayCues**
Cosmetic clientside events. Separates business logic from presentation logic. System handles replication automatically. Game can ultimately decide how/where events are handled. By default we support custom event handling on the target actor and standalone 'notify' handling.

**GameplayTasks**
Game-agnostic framework for handling gameplay-related latent tasks. It comes with dedicated K2 node that hides most of the setup/running complexity from blueprint users.

Tasks can be used in two modes. The basic mode supports simple operations like ticking and aborting. The advanced mode (not used by GameplayAbilities) supports priorities and arbitrary "resources" requirements (not allowing to run multiple actions requiring the same "resource" indicated by a simple integer ID).

# Ability System Summary

(A more in depth writeup that explains how the system works, though is not an exhaustive write up on how to use the system).

# Overview + How We Using it

The ability system is a large, encompassing gameplay system that is shared between our internal game teams and remains a work-in-progress. It offers a lot of traditional RPG/attribute/skill functionality in a generic, yet powerful way.

Fortnite uses every portion of the ability system for a significant part of its gameplay needs: every player skill/gadget, weapon attack, enemy AI attack, and every trap currently makes use of abilities, with potentially more applications planned in the future. The character classes as well as the HomeBase feature all make heavy usage of gameplay effects, and countless parts of the game use gameplay tags for run-time identification/gameplay.

This document offers a high-level overview of each of the core components that make up the ability system as a whole.

## Ability System Component

The Ability System Component (ASC) is the central piece of the GameplayAbility system. It decouples usage of the ability system from any particular actor class. Any actor that wants to use the system create an ASC which then acts as a manager for Attributes, GameplayEffects, and Abilities.

# Gameplay Tags

Gameplay tags are a hierarchical method of marking up assets or gameplay objects such that they can later be queried or matched against, allowing the creation of designer-driven gameplay without code support. As a simple example, a designer might mark a debuff as “StatusEffect.Poison.Crippling” to identify it as crippling poison. They can later implement an ability that removes all effects with “StatusEffect.Poison,” and effectively implement a poison antidote w/o any programmer intervention. Tags can be matched explicitly or via hierarchical parent.

# Attributes

Gameplay Attributes represent float values such as Health, MaxHealth, Armor, Damage, Mana, etc. Each game will define its own attributes in collections called AttributeSets.

Attributes in the end are simply float UProperties contained in UAttributeSets. FGameplayAttribute wraps the reference to the UProperty and provides a Details Customization for selecting attributes from a drop down (AttributeDetails.h/.cpp), allowing other pieces of the system to reference attributes generically.

AttributeSets are what hold the attribute properties. AttributeSets are able to define extra logical to react to changes in attribute (Kill player if health is < 0), enforce clamping (keep Health <= MaxHealth), etc.  The sets are instantiated as subobjects on the owning actor (the actor that owns the Ability System Component). The attribute properties themselves replicate via normal subobject replication.

Our approach so far has been the split up attributes into several sets. For example: HealthSet (anything that takes damage), CombatSet (anything that does damage), MovementSet (anything that moves), etc. That way, something like a tower would not have a MovementSet and would be able to ignore effects that modify movement related attributes.

In addition the to "final" uproperty value, the ASC may also store an FAggregator for each attribute. The aggregator is in charge of managing all ongoing modifications to the attribute along with a base value. Modifiers come from GameplayEffects which are explained more below. As the aggregator changes it calculates a final value for the attribute and pushes this to the actual float uproperty. Therefor, any modification of attributes happens through a GameplayEffect or through the ASC. We never write to the final uproperty attribute value directly in game code (attributes will always be const/read only when accessed by gamecode).

# GameplayEffects

At their most basic level, gameplay effects are assets allowing the run time modification of attributes and gameplay tags on the targets they are applied to. Gameplay effects (GEs) can have a duration (acting as buffs or debuffs) or be instant modifications (applying direct damage, etc.). Additionally, GEs with a duration can have a period specified, allowing them to be repeatedly applied over time.

GEs allow relatively sophisticated attribute modifications to a target. In addition to the very simple floating point add, multiply, or override, GEs also allow modifications to have their magnitude computed by a data table, by reliance on another attribute (from the source or target), or by a custom logic implementation. GEs make extensive use of gameplay tags to create several possible gameplay interactions via simple data setup. Tags can be specified for numerous things, including: tags to grant to a target, tags that if matched during application, remove all GEs providing those tags, tags to be immune to, tags required to be present (or not present) in order for the GE to apply, as well as to continue to apply over time.

GEs can also specify “executions” to run when they are applied, which are user-implemented classes that can specify custom logic. Both Fortnite and Paragon use custom executions to contain their damage and healing formulas in a central place, which are then executed by GEs applied to targets that need to be damaged or healed.

GEs also support the concept of “stacking,” wherein repeated application of the same GE can stack together in various ways, causing duration or period refreshes, if desired. GEs can stack either by caster (that is that each source/caster has their own stack that is building) or by target (all applications from any source count together).

At an implementation level, GEs are blueprintable UObjects, however they are never instantiated nor do they have their event graphs executed. They are used as template assets to drive a run time specification that can be further modified once applied to the target.

# Ability

Abilities define custom gameplay logic that can be activated by players or other game code (AI, traps, etc). They may do things such as: start targeting modes, apply cooldowns, launch projectiles, play animations, apply gameplay effects, call a blueprint function, etc.

The ability base class, UGameplayAbility, provides the framework for setting up and starting abilities. This includes defining cooldowns/costs of an ability, basic extendable support for binding to input keys, 'giving' abilities to ASCs, flexible support for instancing and replication.

UGameplayAbilities themselves are UObjects. Most abilities will be instantiated as subobjects on the owning actor, but basic support for simple non instantiated abilities is also provided (For example, an ability which just needs to play an animation or call a function can easily be executed without needing to be instantiated). For instanced abilities we support two policies: instantiating an ability each time it is executed, and instantiating an ability one time per ASC/actor. Both allow for the ability to keep track state while they are active.

In a networked game, abilities generally execute on the server, owning client, or both. We generally do not execute abilities for players on non owning (simulated proxy) clients, instead the strategy has been that all side effects (animations, particles, sounds, etc) will replicate automatically. We have done our best to avoid having replication logic in our ability logic; our goal is that the person writing an ability does not have to think about raw replication problems such as replicating properties/RPCs, or what should be wrapped in authority checks vs what should be skipped on dedicated servers, etc.

For player abilities we support predictive abilities. That is, abilities that can immediately start on the client when a button is pressed, but that also execute on the server and are either confirmed or denied. This allows for client side prediction of some or all of the ability.

In addition to the base functionality in UGameplayAbility, we have also attempted to provide a set of classes aimed at simplifying the flow of ability gameplay logic in blueprints. This is done by UAbilityTasks.

AbilityTasks are centred around asynchronous operations. Some examples of tasks are: "Play an animation and wait for it to finish", "Wait for my owner to take damage", "Begin Targeting preview mode and return when the user confirms".

Asynchronous task nodes help improve the flow and readability of the ability's gameplay logic. Rather than having the ability blueprint itself register callbacks or implement a tick event to poll some state, the tasks encapsulate these operations into high level pieces.

AbilityTasks themselves are uobjects that are instantiated upon, and are a subset of GameplayTasks. See AbilityTask.h and GameplayTask.h for more implementation details.

# GameplayCues

GameplayCues are cosmetic clientside events in the GameplayAbility system. It is an attempt to create a solid separation of the server/simulation logic and the client/presentation in the game.

The main things we are trying to solve with this system are:
1. Replication. GameplayCues will automatically replicate and be network friendly. We wish to avoid having client vs server logic in the abilities themselves.
1. Server optimization. Likewise, since GameplayCues are cosmetic only in nature, they never have to run on a dedicated server. Again, keeping client vs server checks out of the abilities themselves.
1. Loose coupling. Another goal is to improve the work-flow of designers (anyone making abilities) and artists (anyone making FX/audio/etc). By having the two groups interface with a generic event system, we avoid having to directly hook up "A set of designer blueprints" to "A set of artist assets".

GameplayCues event themselves are simply GameplayTags with a 'GameplayCue' prefix and are accompanied by a generic FGameplayCueParmaeters structure. They can be invoked directly by GameplayEffects, or explicitly by GameplayAbilities. Other game code could also invoke GameplayCue events through the ASC.

Handling of the GameplayCue can be done in several ways. The first step is the GameplayCueManager, which is a singleton UObject which can be extended per project. The GameplayCueManager ultimately decides who or what to route the GameplayCue event to. The system supports two main ways of handling events by default: either as explicit functions on the target actor, or by separate standalone GameplayCueNotify objects/actors.

Explicit GameplayCue functions are simply that: functions on the targeted actor which are named after the GameplayCue event. For example a blueprint may implement a "GameplayCue.Damage.Magical" event to handle magic damage. This method is especially great for actor specific overrides (this character reacts in a unique visual way when he takes lighting damage, etc).

GameplayCueNotifies are better for standard handling of GameplayCue events such as generic status effects, damage effects, etc. These notify classes can either be non instantiated UObjects (basically, static functions - spawn a particle effect or additive animation) or instantiated actors (if state needs to be kept/tracked during the liftetime of the effect).

Ultimately the GameplayCueManager decides how to direct these events. Some projects may want to route the events to the source actor or maybe a weapon class.

# The Future

The core pieces of the ability system are working well for our internal projects so far, but there are still plenty of things to consider and lots of work to be done to transition it to a fully user-facing feature.

At the moment, the system remains a work-in-progress and has been primarily aimed at system designers as users. It definitely needs a usability pass for casual users, both in the forum of UI customizations and potentially also its own stand-alone sub-editor.

The system cannot be currently used in a blueprint-only game, but a lot of the pieces are almost there. There would need to be a pass to convert all of the important parts to be exposed to blueprints.

As the system has gone through significant iteration from two game teams simultaneously, it also needs a bit of refactoring and code cleanup as we finally hone in on the “shipping” direction of the system.

Most of the intended gameplay features are in and functional at this point, with only minor clean-ups planned from the game teams, with the exception of the eventual addition of more gameplay effect stacking features in the near future.
