---
sortIndex: 1
sidebar: ue4guide
---

# Blueprint Compilation

## Terminology

- FKismetCompilerContext: The class that does the work of compilation.  A new instance is spawned for each compile.  Stores reference to the class being compiled, the blueprint, etc.
- FKismetFunctionContext: Holds the information for compiling a single function, like a reference to the associated graph, properties, and generated UFunction
- FNodeHandlingFunctor: A helper class that handles processing one class of node in the compiler (singleton!).  Contains functions for registering pin connections, and generating Kismet compiled statements
- FKismetCompiledStatement: Unit of work in the Kismet compiler.  The compiler translates nodes into a set of compiled statements, which the backend translates into bytecode operations
  Examples:  Variable assignment, Goto, Call
- FKismetTerm: A terminal in the graph (literal, const, or variable reference).  Each data pin connection is associated with one of these!
  You can also make your own in NodeHandlingFunctors for scratch variables, intermediate results, etc.
- Data-Only Blueprints are not recompiled when loaded
- Two Classes
  - Generated Class:  The class used by instances of the blueprint.  Contains all the UProperties and UFunctions defined by the blueprint, as well as generated script bytecode
  - Skeleton Generated Class:  A minimal version of the generated class, which contains all the UProperties and UFunctions defined by the blueprint, but with no script bytecode
- Why Two Classes?
  - The Skeleton Generated Class (SGC) is used internally by the blueprint editor Serves as a “class header,” which the editor uses to create editing UI
  - Kept up-to-date as you edit the blueprint via a quick compile path (`MarkBlueprintAsStructurallyModified()`)
  - Never used or referenced outside of the blueprint itself
  - Currently serialized, but will soon become transient

## Compilation Process

1. Clean the Class
   - `CleanAndSanitizeClass()`: we move the properties and functions off the class and into a trash class in the transient package, and clear any data on the class

2. Create Class Properties
   - Iterates over the blueprint’s NewVariables array, as well as some other places (construction scripts, etc) to find all of the UProperties needed by the class
   - Creates UProperties on the Uclass’s scope in the function `CreateClassVariablesFromBlueprint()`

3. Create Function List
   - Process the event graphs
     - CreateAndProcessUberGraph()
       - Copies all event graphs into one big graph
       - Nodes are given a chance to expand
       - For each Event node in the graph, a function stub is created
         - FKismetFunctionContext is created
   - Process regular function graphs
     - ProcessOneFunctionGraph()
       - Graph is duplicated to a temporary graph
       - Nodes are given a chance to expand
       - FKismetFunctionContext is created
   - After all FKismetFunctionContexts are created, PrecompileFunctions():
     - Schedules execution and calculates data dependencies
     - Prunes any nodes that are unscheduled or not a data dependency
     - Runs the node handler’s RegisterNets() on each remaining node
       - This creates the FKismetTerms for values within the function
     - Creates the UFunction and associated UProperties

4. Bind and Link Class
   - Now that we know all of our UProperties and UFunctions, we can bind and link the class
     - Fills out the property chain, the property size, function map, etc
     - At this point, we essentially have a “class header,” just missing final flags and metadata, as well as a CDO

5. Compile Functions
   - Compiling consists of transforming all the nodes that are left in the graph into FKismetCompiledStatments
   - Accomplished through the node handler’s Compile() function, using AppendStatementForNode()
   - Can create FKismetTerms in the compile function, as long as they are only used locally (intermediate results)

6. Finish Compiling Class
   - Finalizes the class flags
   - Propagates flags and metadata from the parent class
   - Performs a few final checks to make sure everything went alright in the compile

7. Backends Emit Generated Code
   - Backends convert the collection of FKismetCompiledStatments from each function context into code
   - We have two backends in use:
   - FKismetCompilerVMBackend
     - Converts FKCS to UnrealScript VM code
     - Results of this are serialized into the function’s script
   - FKismetCppBackend
     - Emits “C++-like” code for debugging purposes
     - May eventually transform into a legitimate backend, if extra speed is needed

8. Copy Class Default Object Properties
   - Using a special function, CopyPropertiesForUnrelatedObjects(),  or CPFUO for short, we copy the values from the old CDO of the class into the new CDO
     - Properties are copied via tagged serialization, so as long as the names are consistent, they should properly be transferred
     - Components of the CDO are reinstanced, and fixed up appropriately at this stage
   - Currently, the SkeletonGeneratedClass has the authoratative copy of data, which is propagated to the GeneratedClass


9. Reinstancing
   - Since the class may have changed size and properties may have been added or removed, we need to reinstance all objects with the class we just compiled
   - Use a `TObjectIterator` to find all instances of the class, spawn a new one, and then CPFUO to copy from the old instance to the new one
     - For details, see the `FBlueprintCompileReinstancer`


## Extension Points

- Compiler Expansion
  - Very similar to macros, but done internally to the compiler
    - Take the original node, and expand it into a set of new
    - Move connections from the original node to the new
  - Takes place after the graphs have been copied to their transient versions, but before nodes have all been processed
    - Allows new entry points to be created, for event graph nodes
  - Useful when you need some dynamic behavior in your delegates
    - Variable number of inputs or outputs
    - Reliance on some data
  - Check out `FKismetCompilerContext::ExpansionStep()` for examples of its use
  - In general, the original node is disconnected from everything after expansion, and gets culled
    - This means you don’t need to implement a custom FNodeHandlingFunctor class for expanded nodes
  - Can expand conditionally based on if the current compile is a skeleton-only compile
  - We use this internally for many node types
    - Blueprint spawning nodes
    - Timeline nodes
    - Delegate assignment
    - Macros actually get expanded in this step as well!

- Compiler Generated Code
  - Most advanced way to create new functionality in Kismet
  - Because of the complexity, we use it sparingly
  - Requires implementation of a custom `FNodeHandlingFunctor` class
    - `RegisterNets()` gets called once per node, and calls `RegisterNet()` on each pin that needs it (data pins)
    - `Compile()` is called once per node, and creates a list of `FKismetCompiledStatements`, which are then translated to code by the backends
  - For examples, see the custom FNodeHandlingFunctor classes in KismetCompiler.cpp

- Debugging Tools
  - `CompileDisplaysTextBackend` – Shows a human-readable, C++-like output of what the code generator is doing
  - `CompileDisplaysBinaryBackend` – Shows the actual disassembed USVM code


## Useful Links

[Game Connection 2012 Slides - Kismet Architecture and Extension](https://udn.unrealengine.com/storage/temp/1003-extending+kismet.zip)
<https://docs.unrealengine.com/latest/INT/Engine/Blueprints/TechnicalGuide/Compiler/index.html#backendemitsgeneratedcode>