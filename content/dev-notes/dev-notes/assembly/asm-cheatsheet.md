# Assembly Cheat sheet

General purpose register conventions:

* R0/RAX: (accumulator) is used in arithmetic operations
* R1/RCX: (counter) is used in the shift and rotate instructions, and used for loops
* R2/RDX: (data) is used in arithmetic and I/O operations
* R3/RBX: (base) used as a pointer to data (specifically as an offset to the DS segment register when in segmented mode)
* R4/RSP: (stack) points to the top of the stack
* R5/RBP: (stack base) points to the base of the stack
* R6/RSI: (source) points to a source in memory for stream operations (e.g. lodsb)
* R7/RDI: (destination) points to a destination in memory for stream operations (e.g. stosb)
* R8
* R9
* R10
* R11
* R12
* R13
* R14
* R15
