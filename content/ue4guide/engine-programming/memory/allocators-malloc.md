---
sortIndex: 1
sidebar: ue4guide
---

## Overview

There are three basic ways to allocate or free memory within the Unreal Engine 4:

- **Use of GMalloc pointer**. This a way to get access to the global allocator. Which allocator is set to be used depends on GCreateMalloc().

- **FMemory functions**. These are static functions such as Malloc(), Realloc(), and Free(). They also use GMalloc for the allocations but before doing that it checks if GMalloc is defined before every allocation, reallocation or free. If GMalloc is nullptr then GCreateMalloc() is called.

- **Global new and delete operators**. By default they a only defined in the modules in ModuleBoilerplate.h which means that many calls to new and delete were not being handled within the Unreal Engine 4 memory system. The overloaded operators actually call the FMemory functions.

*Reference From <https://pzurita.wordpress.com>*

## Useful Allocators:

|                                                                  |                                                                                                                            |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| TPageAllocator/FPageAllocator                                    | Page allocator                                                                                                             |
| TInlineAllocator                                                 |                                                                                                                            |
| THeapAllocator                                                   |                                                                                                                            |
| TFixedAllocator                                                  |                                                                                                                            |
| FOneFrameResource                                                |                                                                                                                            |
| TSetAllocator                                                    |                                                                                                                            |
| TInlineSetAllocator                                              |                                                                                                                            |
| TSparseArrayAllocator                                            |                                                                                                                            |
| TInlineSparseArrayAllocator                                      |                                                                                                                            |
| FLinearAllocator                                                 |                                                                                                                            |
| TMemStackAllocator<br/> FMemStackBase<br/>FMemStack<br/>FMemMark | Linear allocation memory stack                                                                                             |
| TAllocatorFixedSizeFreeList                                      | Linear block allocator: Fixed-size allocator that uses a free list to cache allocations.                                   |
| TLockFreeFixedSizeAllocator_TLSCacheBase                         | Must use custom new/delete to use (or use placementnew). Ex:FLightPrimitiveInteraction                                     |
| TLockFreeFixedSizeAllocator                                      | For more automatic, look at      TMemStackAllocator&lt;> which uses TLockFreeFixedSizeAllocator      underneath the covers |
| TLockFreeClassAllocator                                          | Examples: FAnimStackAllocator & SceneRenderingAllocator                                                                    |
| TLockFreeClassAllocator_TLSCache                                 | Can use it as an object pool (Ex: TheGraphEventAllocator &FGraphEvent::CreateGraphEvent())                                 |
| TGenericGrowableAllocator                                        | Memory allocator that allocates direct memory for pool memory                                                              |
| TCachedOSPageAllocator                                           |                                                                                                                            |
| FLinearBlockAllocator                                            |                                                                                                                            |

## Malloc:

- Configured by FWindowsPlatformMemory::BaseAllocator()

  - Editor defaults to EMemoryAllocatorToUse::TBB

  - Game defaults to EMemoryAllocatorToUse::Binned2

  - Can override with commandline: -ansimalloc, -tbbmalloc, -binnedmalloc2, -binnedmalloc

| EMemoryAllocatorToUse | Ansi, // Default C allocator                                     |
| --------------------- | ---------------------------------------------------------------- |
|                       | **Stomp, // Allocator to check for memory stomping**             |
|                       | **TBB, // Thread Building Blocks malloc       **                 |
| **FMallocDebug**      |                                                                  |
| **FMallocStomp**      | **Stomp memory allocator. It helps find the following errors: ** |

## Misc:

Memory::FPage::AllocatePage(Memory::MinPageSize);

VirtualAlloc - Virtual allocate memory

FPlatformMisc::TagBuffer("ImmediatePhysicsSim", …);

FSharedMemoryRegion/MapNamedSharedMemoryRegion - memory mapping

## Operator New replacement:

UObject and UStruct types overload operator new via one of the nested macros within GENERATED_UCLASS_BODY and GENERATED_USTRUCT_BODY. Slate widgets also override this operator, as do modules via REPLACEMENT_OPERATOR_NEW_AND_DELETE.

The module level replacement seems to catch all the allocations made within a module, even if you're not allocating a UObject, UStruct, or Slate widget.

Ultimately they call through to FMemory::Malloc, which will forward it onto whichever allocator is active (eg, FMallocTBB). If one of these allocators fails to perform an allocation, they will call an implementation specific OutOfMemory function to log a fatal error.

I tried allocating 0x7fffffffffffffff bytes. With a debugger attached, it broke into the debugger on the failed allocation; without a debugger attached, the application just quit.

*Reference From <https://wiki.unrealengine.com/Garbage_Collection_%26_Dynamic_Memory_Allocation>*
