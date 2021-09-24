# Nim

# Resources

* Tuts
  * [https://nim-lang.org/docs/tut3.html](https://nim-lang.org/docs/tut3.html)
  * Debugging: [https://github.com/pragmagic/vscode-nim/issues/65](https://github.com/pragmagic/vscode-nim/issues/65)
  * Nim In Actionn: Metaprogramming - [https://livebook.manning.com/book/nim-in-action/chapter-9/](https://livebook.manning.com/book/nim-in-action/chapter-9/)
* Disabling GC: [https://forum.nim-lang.org/t/5238](https://forum.nim-lang.org/t/5238)
* Nim for C Programmers: [https://github.com/nim-lang/Nim/wiki/Nim-for-C-programmers](https://github.com/nim-lang/Nim/wiki/Nim-for-C-programmers)
* Nim Html DSL: [https://github.com/flyx/emerald](https://github.com/flyx/emerald)
* Nim2C: [https://github.com/nim-lang/c2nim/blob/master/doc/c2nim.rst](https://github.com/nim-lang/c2nim/blob/master/doc/c2nim.rst)
* Picasso - multithreading runtime [https://github.com/nim-lang/RFCs/issues/160](https://github.com/nim-lang/RFCs/issues/160)
* Nim language creator: [https://www.youtube.com/watch?v=-9SGIB946lw](https://www.youtube.com/watch?v=-9SGIB946lw)
* DSL stuff
  * pattern matching [https://github.com/alehander92/gara](https://github.com/alehander92/gara)
    * alternate:: [http://andreaferretti.github.io/patty/](http://andreaferretti.github.io/patty/)

# Macro Codegen

* dumpTree, dumpAstGen, dumpLisp, dump

* expandMacros

* treeRepr, repr, lispRepr
  
  ````python
  macro myAssert(arg: untyped): untyped =
    echo arg.treeRepr
  ````
  
  * see generated code
  ````python
  macro myAssert(arg: untyped): untyped =
  # all node kind identifiers are prefixed with "nnk"
    arg.expectKind nnkInfix
    arg.expectLen 3
    # operator as string literal
    let op  = newLit(" " & arg[0].repr & " ")
    let lhs = arg[1]
    let rhs = arg[2]
  
    result = quote do:
      if not `arg`:
        raise newException(AssertionError,$`lhs` & `op` & $`rhs`)
    echo result.repr
  ````

* staticRead & staticExec to read files/process at compile time

* `do notation` multiple code blocks to macros [https://nim-lang.org/docs/manual_experimental.html#do-notation](https://nim-lang.org/docs/manual_experimental.html#do-notation)

* parseStmt & parseExpr

* `getAst` (pass macro or template), `quote do:` pass statements/expressions, code inside the body of quote can be substituted by surrounding it with backticks.

* extraction from ast nodes
  
  * name(x) - name of proc
  * body(x) - body
  * createProcType
  * typeof

![NimAstTable.png](../_assets/dev-notes/NimAstTable.png)

# Nim Script

* runtime eval of nim subset
* [https://nim-lang.github.io/Nim/nims.html](https://nim-lang.github.io/Nim/nims.html)
* [https://peterme.net/how-to-embed-nimscript-into-a-nim-program-embedding-nimscript-pt-2.html](https://peterme.net/how-to-embed-nimscript-into-a-nim-program-embedding-nimscript-pt-2.html)

## **References:**

* [https://livebook.manning.com/book/nim-in-action/chapter-9/304](https://livebook.manning.com/book/nim-in-action/chapter-9/304)
* [https://flenniken.net/blog/nim-macros/](https://flenniken.net/blog/nim-macros/)
* [https://nim-by-example.github.io/macros/](https://nim-by-example.github.io/macros/)
* [https://nim-lang.org/blog/2018/06/07/create-a-simple-macro.html](https://nim-lang.org/blog/2018/06/07/create-a-simple-macro.html)
* [https://hookrace.net/blog/introduction-to-metaprogramming-in-nim/#macros](https://hookrace.net/blog/introduction-to-metaprogramming-in-nim/#macros)

# Nim DSL

* [https://github.com/mratsim/compute-graph-optim](https://github.com/mratsim/compute-graph-optim)
* [https://github.com/numforge/laser/tree/master/laser/lux_compiler](https://github.com/numforge/laser/tree/master/laser/lux_compiler)
* [https://github.com/numforge/laser/tree/master/laser/lux_compiler/core](https://github.com/numforge/laser/tree/master/laser/lux_compiler/core)
* [https://github.com/numforge/laser/blob/master/laser/lux_compiler/core/lux_types.nim#L14-L132](https://github.com/numforge/laser/blob/master/laser/lux_compiler/core/lux_types.nim#L14-L132)
* [https://github.com/mratsim/compute-graph-optim/blob/master/arraymancer_discussion_347.md#semantic-pass-and-the-extension-problem](https://github.com/mratsim/compute-graph-optim/blob/master/arraymancer_discussion_347.md#semantic-pass-and-the-extension-problem)
* [https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/support/emulate_classes_with_ADTs.nim](https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/support/emulate_classes_with_ADTs.nim)
* [https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/physics/materials.nim#L91-L96](https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/physics/materials.nim#L91-L96)
* [https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/physics/core.nim#L24-L28](https://github.com/mratsim/trace-of-radiance/blob/master/trace_of_radiance/physics/core.nim#L24-L28)

# Useful Libraries/links

* https://github.com/zevv/npeg

* https://nim-lang.org/docs/nimc.html#compiler-usage-generated-c-code-directory

* https://github.com/nim-lang/c2nim/blob/master/doc/c2nim.rst#embedding-nim-code

* https://github.com/nim-lang/c2nim/blob/master/doc/c2nim.rst#embedding-nim-code

* https://github.com/nimterop/nimterop

* https://github.com/nimterop/nimterop/wiki/Wrappers

* Parsing
  
  * https://github.com/loloicci/nimly
  * https://forum.nim-lang.org/t/3881
* Learning
  
  * Basics
    https://nim-lang.org/learn.html
    https://livebook.manning.com/book/nim-in-action/chapter-8/45
    https://nim-lang.org/docs/theindex.html#toSeq
    https://nim-lang.org/docs/manual.html#types-object-variants
    https://nim-lang.org/docs/nimc.html
    https://nim-lang.org/docs/manual_experimental.html
    https://nim-lang.org/docs/nims.html
    https://nim-lang.org/docs/tut1.html#basic-types-strings
    https://nim-lang.org/docs/tut2.html#object-oriented-programming-inheritance
    https://nim-lang.org/docs/tut3.html#introduction-code-blocks-as-arguments
    https://scripter.co/notes/nim/#accessing-tuple-fields
    https://scripter.co/notes/nim-fmt/#fmt-and-amp
    https://scripter.co/notes/string-fns-nim-vs-python/#starts-ends-with
    https://nim-lang.org/docs/typetraits.html#genericHead%2Ctypedesc
    https://nim-lang.org/docs/sugar.html
    https://nim-lang.org/docs/sexp.html#SexpParser
    https://nim-lang.org/docs/tables.html#initOrderedTable,int
    https://nim-lang.org/docs/macros.html#children.i%2CNimNode
    https://nim-lang.org/docs/filters.html
    \[https://nim-lang.org/docs/tables.html#\[\],OrderedTable\[A,B\],A\]
    https://nim-lang.org/docs/typeinfo.html#fields.i%2CAny
    https://github.com/zero-functional/zero-functional#filter
    https://github.com/zero-functional/zero-functional/blob/master/test.nim
    https://github.com/zer0-star/matsuri
    https://github.com/zer0-star/matsuri/blob/master/examples/figures.nim
    https://github.com/alehander92/gara
    https://github.com/nim-lang/Nim/wiki/Tips-and-tricks
    https://totallywearingpants.com/posts/nim-language-highlights/
  * Meta programming
    * https://nim-by-example.github.io/macros/
    * https://flenniken.net/blog/nim-macros/
    * https://livebook.manning.com/book/nim-in-action/chapter-9/1
    * https://nim-lang.org/blog/2018/06/07/create-a-simple-macro.html
    * https://hookrace.net/blog/introduction-to-metaprogramming-in-nim/#macros
    * https://nim-lang.github.io/Nim/nims.html
    * https://peterme.net/how-to-embed-nimscript-into-a-nim-program-embedding-nimscript-pt-2.html
