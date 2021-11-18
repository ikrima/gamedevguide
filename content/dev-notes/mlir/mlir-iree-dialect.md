# IREE

## Overview

[iree-architecture.svg](../_assets/iree-architecture.svg)

Hierarchy:

* Submissions
  
  * Command Buffers
    * Commands
      * Dispatches
        * Subgroups
          * Instructions
* Memory
  
  * Temporary memory, transient within execution (stack/alloca)
  * Temporary memory across commands, transient within command buffer (arena)
  * Temp memory across command buffers (fenced ringbuffer)
  * Persistent mem
    * External, long-lived
    * Generational in a ringbuffer 
    * Read only/mapped
* Schedule hierarchy
  => Input Compute Graph: value semantics
  => Data Flow: data + execution flow; separated from exec ops. defines concurrency domains across
  - across streams (persistent buffers)
  - within streams (transientt buffers)
  - within dispatches 
  => Alloc Model: allocation + execution model
  => Exec Model: VM exec ops
  => VM: cod 

## Memory/Buffers

Different allocators for different visibility scopes:

* Temporary memory used during execution is purely transient (stack/alloca)
* Temporary memory used across commands is transient within the command buffer (arena)
* Temporary memory used across command buffers is fenced (ringbuffer)

Persistent memory can be whatever it needs to be:

* External, long-lived
* Ringbuffer if generational
* Read-only/mapped

Memory Types:

* **ptr:** Pointer to a typed value.
* **byte_buffer:** A constant buffer of mapped host memory.
* **mutable_byte_buffer:** A buffer of read-write host memory.

````cpp
signature ::= 'I' length-prefixed(type-sequence)
              'R' length-prefixed(type-sequence)

type-sequence ::= (arg-result-type)*
arg-result-type ::= buffer-type
                  | ref-object-type
                  | scalar-type
                  | unrecognized-type
buffer-type ::= 'B' length-prefixed(scalar-element-type? dim*)
scalar-type ::= 'S' length-prefixed(scalar-element-type?)
scalar-element-type ::= 't' (
                    '0'  # IEEE float32 (default if not specified)
                  | '1'  # IEEE float16
                  | '2'  # IEEE float64
                  | '3'  # Google bfloat16
                  | '4'  # Signed int8
                  | '5'  # Signed int16
                  | '6'  # Signed int32
                  | '7'  # Signed int64
                  | '8'  # Unsigned int8
                  | '9'  # Unsigned int16
                  | '10' # Unsigned int32
                  | '11' # Unsigned int64
                  )
dim :: = 'd' integer  # -1 indicates a dynamic dim
ref-object-type ::= 'O' length-prefixed()  # Details TBD
unrecognized-type ::= 'U' length-prefixed()

# Lexical primitives
integer ::= -?[0-9]+
length ::= [0-9]+
# The `length` encodes the length in bytes of `production`, plus 1 for the '!'.
length-prefixed(production) ::= length '!' production
any-byte-sequence ::= <any byte sequence>
````

````cpp
// Inspired heavily by the Py_buffer type.
// See: https://docs.python.org/3/c-api/buffer.html
struct BufferDescription {
  ScalarType element_type;
  // For contiguous arrays, this is is the length of the underlying memory.
  // For non-contiguous, this is the size of the buffer if it were copied
  // to a contiguous representation.
  size_t len;
  // Number of dims and strides.
  size_t ndim;
  int* shape;
  int* strides;
};

// Mirrors the 'buffer-type' production in the above grammar.
struct SignatureBufferType;

// Oracle which combines signature metadata with a user-provided, materialized
// BufferDescription to derive a BufferDescription that is compatible for
// invocation. Returns an updated buffer description if the original is
// not compatible or fully specified.
// This can be used in a couple of ways:
//   a) On function invocation to determine whether a provided buffer can be
//      used as-is or needs to be converted (copied).
//   b) To provide a factory function to the host language to create a
//      compatible buffer.
optional<BufferDescription> BufferDescriptionOracle(
    DeviceContext*, SignatureBufferType, BufferDescription)
  throws UnsupportedBufferException;

````

````cpp

Operation definition
    flow.dispatch.entry (::mlir::iree_compiler::IREE::Flow::DispatchEntryOp)
        Attributes:
    flow.dispatch (::mlir::iree_compiler::IREE::Flow::DispatchOp)
        Attributes:
        Operands:
        Results:
    flow.dispatch.region (::mlir::iree_compiler::IREE::Flow::DispatchRegionOp)
        Operands:
        Results:
    flow.ex.stream.fragment (::mlir::iree_compiler::IREE::Flow::ExStreamFragmentOp)
        Operands:
        Results:
    flow.executable_end (::mlir::iree_compiler::IREE::Flow::ExecutableEndOp)
    flow.executable (::mlir::iree_compiler::IREE::Flow::ExecutableOp)
        Attributes:
    flow.return (::mlir::iree_compiler::IREE::Flow::ReturnOp)
        Operands:
    flow.tensor.clone (::mlir::iree_compiler::IREE::Flow::TensorCloneOp)
        Operands:
        Results:
    flow.tensor.load (::mlir::iree_compiler::IREE::Flow::TensorLoadOp)
        Operands:
        Results:
    flow.tensor.reshape (::mlir::iree_compiler::IREE::Flow::TensorReshapeOp)
        Operands:
        Results:
    flow.tensor.slice (::mlir::iree_compiler::IREE::Flow::TensorSliceOp)
        Operands:
        Results:
    flow.tensor.splat (::mlir::iree_compiler::IREE::Flow::TensorSplatOp)
        Operands:
        Results:
    flow.tensor.store (::mlir::iree_compiler::IREE::Flow::TensorStoreOp)
        Operands:
        Results:
    flow.tensor.trace (::mlir::iree_compiler::IREE::Flow::TensorTraceOp)
        Attributes:
        Operands:
    flow.tensor.update (::mlir::iree_compiler::IREE::Flow::TensorUpdateOp)
        Operands:
        Results:
    flow.variable.address (::mlir::iree_compiler::IREE::Flow::VariableAddressOp)
        Attributes:
        Results:
    flow.variable.load.indirect (::mlir::iree_compiler::IREE::Flow::VariableLoadIndirectOp)
        Operands:
        Results:
    flow.variable.load (::mlir::iree_compiler::IREE::Flow::VariableLoadOp)
        Attributes:
        Results:
    flow.variable (::mlir::iree_compiler::IREE::Flow::VariableOp)
        Attributes:
    flow.variable.store.indirect (::mlir::iree_compiler::IREE::Flow::VariableStoreIndirectOp)
        Operands:
    flow.variable.store (::mlir::iree_compiler::IREE::Flow::VariableStoreOp)
        Attributes:
        Operands:
````
