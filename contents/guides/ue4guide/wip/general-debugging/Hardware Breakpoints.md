## Overview:

The processor can set up to 4 hardware breakpoints. When windows starts executing a thread, it will set the processors registers according to where the thread was last, and resume exectution, until it decides to move to another thread, it then stores the thread's registers and other information accociated with the thread and switches to another. This allows up to 4 HWBPs per a thread. The processor has 8 debug registeres. This is where understanding the window's paging system and virtual addresses will be helpful.

They are :

DR0 - Linear address of the first breakpoint

DR1 - Linear address of the second breakpoint

DR2 - Linear address of the thrid breakpoint

DR3 - Linear address of the fourth breakpoint

DR4 - Irrelevent to this tutorial, read intel developers manual Vol.3

DR5 - Irrelevent to this tutorial, read intel developers manual Vol.3

DR6 - Irrelevent to this tutorial, read intel developers manual Vol.3

DR7 - Bits representing whether the breakpoint is enabled(locally or globally), the breakpoint's condition, and the breakpoint's size. Along with a few other irrelevent(to this tutorial) variables.

**Processor Breakpoints**

A processor breakpoint is triggered when a specific memory location is accessed. There are four types of processor breakpoints, corresponding to the kind of memory access that triggers it:

<table><thead><tr class="header"><th><strong>Breakpoint type</strong></th><th><strong>Action</strong></th></tr></thead><tbody><tr class="odd"><td><strong>e</strong> (execute)</td><td>Triggered when the processor retrieves an instruction from the specified address.</td></tr><tr class="even"><td><strong>r</strong> (read/write)</td><td>Triggered when the processor reads or writes memory at the specified address.</td></tr><tr class="odd"><td><strong>w</strong> (write)</td><td>Triggered when the processor writes memory at the specified address.</td></tr><tr class="even"><td><strong>i</strong> (i/o)</td><td>Triggered when the I/O port at the specified <em>Address</em> is accessed.</td></tr></tbody></table>

*From &lt;<https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/processor-breakpoints---ba-breakpoints->>*
