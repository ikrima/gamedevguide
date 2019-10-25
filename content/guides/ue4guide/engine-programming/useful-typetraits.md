---
sortIndex: 6
---

# Unreal Template Type Traits

```cpp
template <> struct TIsWeakPointerType<FLazyObjectPtr> { enum { Value = TIsWeakPointerType<TPersistentObjectPtr<FUniqueObjectGuid> >::Value }; };
template <> struct THasGetTypeHash<FLazyObjectPtr> { enum { Value = THasGetTypeHash<TPersistentObjectPtr<FUniqueObjectGuid> >::Value }; };

For UStruct()
/** type traits to cover the custom aspects of a script struct **/
template <class CPPSTRUCT>
struct TStructOpsTypeTraitsBase2
{
  enum
  {
    WithZeroConstructor            = false,                         // struct can be constructed as a valid object by filling its memory footprint with zeroes.
    WithNoInitConstructor          = false,                         // struct has a constructor which takes an EForceInit parameter which will force the constructor to perform initialization, where the default constructor performs 'uninitialization'.
    WithNoDestructor               = false,                         // struct will not have its destructor called when it is destroyed.
    WithCopy                       = !TIsPODType<CPPSTRUCT>::Value, // struct can be copied via its copy assignment operator.
    WithIdenticalViaEquality       = false,                         // struct can be compared via its operator==.  This should be mutually exclusive with WithIdentical.
    WithIdentical                  = false,                         // struct can be compared via an Identical(const T* Other, uint32 PortFlags) function.  This should be mutually exclusive with WithIdenticalViaEquality.
    WithExportTextItem             = false,                         // struct has an ExportTextItem function used to serialize its state into a string.
    WithImportTextItem             = false,                         // struct has an ImportTextItem function used to deserialize a string into an object of that class.
    WithAddStructReferencedObjects = false,                         // struct has an AddStructReferencedObjects function which allows it to add references to the garbage collector.
    WithSerializer                 = false,                         // struct has a Serialize function for serializing its state to an FArchive.
    WithPostSerialize              = false,                         // struct has a PostSerialize function which is called after it is serialized
    WithNetSerializer              = false,                         // struct has a NetSerialize function for serializing its state to an FArchive used for network replication.
    WithNetDeltaSerializer         = false,                         // struct has a NetDeltaSerialize function for serializing differences in state from a previous NetSerialize operation.
    WithSerializeFromMismatchedTag = false,                         // struct has a SerializeFromMismatchedTag function for converting from other property tags.
  };
};

/**
 * Tests if a type T is bitwise-constructible from a given argument type U.  That is, whether or not
 * the U can be memcpy'd in order to produce an instance of T, rather than having to go
 * via a constructor.
 *
 * Examples:
 * TIsBitwiseConstructible<PODType,    PODType   >::Value == true  // PODs can be trivially copied
 * TIsBitwiseConstructible<const int*, int*      >::Value == true  // a non-const Derived pointer is trivially copyable as a const Base pointer
 * TIsBitwiseConstructible<int*,       const int*>::Value == false // not legal the other way because it would be a const-correctness violation
 * TIsBitwiseConstructible<int32,      uint32    >::Value == true  // signed integers can be memcpy'd as unsigned integers
 * TIsBitwiseConstructible<uint32,     int32     >::Value == true  // and vice versa
 */

template <>
struct TIsBitwiseConstructible<Name, TRangeBound<ElementType>>
{
    enum { Value = true };
};
```
