---
sortIndex: 2
---

**Deleting UObject:**

MarkPendingKill():

- Nulls out references and marks it to be cleared in next GC Sweep

Note that [Weak Pointers](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/SmartPointerLibrary/WeakPointer/index.html) have no impact on whether an Object is garbage collected or not.

Object destruction is handled automatically by the garbage collection system when an Object is no longer referenced. This means that no UPROPERTY pointers, or engine containers or [smart pointer](https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/SmartPointerLibrary/index.html) class instances should have any strong references to it. When the garbage collector runs, unreferenced Objects that are found will be deleted. In addition, the function MarkPendingKill() can be called directly on an Object, and this function will set all pointers to the Object to NULL, as well as remove the Object from global searches. Once again, the Object will be fully deleted on the next garbage collection pass.

*Reference From <https://docs.unrealengine.com/latest/INT/Programming/UnrealArchitecture/Objects/index.html>*



Immediate destruction:

- RemoveFromRoot()

- ConditionalBeginDestroy()

**Deleting Actor:**

- Destroy()

  - Calls World->DestroyActor()

- In Editor: GetWorld()->EditorDestroyActor(lcbActor, true);

- ConditionalBeginDestroy()
