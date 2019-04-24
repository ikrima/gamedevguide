 ![PorgrammingGuideNotes_ProjectModuleClassOrg](C:\devguide\conversion\FINISHED\assets\PorgrammingGuideNotes_ProjectModuleClassOrg.jpg)

-   AActor is base class Spawnable class

-   Component model: To Instantiate camera, can add CameraComponent to Actor object

  

Coding Standard:
----------------

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html>&gt;*

 

-   Classes should have public interface methods declared first

-   Capitalize first letter of each word in variables

-   Types are prefixed with an additional capital letter (e.g. AActor):

    -   T: Templates

    -   U: Classes inheriting from Uobject

    -   A: Classes inheriting from Aactor

    -   S: Classes inheriting from Swidget

    -   I: Abstract interfaces

    -   F: Most other classes

    -   E: Enums

-   Types/variables are nouns

-   Variables should be declared one at a time

-   Booleans should be prefixed with b

-   Methods are verbs that describe method's effect or describe return value of method that has no effect. Strong verb followed by object (e.g. IsTeaFresh())

-   Prefix function parameters with Out if they are going to be modified. Const religion!

 

**Portable Aliases for Basic C++ Types**

-   bool for boolean values (NEVER assume the size of bool). BOOL will not compile.

-   TCHAR for a character (NEVER assume the size of TCHAR)

-   uint8 for unsigned bytes (1 byte)

-   int8 for signed bytes (1 byte)

-   uint16 for unsigned "shorts" (2 bytes)

-   int16 for signed "shorts" (2 bytes)

-   uint32 for unsigned ints (4 bytes)

-   int32 for signed ints (4 bytes)

-   uint64 for unsigned "quad words" (8 bytes)

-   int64 for signed "quad words" (8 bytes)

-   float for single precision floating point (4 bytes)

-   double for double precision floating point (8 bytes)

-   PTRINT for an integer that may hold a pointer (NEVER assume the size of PTRINT)

Don't use the C++ int type in portable code, since it's dependent on the compiler how large it is.



\* *

General

-   Comment third party code with special comments  
    
     

// @third party code - BEGIN PhysX
#include <PhysX.h>
// @third party code - END PhysX



-   Braces should be on a new line

-   Minimize file-coupling by using forward declarations instead of include headers when possible

-   Use \#pragma once

-   Fine-grained header inclusion: Include every header you need directl. **Don't rely on a header that is included indirectly by another header you include**

-   Place definitions needed by other modules in the Public directory of a module. Everything else should be in the Private directory. (Old UE modules use Src/Inc for this distinction).

-   *Never allow float to implicit convert to int32 b/c it's slow.* Always use the appTrunc() function to convert to int32. This will ensure cross-compiler compatibility as well as generate faster code.

-   Interface classes (prefixed with "I") should always be abstract and must not have member variables. Interfaces are allowed to contain methods that are not pure-virtual, and even methods that are non-virtual or static, as long as they are implemented inline.

-   *Use const wherever possible.* Particularly on reference parameters and class methods. const is documentation as much as it is a compiler directive.

-   Pointers & references declared with one space. Ex: FShaderType\* Type

-   Use virtual & OVERRIDE when defining derived functions.

-   Leave a blank line at the end of the file. All .cpp and .h files for gcc



 

**Namespaces**

You can use namespaces to organize your classes, functions and variables where appropriate, as long as you follow the rules below.

 

-   Don't use "using" declarations in the global scope, even in .cpp files

-   You can use "using" inside of another namespace or inside functions

 

-   Note that if you put "using" within a namespace, it will carry over to other occurrences of that namespace in the same translation unit. As long as you're consistent it will be fine, though.

-   You can only use "using" in header files safely if you follow the above rules.

-   Enums must be wrapped in their own namespace b/c C++ Enum values have the same scope. Ex:

 

