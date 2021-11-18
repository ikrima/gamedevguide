# Programming Language Theory: Basic Concepts

* **syntax:** form of programs i.e. arrangement of expressions, commands, declarations, and other constructs that constitute well-formed program
* **semantics:** meaning of programs: how a well-formed program may be expected to behave when executed on a computer
* **pragmatics:** intended way language to be used in practice
* **Front-end Phases**
  * **lexer: lexical analysis: text → tokens:** tokenize character stream into tokens
  * **parser: syntax analysis: tokens → CST:** build concrete syntax tree based on grammar from tokens
  * **semantic analyzer: semantic analysis: CST → IR:** build intermediate representation
    * **build AST:** reduce CST into abstract syntax tree
    * **annotate AST:** decorate AST with semantic attributes (e.g type, scope)
    * **static analysis:** enforce static language semantics
    * **create IR:** create intermediate representation, possibly annotated with dynamic semantics

## Language Constructs

* programs manipulate **symbols**, which are named **values** with a **type**, through operations expressed by **language semantics** using a **type system**
* the **language semantics** typically defined in a bottom-up fashion
  * values
  * identifiers
  * entities
    * variables
    * constants
    * types
  * expressions
  * statements
  * compound statements
  * methods
  * program

### Intrinsic/Meta Constructs

* **identifier:** a unique name within a given *environment context*
* **attribute:** semantic aspect
  * may be **static** (compile time determined) or **dynamic** (determined at execution time)
    ````c++
    int x;
    type     := static
    value    := dynamic
    location := static if global variable, otherwise dynamic
    ````
  
  * some common attributes
    * *type attribute:* type identifier of entity
    * *literal attribute:* value that has no memory
    * *location attribute:* address of storage cell in store
    * *visibility qualifier attribute:* determines if a identifier can be reached outside of its scope (e.g. field/method names in C++)
      * also for variable shadowing precedence
      * qualifiers may be needed to make otherwise invisible names to be visible in a scope. Eg:
        * local var superceding global var
        * names in other packages
        * private members in classes
* **entity:** collection of **attributes** that define semantics of a language construct.
  * **entity category:** defines type of language entity i.e. set of attributes + supported operations
  * simple implementation treats entities as sumtypes with entity category as the sumtype tag
  * some common entities:
    * *constant entities:* type attribute, value attribute
    * *variable entities:* type attribute, location attribute
    * *function entities:* signature attribute, implementation attribute
* **symbol:** identifier used as a typed reference to program entities minimally containing
  * analogue of pointers to values
    
    |analogue|pointer|symbol|
    |--------|-------|------|
    |semantic|reference to value|reference to program entity|
    |representation|64bit integer|string|
    |denotes|memory address|entity|
    |type|points to values of type T|points to entities of entity category C|
    |dereferencing|based on pointer type + runtime state e.g. memory address in heap, offset in stack frame, device handle, etc|based on *name binding* + *environment context*|
    |using unbound instance behavior|pointer is uninit or null => null-deref/wild-pointer crash|symbol binding is not in scope => compilation error if static scoped language/runtime crash if dynamic scope|
  
  * **identifier attribute:** (possibly scope qualified) name of symbol
  
  * **entity category:** language entity tag implies set of attributes to expect

### Homoiconicity

