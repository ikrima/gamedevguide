## DSL/Compiler

![clojure-compiler-flow.png](../../_assets/dev-notes/clojure-compiler-flow.png)

* reader: parser that should use treesitter for

* clojure.tools.analyzer: generates AST from clojure syntax. syntax form -> node hashmap

* ferret

* Tools/libs

  * clojure.tools.analyzer: https://github.com/clojure/tools.analyzer
  * https://github.com/stuartsierra/dependency
  * Terra (Lua metaprogramming layer over C ): [http://terralang.org/](http://terralang.org/)
  * Gamma  (clj > glsl compiler): https://github.com/kovasb/gamma
  * https://github.com/thi-ng/shadergraph
  * tree shaping
    * Instaparse: https://github.com/Engelberg/instaparse
    * https://lambdaisland.com/blog/2018-11-26-art-tree-shaping-clojure-zip
    * https://clojuredocs.org/clojure.core/tree-seq
    * https://github.com/clojure/core.match
    * clojure enlive
  * treesitter implementations:
    * https://github.com/sogaiu/tree-sitter-clojure
    * https://www.reddit.com/r/Clojure/comments/fkc6uv/is_anyone_working_on_a_treesitter_parser_for/fksmf67?utm_source=share&utm_medium=web2x
    * https://github.com/oakmac/tree-sitter-clojure