> /\*\* Defining a enumeration within a namespace to achieve C\#-style enum scoping \*/  
> namespace EColorChannel  
> {  
> /\*\* Declare EColorChannel::Type as the actual type for this enum \*/  
> enum Type  
> {  
> Red,  
> Green,  
> Blue  
> };  
> }
>
> /\*\* Given a color channel, returns the name of that channel. \*/  
> FString GetNameForColorChannel(const EColorChannel::Type ColorChannel)  
> {  
> switch(ColorChannel)  
> {  
> case EColorChannel::Red: return TEXT("Red");  
> case EColorChannel::Green: return TEXT("Green");  
> case EColorChannel::Blue: return TEXT("Blue");  
> default: return TEXT("Unknown");  
> }  
> }

-   Note that for locally-declared enums, you won't be able to use a namespace for scoping. In these cases, we opt to declare a local struct with no member variables, only a local enum type and use that struct for scoping.  
    > /\*\* Defining a locally-scoped enumeration using structs\*/  
    > class FObjectMover  
    > {  
    > public:  
    >   
    > /\*\* Direction to move \*/  
    > struct EMoveDirection  
    > {  
    > enum Type  
    > {  
    > Forward,  
    > Reverse,  
    > };  
    > };

> /\*\* Construct an FObjectMover with the specified movement direction \*/  
> FObjectMover( const EMoveDirection::Type Direction );
>
>  

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/Development/CodingStandard/index.html>&gt;*

>  

 

 

-    

>  

 

>  
>
>  

Object Handling
===============

 

UCLASS() macro tags classes into the Uobject handling system:

-   Gives class a reference to UClass object

-   UClass Object is UE4 C++ implementation of attribute decorators/rtti

-   UClass Object contains reference to CDO, class default object.

-   UClass macros also used to decorate functions & properties

 

 

Object Creation
---------------

There are several functions that can be used to create new UObject instances as well as the standard new operator; each of which have their own use case:

<table><thead><tr class="header"><th><strong>Method</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td><a href="https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/Creation/index.html#newobject">NewObject&lt;class&gt;()</a></td><td>Creates a new instance with an automatically generated name. Best practice to use for simple cases.</td></tr><tr class="even"><td><a href="https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/Creation/index.html#newnamedobject">NewNamedObject&lt;class&gt;()</a></td><td>Creates a new instance using a specified name along with a few other optional parameters. Asserts if the name conflicts within the new instance's Outer.</td></tr><tr class="odd"><td><a href="https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/Creation/index.html#constructobject">ConstructObject&lt;class&gt;()</a></td><td>Creates a new instance providing all available creation options. Use only when flexibility is required.</td></tr><tr class="even"><td>new</td><td>Use to construct objects in certain low level circumstances, such as when the constructor requires arguments.</td></tr></tbody></table>

 

*From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/index.html>&gt;*

 

-   Tick is the Update() per frame update function.

-   Must derive from *FTickableGameObject* to make a class tickable

 

 

UClass System notes:

-   UClass is the C++ class that contains the RTTI info

-   UE4 implements a Garbage collection system

-   Auto-initialization for properties

-   Auto-serialization. Will auto-update values in the level if they've not been manually overridden in the CDO

-   Automatic editor integration

-   Simple RTTI (can do typecasting IsA&lt;T&gt;() or Cast&lt;T&gt;()

-   Supports network replication (can tag UFUNCTIONS for RPC & UPROPERTIES for replication)

 

Misc
====

-   Frameroot smoothing = Sets MaxTick() to be running average of last 300 frames, clamped to MinSmoothFramerate & MaxSmoothFramerate

 

Actors
======

-   Not garbage collected (b/c World object holds references to all actors)

-   Can be explicitly destroyed by calling Destroy()

-   Creating new actors done with SpawnActor()

-   Handles replication of properties & functions

-   Functionality exposed through component pattern. Actors contain no xform or basic data

-   Tick function is TickActor()

-   Spawned with UWorld::SpawnActor()

    -   More spawning helper functions @ <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Spawning/index.html>

>  

Components
==========

-   UActorComponent: Base class for components

-   USceneComponent: Base component that contains xform

-   UPrimitiveComponent: Component made up of other things (mesh, particles, etc)

    -   CapsuleComponents generate geometry for collision detection

    -   StaticMeshComponents for static geo

    -   SkeletalMeshComponents for collision detection

-   Components must be registered UActorComponent::RegisterComponent()

-   Components tick through TickComponent() (Ex: SkeletalMesh calls TickComponent() to update animation & skeletal controllers)

-   RenderState manages rendering for a component

-   PhysicsState manages physics for a component

>  
>
>  
>
>  
>
> **Register Events**
>
> When a component is registered, the events below are fired off.

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>UActorComponent::OnRegister()</td><td>Event to allow for additional initialization when registering a component, if necessary.</td></tr><tr class="even"><td>UActorComponent::CreateRenderState()</td><td>Initializes the render state for the component.</td></tr><tr class="odd"><td>UActorComponent::CreatePhysicsState()</td><td>Initializes the physics state for the component.</td></tr></tbody></table>

> **UnRegistering Components**
>
> **ActorComponents** can be unregistered as well to avoid them being updated, simulated, or rendered. Unregistering a component is performed by callingUActorComponent::UnregisterComponent().
>
> void UActorComponent::UnregisterComponent()
>
> **UnRegister Events**
>
> The events below are fired off when a component is unregistered.

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>UActorComponent::OnUnRegister()</td><td>Event to allow for additional actions when unregistering a component, if necessary.</td></tr><tr class="even"><td>UActorComponent::DestroyRenderState()</td><td>Uninitializes the render state for the component.</td></tr><tr class="odd"><td>UActorComponent::DestroyPhysicsState()</td><td>Uninitializes the physics state for the component.</td></tr></tbody></table>

>  
>
> *From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html>&gt;*
>
>  
>
>  
>
>  
>
> **Component Transforms**

-   **FTransform** struct contains a **Translation vector, a Rotation quaternion, and a Scale3D vector**.

-   They also have an additional **RelativeLocation vector**,**RelativeRotation rotator**, and **RelativeScale3D vector**

    -   Can be relative to world or parent

    -   Generally used for getting & setting transform for a component

    -   Default relative to AttachParent. Control relative by setting **bAbsoluteLocation, bAbsoluteRotation, and bAbsoluteScale properties**

    -   Can also set the absolute world position (internally converted to relative xform) by these functions

>  

<table><thead><tr class="header"><th><strong>Function</strong></th><th><strong>Description</strong></th></tr></thead><tbody><tr class="odd"><td>SceneComponent::SetWorldLocation()</td><td>Set the relative translation of this component to put it at the supplied location in world space.</td></tr><tr class="even"><td>SceneComponent::SetWorldRotation()</td><td>Set the relative rotation of this component to put it at the supplied orientation in world space.</td></tr></tbody></table>

>  
>
> *From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Actors/Components/index.html>&gt;*
>
>  
>
>  
>
>  
>
>  
>
> **Delegates**
>
> Delegates allow you to call member functions on C++ objects in a generic, yet type-safe way. Using delegates, you can dynamically bind to a member function of an arbitrary object, then call functions on the object, even if the caller does not know the object's type.
>
> It is perfectly safe to copy delegate objects. Delegates can be passed around by value but this is generally not recommended since they do have to allocate memory on the heap. **You should always pass delegates by reference when possible.**
>
> Both single-cast and multi-cast delegates are supported, as well as "dynamic" delegates which can be safely serialized to disk.

-   Single-cast

-   [Multi-cast]

-   [Events]

-   [Dynamic (UObject, serializable)]

> See the [Delegates] page for reference and usage information.
>
>  
>
> *From &lt;<https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Reference/Functions/index.html>&gt;*
>
>  
>
>  

[Multi-cast]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/Multicast/index.html
[Events]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/Events/index.html
[Dynamic (UObject, serializable)]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/Dynamic/index.html
[Delegates]: https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Delegates/index.html
