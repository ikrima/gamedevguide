# Programming Language Theory: Parsing

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

## Insights

- split Tokenizing from Parsing
- LR/LLR/etc is overcomplication. Just write parsers like normal code
