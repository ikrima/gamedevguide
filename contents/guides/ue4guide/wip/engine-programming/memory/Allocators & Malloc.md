## **Overview:**

There are three basic ways to allocate or free memory within the Unreal Engine 4:

- **Use of GMalloc pointer**. This a way to get access to the global allocator. Which allocator is set to be used depends on GCreateMalloc().

- **FMemory functions**. These are static functions such as Malloc(), Realloc(), and Free(). They also use GMalloc for the allocations but before doing that it checks if GMalloc is defined before every allocation, reallocation or free. If GMalloc is nullptr then GCreateMalloc() is called.

- **Global new and delete operators**. By default they a only defined in the modules in ModuleBoilerplate.h which means that many calls to new and delete were not being handled within the Unreal Engine 4 memory system. The overloaded operators actually call the FMemory functions.

_From &lt;<https://pzurita.wordpress.com/>&gt;_

\* \*

## **Useful Allocators:**

<table><thead><tr class="header"><th>TPageAllocator/FPageAllocator</th><th>Page allocator</th></tr></thead><tbody><tr class="odd"><td>TInlineAllocator</td><td> </td></tr><tr class="even"><td>THeapAllocator</td><td> </td></tr><tr class="odd"><td>TFixedAllocator</td><td> </td></tr><tr class="even"><td>FOneFrameResource</td><td> </td></tr><tr class="odd"><td>TSetAllocator</td><td> </td></tr><tr class="even"><td>TInlineSetAllocator</td><td> </td></tr><tr class="odd"><td>TSparseArrayAllocator</td><td> </td></tr><tr class="even"><td>TInlineSparseArrayAllocator</td><td> </td></tr><tr class="odd"><td>FLinearAllocator</td><td> </td></tr><tr class="even"><td><p>TMemStackAllocator</p><p>FMemStackBase</p><p>FMemStack</p><p>FMemMark</p></td><td>Linear allocation memory stack</td></tr><tr class="odd"><td><p>TAllocatorFixedSizeFreeList<br />
TLockFreeFixedSizeAllocator_TLSCacheBase</p><p>TLockFreeFixedSizeAllocator</p><p>TLockFreeClassAllocator</p><p>TLockFreeClassAllocator_TLSCache</p><p> </p></td><td><ul><li><blockquote><p>Linear block allocator: Fixed-sized allocator that uses a free list to cache allocations.</p></blockquote></li><li><blockquote><p>Must use custom new/delete to use (or use placementnew). Ex: FLightPrimitiveInteraction</p></blockquote></li><li><blockquote><p>For more automatic, look at TMemStackAllocator&lt;&gt; which uses TLockFreeFixedSizeAllocator underneath the covers</p></blockquote></li><li><blockquote><p>Examples: FAnimStackAllocator &amp; SceneRenderingAllocator</p></blockquote></li><li><blockquote><p>Can use it as an object pool (Ex: TheGraphEventAllocator &amp; FGraphEvent::CreateGraphEvent())</p></blockquote></li></ul></td></tr><tr class="even"><td>TGenericGrowableAllocator</td><td>Memory allocator that allocates direct memory for pool memory</td></tr><tr class="odd"><td>TCachedOSPageAllocator</td><td> </td></tr><tr class="even"><td>FLinearBlockAllocator</td><td> </td></tr></tbody></table>

## **Malloc:**

- Configured by FWindowsPlatformMemory::BaseAllocator()

  - Editor defaults to EMemoryAllocatorToUse::TBB

  - Game defaults to EMemoryAllocatorToUse::Binned2

  - Can override with commandline: -ansimalloc, -tbbmalloc, -binnedmalloc2, -binnedmalloc

>

<table><thead><tr class="header"><th>EMemoryAllocatorToUse</th><th><p>Ansi, // Default C allocator</p><p>Stomp, // Allocator to check for memory stomping</p><p>TBB, // Thread Building Blocks malloc</p><p>Jemalloc, // Linux/FreeBSD malloc</p><p>Binned, // Older binned malloc</p><p>Binned2, // Newer binned malloc</p><p>Platform, // Custom platform specific allocator</p></th></tr></thead><tbody><tr class="odd"><td>FMallocDebug</td><td> </td></tr><tr class="even"><td>FMallocStomp</td><td>Stomp memory allocator. It helps find the following errors:</td></tr></tbody></table>

## **Misc:**

Memory::FPage::AllocatePage(Memory::MinPageSize);

VirtualAlloc - Virtual allocate memory

FPlatformMisc::TagBuffer("ImmediatePhysicsSim", …);

FSharedMemoryRegion/MapNamedSharedMemoryRegion - memory mapping

## **Operator New replacement:**

UObject and UStruct types overload operator new via one of the nested macros within GENERATED_UCLASS_BODY and GENERATED_USTRUCT_BODY. Slate widgets also override this operator, as do modules via REPLACEMENT_OPERATOR_NEW_AND_DELETE.

The module level replacement seems to catch all the allocations made within a module, even if you're not allocating a UObject, UStruct, or Slate widget.

Ultimately they call through to FMemory::Malloc, which will forward it onto whichever allocator is active (eg, FMallocTBB). If one of these allocators fails to perform an allocation, they will call an implementation specific OutOfMemory function to log a fatal error.

I tried allocating 0x7fffffffffffffff bytes. With a debugger attached, it broke into the debugger on the failed allocation; without a debugger attached, the application just quit.

_From &lt;<https://wiki.unrealengine.com/Garbage_Collection_%26*Dynamic_Memory_Allocation>&gt;*
