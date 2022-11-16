# Assembly Cheatsheet

## Register conventions

- General registers
  - Data registers: used for arithmetic, logical, and other operations
    - AX: the primary accumulator
    - BX: base register
    - CX: count register
    - DX: data register
  - Pointer registers
    - IP: Instruction Pointer
    - SP: Stack Pointer
    - BP: Base Pointer
  - Index registers
- Control registers
- Segment registers

### General Purpose Registers

|Register|Usage|Description|
|--------|-----|-----------|
|`rax/r0`|accumulator|used for input/output and most arithmetic instructions|
||return value|holds function return value|
||syscall number|holds syscall number argument for syscall instruction|
|`rbx/r3`|base for index addressing|used as memory address base for indexed addressing|
|`rcx/r1`|counter for iteration|used for holding loop count in loops|
||this|storing `this` pointer in c++|
|`rdx/r2`|data|used in arithmetic and I/O operations|
|`rdi/r7`|destination index|used in stream operations e.g. `stosb`|
|`rsi/r6`|source index|used in stream operations e.g. `lodsb`|
|`rsp/r4`|Stack pointer|points to the top of the stack|
|`rbp/r5`|Frame pointer|points to the frame's base of stack|
|`rn`|Numbered (n=8..15)||
|`xmm0-15`|128 bit floating point||
|`rip`|instruction pointer|points to next instruction to execute|

### Control Registers

|Register|Description|
|--------|-----------|
|CF|carry flag condition code register|
|ZF|zero flag condition code register|
|SF|sign flag condition code register|
|OF|overflow flag condition code register|

- Condition Code registers are single bit registers
  - implicitly set by arithmetic instructions
    - Ex: `addl a,b` where t is result value
    - CF set if unsigned overflow
    - ZF set if result is zero
    - SF set if result \< 0
    - OF set if signed overflow `(a>0 && b>0 && t<0) || (a<0 && b<0 && t>=0)`
  - explicitly set by compare instruction
    - `cmp a,b` uses sets same flags as `a-b` instruction but without setting destination

### Segment Registers

|Register|Description|
|--------|-----------|
|CS|Code segment|
|SS|Stack segment|
|DS|Data segment|
|ES|Extra data segment|
|FS|Points to Thread Information Block (TIB)|
|GS|Extra data segment|

## Register Operands

|Operand|Description||
|-------|-----------|--|
|Immediate|numeric constant value|0x234 or 48|
|Register|general purpose register|`rax`|
|Memory|value stored at \[reg + reg\*scale + offset\] address|scale is 1, 2, 4, or 8 only|
||value stored at \[offset\]|`[2344]`|
||value stored at \[reg\]|`[rax+4]` or C analogue of `*(rax+4)`|
||value stored at \[reg + offset\]|`[rax+4]` or C analogue of `*(rax+4)`|
||value stored at \[reg + reg\*scale\]|`[rax+4]` or C analogue of `*(rax+4)`|
||value stored at \[reg + reg\*scale + offset \]|`[rax+rbx*4]` or C analogue of `*(rbx*4+rax)`|

|Register Data|Suffix|Definition instruction|
|-------------|------|----------------------|
|8 bits  (byte)|b|`db`|
|16 bits (word)|w|`dw`|
|32 bits (dword)|l|`dd`|
|64 bits (qword)|ll|`ddq`/`do`|
|float||`dd`|
|double||`dq`|
|extended precision||`dt`|

- **_NOTE:_** dst can never be an immediate
- **_NOTE:_** src and dst can't both be memory operands
- **_NOTE:_** some assemblers will legalize memory operands through simple algebraic transform
  - e.g. `[rax*5] => [rax*4+rax]`

## Instructions

## Common Instructions

For more common instructions, check out the [Stanford CS107 list](https://web.stanford.edu/class/archive/cs/cs107/cs107.1222/guide/x86-64.html#common-instructions)

|Instruction|Arguments|Explanation|
|-----------|---------|-----------|
|**mov**|src, dst|dst = src|
|**add**|src, dst|dst += src|
|**sub**|src, dst|dst -= src|
|**cmp**|a, b|b-a set flags|
|**jmp**|label|jump to label|
|**je**|label|jump if equal (ZF=1)|
|**jne**|label|jump not equal (ZF=0)|
|**jg**|label|jump > (ZF=0)|
|**push**|src|add to top of stack|
|**pop**|dst|remove top from stack|
|**call**|fn|push %rip, jmp to fn|
|**ret**||pop %rip|

### Conditionals

`cmp op1, op2` -> mimics `sub op1, op2` but only changes the zero and carry flag for comparing

- Prefixes
  
  - `j~ x`:       jump to x if ~
  - `cmov~ x, y`: conditional mov x, y if ~
  - `setc~ x`:    set x to 1 if ~, x is 8 bit reg
- Many suffixes
  
  - `a`:  above, >
  - `ae`: above or equal, >=
  - `b`:  below, \<
  - `be`: below or equal, \<=
  - `e`:  equal, =
  - `ne`: not equal, !=

## Calling Convention

### Linux/OS X

- function parameters passed in registers
  - ints/pointers: `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9`
  - floats/doubles: `xmm0`, `xmm1`, `xmm2`, `xmm3`, `xmm4`, `xmm5`, `xmm6`, `xmm7`
- additional parameters get pushed on the stack in reverse order (must be cleaned up by caller)
- return values are stored in `rax/xmm0` for int/float
- stack pointer `rsp` must be aligned to 16-byte boundary before invocation
  - call instruction pushes the return address (8 bytes) which unaligns `rsp`
  - must manually align by pushing or subtracting 8 from `rsp`
- callee-saved registers: `rbp`, `rbx`, `r12`, `r13`, `r14`, `r15`

```asm
extern putchar
mov rdi,'H' ; function parameter: one char to print
call putchar
```

### Windows

- function parameters passed in registers: `rcx`, `rdx`, `r8`, `r9`
- must allocate 32 bytes of shadow stack space
- callee-saved registers: `rbx`, `rbp`, `rdi`, `rsi`, `rsp`, `r12`, `r13`, `r14`, `r15`, `xmm6..xmm15`

```asm
sub rsp,32+8; parameter area, and stack alignment
extern putchar
mov rcx,'H' ; function parameter: one char to print
call putchar
add rsp,32+8 ; clean up stack
```

## Reference

[NASM Tutorial](https://cs.lmu.edu/~ray/notes/nasmtutorial)
[Some Assembly Required: An approachable introduction to assembly](https://github.com/hackclub/some-assembly-required)
