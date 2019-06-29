---
sortIndex: 2
---

# Source code

Use these repositories to get a sense of what windows might be doing underneath the covers

- **ReactOS:** <https://doxygen.reactos.org/>
- **WineHQ:**

# Resources

- **OSR Community:** <https://www.osr.com/developer-community/>

# Windows Syscall Notes

## Ntxxx vs Zwxxx

- These are tiny syscall wrappers that enter the kernel
  - User Mode initiated syscalls: are synonyms
  - Kernel Mode drivers: handle parameters differently

## Function Prefixes

Reference from <https://www.codemachine.com/article_ntoskrnl_component_list.html>

| Prefix | Function                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| Cc     | Cache manager                                                                                                            |
| Cm     | Configuration manager; registry implementation                                                                           |
| Csr    | Client Server support functions(LPC; related: CSRSS.EXE)                                                                 |
| Dbg    | Debugger support functions                                                                                               |
| Etw    | Extended tracing ... support functions (???)                                                                             |
| Ex     | Executive                                                                                                                |
| Fs     | File system support functions                                                                                            |
| Hal    | Hardware abstraction layer functions                                                                                     |
| Inbv   | Something like: \_In_itial \_B_oot \_V_ideo functions (???)                                                              |
| Io     | I/O manager support functions                                                                                            |
| Kd     | Kernel debugger support functions                                                                                        |
| Ke     | Ki = Kernel External/Internal                                                                                            |
| Ks     | Kernel Streams                                                                                                           |
| Ldr    | PE image loader support functions                                                                                        |
| Lpc    | LPC support functions                                                                                                    |
| Lsa    | Local security authority support functions                                                                               |
| Mm     | Memory manager support functions                                                                                         |
| Nt     | NT Native API/Syscall implementations                                                                                    |
| Nls    | Native language support functions                                                                                        |
| Ob     | Object manager functions                                                                                                 |
| Pfx    | Name prefix support functions /container for strings                                                                     |
| Po     | Power management support functions                                                                                       |
| Ps     | Process management support functions                                                                                     |
| Rtl    | Runtime library functions (called from usermode;equiv of implementations of the c-runtime)                               |
| Rtlp   | Private runtime library functions                                                                                        |
| Se     | Security support functions                                                                                               |
| Tm     | Transaction manager                                                                                                      |
| Wmi    | Windows management instrumentation support functions                                                                     |
| Vf     | Driver verifier function                                                                                                 |
| Zw     | Zero Warranty (Native API equiavlents for driver; tiny pieces of code which call syscalls, thus re-entering the kernel.) |
