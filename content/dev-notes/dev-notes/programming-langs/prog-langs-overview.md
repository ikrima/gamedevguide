# Programming Langs

# Resource Dump

* Guide: [https://tomassetti.me/domain-specific-languages/](https://tomassetti.me/domain-specific-languages/)
* Big resource dump: [https://tomassetti.me/resources-create-programming-languages/](https://tomassetti.me/resources-create-programming-languages/)

# Foundation Resources

* Language Implementation Patterns

* Domain-Specific Languages

* DSL Engineering: Good practical
  
  * Debugging
  * Editor services
* Programming Language Design

* **Design Concepts in Programming Languages**
  if you want to make deliberate choices in the creation of your programming language, this is the book you need. Otherwise, if you don’t already have the necessary theoretical background, you risk doing things the way everybody else does them. It’s also useful to develop a general framework to understand how the different programming languages behave and why.

* **Tiny Compiler**: ultra-simplified example of all the major pieces of a modern compiler written in easy to read JavaScript
  [https://the-super-tiny-compiler.glitch.me/intro](https://the-super-tiny-compiler.glitch.me/intro)

* [http://dsl-course.org/](http://dsl-course.org/)

* Programming Language Pragmatics, (more a full blown reference)
  the most comprehensive book to understand contemporary programming languages. It discusses different aspects, of everything from C# to OCaml, and even the different kinds of programming languages such as functional and logical ones. It also covers the several steps and parts of the implementation, such as an intermediate language, linking, virtual machines, etc.

## Reading list linkdump

* Language Implementation Patterns 
  [http://index-of.es/Programming/Pragmatic Programmers/Language Implementation Patterns.pdf](http://index-of.es/Programming/Pragmatic%20Programmers/Language%20Implementation%20Patterns.pdf)

* [https://the-super-tiny-compiler.glitch.me/intro](https://the-super-tiny-compiler.glitch.me/intro)

* DSL Engineering [http://voelter.de/dslbook/markusvoelter-dslengineering-1.0.pdf](http://voelter.de/dslbook/markusvoelter-dslengineering-1.0.pdf)

* [http://web.eecs.umich.edu/~bchandra/courses/papers/Turbak_6.821/book.pdf](http://web.eecs.umich.edu/~bchandra/courses/papers/Turbak_6.821/book.pdf)

* [http://alvand.basu.ac.ir/~dezfoulian/files/PL/John Wiley & Sons - Programming Language Design Concepts- David A. Watt, William Findlay, 473s, I.pdf](http://alvand.basu.ac.ir/~dezfoulian/files/PL/John%20Wiley%20&%20Sons%20-%20Programming%20Language%20Design%20Concepts-%20David%20A.%20Watt,%20William%20Findlay,%20473s,%20I.pdf)

# Discussion: Making Programming Language Parsers, etc

[https://www.youtube.com/watch?v=MnctEW1oL-E](https://www.youtube.com/watch?v=MnctEW1oL-E)

## Insights

* Error messages are the user interface to your programming language
* Most powerful thing you have is flow-control in a language

## Guides

* Don't make types at compile time
* Split Tokenizing from Parsing
* LR/LLR/etc is overcomplication. Just write parsers like normal code

# Notes

## Parsing/ASTs

* Different AST types
  
  * Homogenous: one type of node `class ASTNode`
  * Normalized Heterogenous: `class Expr : public ASTNode { vector<ASTNode*> children; };`
  * Irregular Heterogenous: named nodes `class BinaryExpr : public Expr { Expr* left, right; };`
* Tree walkers
  
  * Tree Grammar: use grammar to generate walkers
    * Forced visitation order
    * useful for when every subtree must be touched (like codegen)
  * Tree Pattern Matcher: specifies patterns we care about
    * different phases of application care about different parts of tree
    * decouples order we apply tree patterns from tree patterns themselves
    * useful for term re-writing (change multiply to simd multiply)
* Traversal orders
  
  * Preorder
  * In-order
  * Postorder
