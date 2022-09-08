---
sortndex: 15
sidebar: ue4guide
---


# Useful classes

Look for classes that end in Utils or EditorUtils e.g. FBlueprintEditorUtils or FActorEditorUtils, EngineUtils, etc

- These classes often have lots of utility functions that are widely accessible

| FBlueprintEditorUtils | Useful for blueprints         |
| --------------------- | ----------------------------- |
| FActorEditorUtils     | Functions for managing actors |



```cpp
IsUniqueObjectName()

namespace EditorUtilities

{

 /\*\*

 \* Given an actor in a Simulation or PIE world, tries to find a counterpart actor in the editor world

 \*

 \* @param    Actor   The simulation world actor that we want to find a counterpart for

 \*

 \* @return      The found editor world actor, or NULL if we couldn't find a counterpart

 \*/

 UNREALED_API AActor\* GetEditorWorldCounterpartActor( AActor\* Actor );

 /\*\*

 \* Given an actor in the editor world, tries to find a counterpart actor in a Simulation or PIE world

 \*

 \* @param      Actor      The editor world actor that we want to find a counterpart for

 \*

 \* @return        The found Simulation or PIE world actor, or NULL if we couldn't find a counterpart

 \*/

 UNREALED_API AActor\* GetSimWorldCounterpartActor( AActor\* Actor );

 /\*\*

 \* Guiven an actor in the editor world, and SourceComponent from Simulation or PIE world

 \* find the matching component in the Editor World

 \*

 \* @param        SourceComponent        SouceCompoent in SIM world

 \* @param        TargetActor                TargetActor in editor world

 \*

 \* @return        the sound editor component or NULL if we couldn't find

 \*/

 UNREALED_API UActorComponent\* FindMatchingComponentInstance( UActorComponent\* SourceComponent, AActor\* TargetActor );

 /\*\* Options for CopyActorProperties \*/

 namespace ECopyOptions

 {

 enum Type

 {

 /\*\* Default copy options \*/

 Default = 0,

 /\*\* Set this option to preview the changes and not actually copy anything. This will count the number of properties that would be copied. \*/

 PreviewOnly = 1 &lt;&lt; 0,

 /\*\* Call PostEditChangeProperty for each modified property \*/

 CallPostEditChangeProperty = 1 &lt;&lt; 1,

 /\*\* Call PostEditMove if we detect that a transform property was changed \*/

 CallPostEditMove = 1 &lt;&lt; 2,

 /\*\* Copy only Edit and Interp properties. Otherwise we copy all properties by default \*/

 OnlyCopyEditOrInterpProperties = 1 &lt;&lt; 3,

 /\*\* Propagate property changes to archetype instances if the target actor is a CDO \*/

 PropagateChangesToArchetypeInstances = 1 &lt;&lt; 4,

 /\*\* Filters out Blueprint Read-only properties \*/

 FilterBlueprintReadOnly = 1 &lt;&lt; 5,

 };

 }

 /\*\* Copy options structure for CopyActorProperties \*/

 struct FCopyOptions

 {

 /\*\* Implicit construction for an options enumeration \*/

 FCopyOptions(const ECopyOptions::Type InFlags) : Flags(InFlags) {}

 /\*\* Check whether we can copy the specified property \*/

 bool CanCopyProperty(UProperty& Property, UObject& Object) const

 {

 return !PropertyFilter || PropertyFilter(Property, Object);

 }

 /\*\* User-specified flags for the copy \*/

 ECopyOptions::Type Flags;

 /\*\* User-specified custom property filter predicate \*/

 TFunction&lt;bool(UProperty&lt;, UObject&lt;)> PropertyFilter;

 };

 /\*\* Helper function for CopyActorProperties(). Copies a single property form a source object to a target object. \*/

 UNREALED_API void CopySingleProperty(const UObject\* const InSourceObject, UObject\* const InTargetObject, UProperty\* const InProperty);

 /\*\*

 \* Copies properties from one actor to another. Designed for propagating changes made to PIE actors back to their EditorWorld

 \* counterpart, or pushing spawned actor changes back to a Blueprint CDO object. You can pass the 'PreviewOnly' option to

 \* count the properties that would be copied instead of actually copying them.

 \*

 \* @param        SourceActor                Actor to copy properties from

 \* @param        TargetActor                Actor that will be modified with properties propagated from the source actor

 \* @param        Options                        Optional options for this copy action (see ECopyOptions::Type)

 \*

 \* @return        The number of properties that were copied over (properties that were filtered out, or were already identical, are not counted.)

 \*/

 UNREALED_API int32 CopyActorProperties( AActor\* SourceActor, AActor\* TargetActor, const FCopyOptions& Options = FCopyOptions(ECopyOptions::Default) );

}
```
