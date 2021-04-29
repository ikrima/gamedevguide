# MLIR Useful API/Code Snippets

## IR Traversal

* RegionUtils.h: utilities for usedef traversal
* `CallGraph`: generate callgraph of `CallOpInterface` and `CallableOpInterface` ops
* Block::findAncestorOpInBlock:  Returns 'op' if 'op' lies in this block, or otherwise finds the ancestor operation of 'op' that lies in this block. Returns nullptr if the latter fails.

## Conversion/Pass Utils

* populateDecomposeCallGraphTypesPatterns: get types along callgraph edges; used in bufferize passes
* getEffectsOnSymbol(): override to specify sideeffects on symbols
* CallOpInterfaceLowering: good examples of lowering/conversion 
* Function Signature rewriting: 
  * https://github.com/google/iree/blob/main/iree/compiler/Dialect/Shape/Utils/TypeConversion.h
  * https://llvm.discourse.group/t/rewriting-function-calls-and-signatures/1953/4
* 

## Graph Algorithms

* `scc_iterator`: generate strongly connected nodes
* `ReversePostOrderTraversal`
* `GraphTraits`: traits class to specialize to be able to use llvm graph algorithms
* `DirectedGraph`: directed graph class
* `GraphWriter`: graph emitter
* BreadthFirstIterator.h

---

BarePtrFuncOpConversion

getBranchSuccessorArgument

verifyBranchSuccessorOperands
verifyTypesAlongControlFlowEdges

RegionSuccessor::getSuccessor,isParent,getSuccessorInputs

CallOpOpConversion

struct CallOpSignatureConversion : public OpConversionPattern<CallOp> {

---

generateOpgraphAst
generate Node Ast

* Needs to be an object
  - contains unoptimized code/syntax tree
  - Compile to code instance/funcpointer
  - UI binds to unoptimized version
  * UI modifies AST
    - Generate MLIR
  * MLIR parses unoptimized version
  * MLIR spits out ast of optimized versoin

````
-Code to ast
-Ast to mlir
-mlir to emitted optimized version
````

---

struct TileAndVectorizeWorkgroups
: public PassWrapper\<TileAndVectorizeWorkgroups, FunctionPass> {
void getDependentDialects(DialectRegistry &registry) const override {
registry.insert\<linalg::LinalgDialect, AffineDialect, scf::SCFDialect,
vector::VectorDialect>();
}
void runOnFunction() override;
};
}  // namespace

void TileAndVectorizeWorkgroups::runOnFunction() {

/// Distribute linalg ops among iree.workgroup logical threads.
std::unique_ptr\<OperationPass<ModuleOp>\> createLinalgTileAndDistributePass();

/// Vectorize linalg ops executed in the same iree.workgroup.
std::unique_ptr<FunctionPass> createLinalgTileAndVectorizeWorkgroupsPass();

FuncBufferize
createFuncBufferizePass

Linalgop::DeduplicateInputs
