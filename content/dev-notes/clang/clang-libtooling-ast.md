# Clang/LibTooling AST Notes

[Source Reference: https://github.com/pr0g/clang-experiments/blob/main/examples/clang-ast-notes.md](https://github.com/pr0g/clang-experiments/blob/main/examples/clang-ast-notes.md)

[P. Goldsborough “clang-useful: Building useful tools with LLVM and clang for fun and profit"](https://youtu.be/E6i8jmiy8MY)

## Types

* Stmt (statement)
  * examples: if
* Decl (declaration)
  * examples: class, variable, function, enum, values, names,fields, variables
* Expr (expression)
  * derives from statement
* Type (types)
  * type declaration
  * qual type - includes const and volatile specifiers

## Clang Tooling

* libClang (c interface)
  * stable api
* libTooling

### libClang

* cursors - a pointer to a node
* no base class for all types of nodes (no AST node)
* in C++ visitation class is used
* has built in code completion
  * codeCompleteAt (insert a special marker in the AST)
* has a pythonAPI
* very high level
* usually easier to achieve things with libClang

### libTooling

* c++ library
* more powerful
  * clang tidy
    * could add a new plugin to clang-tidy
  * clang plugin
    * dynamic libraries that you build and link into clang when you run it
    * could put it into your build tool, check for linter errorsetc
  * clang tool
    * standalone executable with clang as a library
    * has a main function
    * more power

## Info

* AST Dump - dump out whole AST

## Demo/Example

* Create an index (`CIIndex`) - a structure that will manage all your translation units for you
* `clang_parseTranslationUnit` - important function, gives you back the AST (does all the parsing)
* `CXTranslationUnit` - cursor as well
* `clang_visitChildren` - does the actual visitation (walks the AST)
  * takes `data` (`void*`) data includes filter and the lines (includes some predicates)
  * pattern (regular expression)
  * `clang_getCursorKind` - kind of cursor (e.g. filter for functions)
    * every cursor has a *kind* - it is the c abstraction for *decl*, *statement*, *expression* etc...
  * `clang_Location_isInSystemHeader` - to skip all system headers
  * `clang_getCursorSpelling` - name of the function/class
  * `clang_getSpellingLocation` - find where in the file is this cursor, returns line number, column number and file
  * `CXChildVisit_Recurse` - continue recursing AST
  * `CXChildVisit_Continue` - continue to the next sibling
  * `CXChildVisit_Break` - stop at this point
* libtooling
  * clang tool is made up of three things, an **Action**, a **Consumer** and a **Callback**
  * an **Action** allows you to access the AST at different steps during the compilation
    * e.g. `BeginSourceFileAction` - access file name among other things
    * also `EndSourceFileAction` and `ExecuteAction` (in between)
      * can print something at the end
    * **Consumer** - little boilerplate, creates a matcher - good at finding a specific node in the AST
      * has macros where you can define what you're looking for (e.g. functions)
      * `HandleTranslationUnit` - run our handler on the AST
    * At this point the AST is already parsed
    * Handler - called for every node that matches
    * mccabe index example
    * `buildCFG` - builds a graph consisting of basic blocks
      * computer number of nodes and edges
    * clang Diagnostics (can use for your own tool) - [Emitting Diagnostics in Clang](http://www.goldsborough.me/c++/clang/llvm/tools/2017/02/24/00-00-06-emitting_diagnostics_and_fixithints_in_clang_tools/)
      * create a diagnostics engine in clang
  * include sorting (using the preprocessor)
    * `BeginInvokeAction` - called before any source file is touched
    * can override `InclusionDirective` in class deriving from `clang::PPCallbacks`
    * `Rewriter.ReplaceText` - begin/end
    * `clang::FixItHint` - describe some way of fixing a problem

## Closing

* `clangd` - language server (clang as a service)
  * code completion, linting etc...
* references
  * eli.thegreenplace.net
  * clang.llvm.org/docs/InternalsManual.html
  * llvm.org/docs/ProgrammersManual.html
  * goldsborough.me & github.com/goldsborough
  * github.com/peter-can-talk/cppnow-2017

## Clang Refactoring Talk

[Fred Tingaud “How to Refactor Millions of Line of Code Without Alienating your Colleagues”](https://youtu.be/JPnN2c2odNY)

* clang tidy search foe specific clang-tidy nodes
* Clang Tidy Matcher
  * registerMatchers(MatchFiner\* finder) { finder->addMatcher(MY_MATCHER...); }
  * virtual void check(const MatchFinder::MatchResult& result)

## Clang Tidy Check Talk

[CPPP 2019 - Adding a New clang-tidy Check by the Practice - Jérémy Demeule](https://youtu.be/K-WhaEUEZWc)

* clang-query
  
  * (commands)
  * `set output diag`
  * `enable output detailed-ast`
  * `match translationUnitDecl`
  * `match functionDecl`
  * `match varDecl`
  * `match functionDecl (hasName("hello"))`
  * (introduce alias)
    * `let <name> hasAncestor(functionDecl(hasName("<name>")))`
    * `match callExpr(callee(functionDecl(hasName("<name>"))))`
* clang-tools-extra/clang-tidy
  
  * `./add_new_check.py <category> <name>`
* (in code - clang-tidy check)
  
  * `::registerMatchers`
* `(::check)`
  
  * `const auto* matcherExpr = Result.Node.getNodeAss<CallExpr>("name");`
  * `diag(MatchExpr->getExprLoc(), "message");`
* use .bind to give matcher a name

* run-clang-tidy.py -clang-tidy-binary \<path/to/exe> -checks ...
