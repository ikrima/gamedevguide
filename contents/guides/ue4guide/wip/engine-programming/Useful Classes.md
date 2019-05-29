---
sortIndex: 5
---

## Algorithms

ParallelFor

Threading Primitives: <https://de45xmedrsdbp.cloudfront.net/Resources/files/Multithreading-1112727176.pdf>

Look at the Algo namespace

Algo::Accumulate - equiv of fold

Algo::Transform/TransformIf - equiv of map

Invoke()

KeyFrameAlgorithms::Scale

KeyFrameAlgorithms::Translate

## Structs:

TNumericLimits&lt;>

TScopedCallback - Helper obj for batching callback requests

TScopedPointer

TValueOrError

TAttribute - Used in Slate to allow a value to be set directly or through a function

TOptional - Make a POD optional

TInlineValue

TFrameValue - This struct allows you to cache a value for a frame, and automatically invalidates

TGuardValue - exception safe guard around saving/restoring a value

TFuture

TTypeCompatibleBytes

TFunction & TFunctionRef are ways to store/pass lambdas. TFunctionRef is fast but doesn't take ownership so you have to make sure the lambda being passed is still in scope when TFunctionRef gets called

## Useful Debugging Stack trace debugging tooling

Stack trace/Call Stack/Stack Capturing + Symbol Debug ties :

- FStackTracker

- FGenericPlatformStackWalk

  - ProgramCounterToHumanReadableString

  - SymbolInfoToHumanReadableString

  - ProgramCounterToSymbolInfo

  - CaptureStackBackTrace

  - StackWalkAndDump


- FProgramCounterSymbolInfo

- FStackWalkModuleInfo

## Useful Containers

TStaticHashTable

TSet

TMap

TArray

FBinaryHeap

TArrayView: Statically sized view of an array. Allows functions to take either fixed C array or a TArray with arbittrary allocator when function doesn’t add or remove elements. Treat TArrayView as a ref

\* int32 SumAll(TArrayView&lt;const int32> array)

\* {

\* return Algo::Accumulate(array);

\* }

\*

\* could be called as:

\* SumAll(MyTArray);

\* SumAll(MyCArray);

\* SumAll({1, 2, 3});

\* SumAll(MakeArrayView(Ptr, Num));

THeap: Can make a Tarray heapified by calling Heapify()

TBitArray

TQueue

TStaticArray: Statically sized array

TStaticBitArray: Statically sized Bit Array

TChunkedArray: Array using multiple allocations to avoid allocation failure due to fragmentation

TCircularBuffer - Circular buffer, sized in power of 2

TCircularQueue: Lock-free FIFO queue using circularArray. Be careful if you use this, read the code

TLinkedList/TDoubleLinkedList

TIntrusiveLinkedList

TSparseArray: Dynamically sized array where elemnt indices arent necessarily contiguous. Memory allocated for all elements but allows for O(1) element removal

## Container Functions:

GetSlack()()

- Can query existing remaining free capacity of container

Empty(int32 n)

- Will set capacity of container to n; will also free up existing slack memory

Reset(int32 n)

- Same as Empty() but won't release memory if newly requested capacity is smaller than existing capacity

AddUninitialized/InsertUninitialized()

- Only adds objects, doesn't call constructor

AddZeroed/InsertZeroed()

- Same as AddUninitialized() but zeroes out memory
