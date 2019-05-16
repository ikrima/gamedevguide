template &lt;&gt; struct TIsWeakPointerType&lt;FLazyObjectPtr&gt; { enum { Value = TIsWeakPointerType&lt;TPersistentObjectPtr&lt;FUniqueObjectGuid&gt; &gt;::Value }; };

template &lt;&gt; struct THasGetTypeHash&lt;FLazyObjectPtr&gt; { enum { Value = THasGetTypeHash&lt;TPersistentObjectPtr&lt;FUniqueObjectGuid&gt; &gt;::Value }; };

 

For UStruct()

/\*\* type traits to cover the custom aspects of a script struct \*\*/

template &lt;class CPPSTRUCT&gt;

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

 

/\*\*

\* Tests if a type T is bitwise-constructible from a given argument type U. That is, whether or not

\* the U can be memcpy'd in order to produce an instance of T, rather than having to go

\* via a constructor.

\*

\* Examples:

\* TIsBitwiseConstructible&lt;PODType, PODType &gt;::Value == true // PODs can be trivially copied

\* TIsBitwiseConstructible&lt;const int\*, int\* &gt;::Value == true // a non-const Derived pointer is trivially copyable as a const Base pointer

\* TIsBitwiseConstructible&lt;int\*, const int\*&gt;::Value == false // not legal the other way because it would be a const-correctness violation

\* TIsBitwiseConstructible&lt;int32, uint32 &gt;::Value == true // signed integers can be memcpy'd as unsigned integers

\* TIsBitwiseConstructible&lt;uint32, int32 &gt;::Value == true // and vice versa

\*/

 

template &lt;&gt;

struct TIsBitwiseConstructible&lt;Name, TRangeBound&lt;ElementType&gt;&gt;

{

enum { Value = true };

};