* **homoiconic languages** require the language constructs to also be in the type system to be able to support "code as data" manipulations
  
  * **symbol table:** abstract data structure maintaining/mapping **symbol → entity** bindings
  * Example of Julia
    * [how julia is homoiconic?](https://stackoverflow.com/questions/31733766/in-what-sense-are-languages-like-elixir-and-julia-homoiconic/31734725#31734725)
    * [what is a julia symbol?](https://stackoverflow.com/questions/23480722/what-is-a-symbol-in-julia)

### Values/Types

* **value**: an abstraction of an entity that can be manipulated by a program
  * **first class citizen:** can be parameter, returned from method, and assigned to variable (ex: int type)
  * **second class citizen:** can be parameter, but not returned from method or assigned to variable
  * **third class citizen:** can't be parameter
* **type:** a set (in the math sense) of values with supported set of operations
  * **primitive types:** set of values that can't be decomposed into simpler values e.g. int, bool, char, symbol
  * **compound types:** constructed from other types using **type constructor expression**
    * **product types:** cartesian product of types
      * *untagged:* tuple, components identified by index
      * *tagged:* associated identifier with each component
    * **sum types:** set union of types
    * **function types:** T1 → T2 is a function type takes one argument of type T1 and returns type T2
    * **array types:** `array(elememtType,range)`
    * **pointer types:** `ptr(elementType)`
    * **recursive type:** defined in terms of itself
* **type system:** groups values into types
  * **statically typed:** each variable and expression has a fixed type (implying all operands can be type-checked at compile-time)
  * **dynamically typed:** values have fixed types, but variables & expressions have no fixed types
    * every time operand is computed could yield a value of a different type
    * operands must be type-checked after they are computed, but before performing the operation
  * **type equivalence:**
    * **Structural equivalence:** two types have same identical type expressions
      * array ranges usually not considered as part of the type
      * record labels are considered part of the type
    * **Name equivalence:** have the same identifier
    * **Declaration equivalence:** declarations lead back to the same original type expression by a series of redeclarations

### Expressions

* **expression:** a construct that will be evaluated to yield a value
  * **literals:** denotes a fixed value of some type
  * **constructions:** expression that constructs a composite value from its component values
  * **function calls:** computes a result by applying a method to one or more arguments
    * usually of form `F(E1,...,En)`: F => the method, E1...En => expressions evaluated for each argument
    * operator may be thought of as denoting a function
  * **conditional expressions**
  * **iterative expressions**
  * **constant and variable accesses**
  * **expressions with side effects**
  * **block expressions**

### Statements

* **statements:** construct to execute to update variables i.e. commands
  * **primitive statements:**
    * **noop:** useful mainly for conditionals (e.g. C++ `;`)
    * **assignments:** usually form \`V = E;’ E => expression yielding a value, V => variable access yielding variable reference (i.e. storage location)
    * **method invocation:**
  * **composite statements:**
    * **sequential**
    * **collateral**
    * **conditional**
    * **iterative**
  * **note:** language should provide all or most of the above; additional statement forms indication language is probably bloated

## Variables

* **variable**: an entity that abstracts a **storage location**  in an **abstract store** that contains a **value** with **lifetime, assignment, & equality semantics**
  
  * *terminology:*
    
    * they are *units of memory*; often bound to a *symbolic name* but they do not have a "name"
    * *aliasing:* is when multiple *symbols* reference the same variable i.e. storage location
    * they don't have a *type*; variables are *containers for storing values* and the *value* they point to has a *type*. language *semantics* dictate whether variable can be assigned a new value of a different type
    * *l-value:* the variable's unique location in the store e.g. heap memory address
    * *r-value:* the actual value
    * *assignment:* syntactic sugar around addressing/dereferencing + load/store from associated store
      ````cpp
      x = y       := store_update(x.attr['loc'], y.attr['val'])
      operator&() := x.attr['loc']
      operator*() := store_deref(x.attr['loc'])
      ````
  
  * **assignment semantics:** how assigning a composite value to a variable
    
    * **copy semantics:** copies all components of the composite value into the corresponding components of the composite variable
    * **reference semantics:** the composite variable contain a pointer (or reference) to the composite value
  * **equality semantics:** should be consistent with **assignment semantics**
    
    * **copy semantics:** equality tests whether corresponding components of the two composite values are equal
    * **reference semantics:** equality tests whether the pointers to the two composite values are equal
  * **lifetime semantics:** interval between creation/allocation and destruction/deallocated
    
    * *storage space* must be allocated before lifetime start and deallocated after lifetime end
    * *global variable:* lifetime is the program’s run-time.
    * *local variable:* lifetime is an activation of a block
    * *heap variable:* lifetime is arbitrary, but is bounded by the program’s run-time
    * *persistent variable:* lifetime is arbitrary, and may transcend the run-time of any particular program (e.g. file)
* **symbolic constants:** immutable *unaddressable* values i.e. *r-values*
  
  * *implementation detail* if/where they are stored is
    * for performance, might be opcode encoded immediate literal
    * for memory efficiency, stored in program text segment
    * for runtime debugging, might be local variable or stored in data segment
  * *literal:* unnamed symbolic constant

## Storage

* **store:** abstract model of where variables reside composed of **storage cells** with unique location
  
  * **storable value:** the atomic unit that can be stored
    * usually primitive values and pointers are storable e.g. primitive values,pointers
    * composite values are not e.g. structs, arrays, unions, objects
  * **storage cell:** abstraction of atomic addressable unit with semantic **(location,status,content)**
    * **status:** either **allocated** or **unallocated**
    * **location:** unique address to reference this cell
    * **content:** for allocated cells either **storable value** or **undefined**
    * **note:** implementation may implicitly define these (e.g. storage cells in stack frame implicitly allocated, location usually implicit)
  * **dereferencing:** operation that yielding current content of reference
* **pointer:**  entity that abstracts how a *store* addresses *typed storage cells*
  
  * i.e. `(loc: typeof(store::address) where typeof(store_val) == ptr_type)`
  * *note:*  usually heap memory address but not always. ex: generational handles, graphics handles, os file handles

### Implementation

* *variable lifetime* usually determines *storage space allocation*
  * **global variables storage:** static allocation
    * allocation performed at compile time. Compiler translates all names to corresponding location in the code generated by it
    * Ex: all global and static variables in C/C++/Java
  * **local variables storage:** stack allocation in activation frames
    * needed in any language that supports the notion of local variables for methods.
    * Examples: all local variables in C/C++/Java methods and blocks
    * implementation: compiler translates all names to relative offsets from a "activation frame location" of current scope
  * **heap variables storage:** dynamic allocation
    * explicit allocation, freeing e.g., \`malloc/free/new/delete\``
    * explicit allocation, automatic free Java
    * automatic allocation, automatic free Lisp, OCAML

## Bindings

* **environment context:** (possibly named) set of *bindings* that expressions/statements are interpreted in

* **scope:** program text over which declaration/binding is active
  
  * **symbol's visibility attribute:** determines if a identifier can be reached outside of its scope (e.g. field/method names in C++)
  * **namespaces:** named scope and used to qualify an identifier for reference
  * **static scoping:** associations are determined at compile time
  * **dynamic scoping:** associations are determined at runtime
    * usually confusing and doesn't mesh with statically typed languages
    * algebraic effects are an approach to solve downsides of dynamic scoping
  * Usually one of:
    * global
    * package or module
    * file
    * class
    * method
    * block
* **block:** construct that delimits the scope of any declarations within it

* **name resolution:** determining which entity name refers to in a given *environment context* i.e. *dereferencing*

* **binding:** mapping of identifier to an entity and it's associated attributes (e.g. value, variable, etc)
  
  * **binding time:** when the attribute can be computed
    * *(static) definition time:* e.g. boolean, char, type, etc.
    * *(static) implementation time:* e.g. maxint, float, etc.
    * *(static) compile time:* e.g. value of n in `const int n = 5;`
    * *(static) link time:* e.g. definition of function f in `extern int f();`
    * *(static) load time:* e.g. location of a global variable i.e. memory address
    * *(dynamic) execution time:* e.g. location, value of variable
  * **binding storage:** determined by binding time
    * *symbol table:* identifier → static attributes like type
    * *environment context:* identifier → location
    * *memory:* location → value
  * **binding/entity lifetime:** important distinction
    * several key events between between names and their associated entity
      * entity creation/destruction for different entity types like variables, methods, types, etc
      * binding entity creation/destruction
      * binding reactivation/deactivation
    * **binding lifetime:** time between the creation and the destruction of a identifier-to-entity binding
    * **entity lifetime:** time between the creation and destruction of an object is the object's lifetime.
    * **entity lifetime != binding lifetime**
      * binding lifetime \< entity lifetime: in pass-by-ref variable to method, the param_name→variable binding \< variable binding
      * binding lifetime > entity lifetime: in use-after-free bug, identifier-to-entity binding > object
* **declarations** are constructs that bind **identifiers** to **entities** in specific **environment context** denoted by **scopes** delimited by **blocks**
  
  * **declaration:** construct that will be elaborated to produce bindings
    * all declarations produce bindings
    * may have side effects e.g. creating variables
    * **type declarations:** binds an identifier to a type (may define a new type or bind an identifier to an existing type e.g. typedef)
    * **constant declarations:** binds an identifier to a constant value.
    * **variable declarations:** creates a single variable and binds an identifier to that variable
      * **variable renaming:** rebinding that allows an identifier to bind to an existing variable
      * **variable rebinding:** change binding of an existing identifier
    * **method definitions:** binds an identifier to a method
  * **definition:** for a declaration whose only effect is to produce bindings

### Context vs. Scope vs Lifetime

* **environment context** is delimitation of the program with a set of active *name bindings*
  * a property of *program* that may be static or dynamic
  * *static context* portion of program text (aka lexical context)
  * *execution context* consists of current execution point's lexical context plus additional runtime state such as the call stack (aka execution/runtime/calling/dynamic context)
* **scope of binding:** program region where *name* is bound to an *entity*
  * it is the *visibility* of the entity
  * it's *unambiguous* with *static scoping* but not *dynamic scoping*
  * it may not coincide with other scopes. ex: with closures, program may enter/leave a given extent multiple times
  * most commonly it's when a given *name* can refer to a given *variable* i.e. when a *declaration* is in effect but can
* **scope of variable** describes where in program text it may be bound
  * is a property of the variable *name binding*
  * the variable's *name scope* affects its *lifetime*
  * entrance/exit into its scope typically begins/ends its lifetime
* **lifetime/extent** of a variable describes where in program execution it has meaningful value
  * is a *runtime* property of the variable itself
  * is a *subset* of scope and may or may not overlap
    * a name can be bound to a variable but variable's value has not been allocated/assigned. (bug if name binding dereferenced before)
    * a variable may exist but be inaccessible e.g. memory leak bug
    * accessible but not via the given name in given context e.g. persistent value like file
    * binding scope might come into context/out of context repeatedly while variable lifetime is active e.g. closures or static local variable lifetime is duration of program, but

### Implementation

* **symbol table:** names→attributes: - data structure maintaining bindings of names to
  * conventionally static attributes
  * needs to efficiently handle identifier lookup in presence of scope changes
  * usually implemented with hash table + scope stack
    * hashtable handles identifier → attribute lookup
    * top of stack is current scope, bottom is outermost
* **environment context:** (runtime) mapping of variable identifier to location
  * **binding_of:** fn(scope,identifier)->location
  * Ex: `binding_of("local_var_foo") := env.current_scope.stack_bp + local_var_foo.attr["stackOffset"]`
  * dynamic language features require more complicated *environment context* (e.g. walking up activation records for dynamic scoping)
* **store:** runtime equivalent of symbol table (i.e. memory). defines semantics:
  * **value_at:** fn(location) → value : how a location attribute is resolved to a value
  * **value_update:** fn(location,new_val): how a value attribute is copied

## Functions

* **formal parameter:** identifier through which a method can access an argument

* **argument/actual parameter:** value or entity that is passed to a method

* **calling convention:** low level implementation detail of how methods receive/return parameters e.g.
  
  * where (parameters, return values, return addresses, scope links,etc) are placed (registers,stack, memory,etc)
  * coordination details between caller/callee on how new *environment context* is created and restored between invocation/return
* **parameter semantics:** how formal parameter is associated to corresponding argument
  
  * **copy parameter semantics:** binds the formal parameter to a local variable that contains a copy of the argument
    * **copy-in parameter:** (aka pass-by-value) corresponds to an (initialized) variable declaration where identifier is bound to variable
      * on invocation, a local variable is created & initialized with the argument value
      * side effects to local variable only visible within function scope
    * **copy-out parameter:** (aka pass-by-result) no corresponding declaration form
      * argument must be a variable
      * on invocation, a local variable is created but not initialized.
      * on return, local variable’s final value is assigned to the argument variable
    * **copy-inout parameter:** (aka pass-by-copy-restore) no corresponding declaration form
      * the argument must be a variable
      * on invocation, a local variable is created and initialized with the argument variable’s current value
      * on return, local variable’s final value is assigned back to the argument variable
  * **reference parameter semantics:** (aka pass-by-ref) binds the formal parameter directly to the argument itself
    * **constant parameter:** corresponds to a constant definition where an identifier is bound to a first-class value
      * argument must be a value
      * formal parameter bound to the argument value during method
      * Thus any inspection of FP is actually an indirect inspection of the argument value
    * **variable parameter:** corresponds to a variable renaming definition where identifier is bound to an existing variable
      * argument must be a variable
      * formal parameter bound to the argument variable during method
      * Thus any inspection (or updating) of FP is actually an indirect inspection (or updating) of the argument variable

### Implementation

* **activation frame:** bookkeeping data necessary for evaluation of current method
  * space for all local variables
  * space for return address (where execution should resume on exit from the current method)
  * other info such as parameter values, etc.
* **calling convention:** semantics of how activation record stack is managed on entry/exit
* **function prologue/epilogue:** compiler inserted sections into functions that implement activation record push/pop on entry/exit in accordance with calling convention

## Control Flow

* **sequencer** construct to transfer control to **destination**; can implement variety of control flows, with multiple entries and/or multiple exits
  * **jump:** sequencer transferring control to a point denoted by **label**
    * Ex: `jump Foo;`
  * **escape:** sequencer terminating execution of a textually enclosing statement or method
    * allows for single-entry multi-exit control flows
    * Ex: `break;`

### Implementation

* jump/escape must be handle control transfer differently depending on *environment context*
  * within block: nothing to manage
  * out of block: must destroy block's local variables before control transfer
  * out of method: the method’s activation frame must be popped off the stack before control transfer

## Insights

* Error messages are the user interface to your programming language
* Most powerful thing you have is flow-control in a language
* Don't make types at compile time
* **Type Completeness Principle:** No operation should be arbitrarily restricted in the types of its operands
  * motivation: suggests that all types in the language should have equal status
  * good example: `boolean and` operation: argument restriction to bool types is bc intentional not arbitrary
  * bad example: language not allowing functions to be passed as parameters
* **Qualification Principle:** It is possible to include a block in any syntactic category, provided that the constructs in that syntactic category specify some kind of computation
  * ex: **block expression/statement:** where block local declarations are only visible to block expressions/statements
  * ex: **block declaration:** where local declarations D are only used for elaborating subdeclarations E
    * essentially distinguishes between private (local) and public subdeclarations
    * usually disguised as classes/packages, but naked support is uncommon
    * used extensively in Zig where `pub` keyword delimits what is public or not
* **The Abstraction Principle:** It is possible to design procedures that abstract over any syntactic category, provided only that the constructs in that syntactic category specify some kind of computation.
  * motivation: encourage abstraction over other syntactic categories such as abstracting over declarations, types
  * ex: **pure function:** abstracts over an expression
    * has a body that is an expression
    * invocation is an expression that will yield a result by evaluating the function procedure’s body
  * ex: **method:** abstracts over a statements
    * body that is a statement
    * invocation is a statement that will update variables by executing the proper procedure’s body
  * ex: **selector procedure:** abstracting over a variable access (aka property getters/setters)
    * body is a variable access
    * invocation yields a variable by evaluating the selector procedure’s body
* **Correspondence Principle:** For each form of declaration there exists a corresponding parameter semantics
  * motivation: programmers can easily and reliably generalize blocks into procedures.
  * converse is not always true (e.g. copy-out/copy-inout)
  * ex: **copy-in parameter**: corresponds to an (initialized) variable declaration where identifier is bound to variable
  * ex: **constant parameter**: corresponds to a constant definition. In each case, an identifier is bound to a first-class value
  * ex: **variable parameter**: corresponds to a variable renaming definition where identifier is bound to an existing variable

## Reference Material

* Pragmatics oriented resources
  * Ray Toal has excellent notes from his compiler courses 
    * [Languages and Automata I](https://cs.lmu.edu/~ray/classes/pl/)
    * [Languages and Automata II](https://cs.lmu.edu/~ray/classes/cc/)
    * [Programming Language Semantics](https://cs.lmu.edu/~ray/classes/pls/)
  * [Language Implementation Patterns book](http://index-of.es/Programming/Pragmatic%20Programmers/Language%20Implementation%20Patterns.pdf)
  * [Programming Language Design Concepts](http://www.dcc.ic.uff.br/~isabel/LP/D.Watt.pdf): great easily grokkable, pragmatic guide on programming language concepts without heavy theory
  * [Tiny Compiler](https://the-super-tiny-compiler.glitch.me/intro): ultra-simplified example of all the major pieces of a modern compiler written in easy to read JavaScript
  * [Crafting Interpreters](http://www.craftinginterpreters.com/): great practical guide of building end to end interpreter
  * [Compiler Construction: The Art of Niklaus Wirth](../_assets/compiler-construction-the-art-of-niklaus-wirth.pdf)
  * Incremental approach to compiler construction
    * [An Incremental Approach to Compiler Construction](../_assets/incremental-approach-to-compiler-construction.pdf)
    * [Essentials of Compilation: The Incremental Nanopass Approach](../_assets/essentials-of-compilation-incremental-nanopass-approach.pdf)
* Theory oriented resources
  * [Programming Language Pragmatics](https://booksite.elsevier.com/9780124104099/)
    * the most comprehensive book to understand contemporary programming languages
    * discusses different aspects, of everything from C# to OCaml, and even the different kinds of programming languages such as functional and logical ones.
    * covers the several steps and parts of the implementation, such as an intermediate language, linking, virtual machines, etc
  * [Design Concepts in Programming Languages](https://doc.lagout.org/science/0_Computer%20Science/1_Principles%20of%20Programming%20Languages/Design%20Concepts%20in%20Programming%20Languages%20%28MIT%2C%202008%29.pdf): detailed reference for programming language design theory space, how the different programming languages behave and why
  * [Programming language resources](https://tomassetti.me/resources-create-programming-languages/)
* Domain Specific Languages
  * [DSL Guide/Resources](https://tomassetti.me/domain-specific-languages/)
  * [Domain-Specific Languages book](https://martinfowler.com/books/dsl.html)
  * [DSL Engineering: Designing, Implementing and Using Domain-Specific Languages](http://voelter.de/dslbook/markusvoelter-dslengineering-1.0.pdf): good practical guide, covers things like debugging, editor services, etc
  * [DSL course](http://dsl-course.org/): course on creating DSL with language bench
