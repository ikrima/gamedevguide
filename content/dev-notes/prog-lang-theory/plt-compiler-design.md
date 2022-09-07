# Programming Language Theory: Compiler design

## Meta Tracing

### Idea

Write an interpreter and get a JIT for free by trace the execution of an interpreter and JIT the trace

- **Insight:** interpreter is simply a large loop: load the next instruction, perform the associated actions, go back to the beginning of the loop.
- **In Practice:** bimodal performance leads people to prefer method based JITs instead

### Details

VM consists of two interpreters: _language interpreter_ and _tracing interpreter_

- **language interpreter**
  - normal interpreter of language
- **tracing interpreter**
  - second representation of the interpreter that creates traces
  - when a hot loop is detected, insert marker
  - on next loop execution, tracing interpreter used to record each action
  - the execution trace is then JIT'ed into machine code that subsequent loop executions will use
  - tracing interpreter automatically inserts guard checks to verify trace preconditions/code-paths taken match the JIT'ed code
  - if guard fails, execution falls back to the tracing interpreter for the rest of that bytecode, and then back to the language interpreter
  - only need two meta functions for the JIT
    - `can_enter_jit`: mark hot loop entry and generate machine code
    - `jit_merge_point`: mark when it can switch to an existing machine code version of a loop.

### Issues

- unpredictable performance (very bimodal, either super fast or super slow)
- great for tight, non-branchy code terrible at branchy code
  - optimizing only single code-path at a time
  - if a trace guard fails
    - execution must use the very slow tracing interpreter for remainder of bytecode (might be very long)
    - then switch back to the language interpreter for subsequent bytecode
- fundamental issue is that no way of knowing which code is likely to branch unpredictably until it actually does so
  - Example: AST type checker, calling a function `_preorder(x)` which, using reflection, dispatches to a function which can handle that AST type

### References

- [Detailed Explanation](https://tratt.net/laurie/blog/entries/fast_enough_vms_in_fast_enough_time.html)

### Lua

- Allocation Sinking: <http://wiki.luajit.org/Allocation-Sinking-Optimization>
- Mike Pall Comments on LuaJIT & tracing JIT compilers:
  - <http://lambda-the-ultimate.org/node/3851>
  - <https://www.reddit.com/user/mikemike/comments>

## Query Based Compilers

### Overview

Instead of linear batch pass, implement compiler as a database that can be queried

- queries e.g. `type_of` are implemented as deterministic pure functions that explicitly declare their dependencies/outputs
- compilation becomes just a big pure function
- aim is to allow for incremental computation
- internally,
  - just a big lazily constructed data dependency DAG
  - queries are memoized for performance
  - simple idea but lots of complex nuance implementation around memoization
    - dependency/partial change tracking
    - caching
    - efficient result cloning e.g. structural sharing
    - cycle detection
    - enforcing determinism
    - etc

### References

- [rustcc](https://rustc-dev-guide.rust-lang.org/query.html)
  - [Detailed Design Doc](https://github.com/nikomatsakis/rustc-on-demand-incremental-design-doc/blob/master/0000-rustc-on-demand-and-incremental.md)
- [Overview And Use in Sixten](https://ollef.github.io/blog/posts/query-based-compilers.html)
- [Salsa](https://github.com/salsa-rs/salsa): a generic framework for on-demand, incrementalized computation. Inspired by adapton, glimmer, and rustc's query system.

## Symbolic Assembly

Symbolic Assembly: Using Clojure to Meta-program Bytecode - Ramsey Nasser: <https://www.youtube.com/watch?v=eDad1pvwX34>
The Language of the Language: Comparing compiler construction in Clojure and F# - Ramsey Nasser <https://www.youtube.com/watch?v=t8usj1fN9rs>

## Example Repos

- Symbolic bytecode
  - <https://github.com/nasser/mage>
  - <https://github.com/nasser/magic>
  - <https://github.com/kovasb/gamma>
