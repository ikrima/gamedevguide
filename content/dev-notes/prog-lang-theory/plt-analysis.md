# Programming Language Theory: Analysis

## Static Single Assignment

Each variable is (statically, syntactically) assigned only once

### SSA Forms

Conceptually, there's only one true SSA form - the maximal one.
All others are optimizations that generate fewer φ functions, so fewer need to be removed later

* **Minimality Axis:** continuum between fully maximal SSA to fully minimal
  * **Fully maximal:** split every variable at every basic-block boundary, and put φ-functions for every variable in every block
    * crude but most intuitive form for construction with simplest algorithms for both phi insertion and variable renaming phases
    * renaming could process blocks in arbitrary order 
  * **Optimized maximal:** avoiding placing phi functions in blocks with a single predecessor
    * reduces the number of phi functions but complicates renaming
    * requires processing predecessor first for each such single-predecessor block
  * **Minimal for reducible CFGs**
    * Some algorithms (e.g. optimized for simplicity) naturally produce minimal form only for reducible CFGs. 
    * Applied to non-reducible CFGs, they may generate extra Phi functions
    * There're usually extensions to such algorithms to generate minimal form even for non-reducible CFGs too (but such extensions may add noticeable complexity to otherwise "simple" algorithm)
  * **Fully minimal:** no superfluous phi functions based only on graph properties of the CFG
* **Prunedness Axis:**
  * **Pruned:** No dead φ functions
    * *Minimal form* can still phi functions which reference variables which are not actually used in the rest of the program
    * problematic because they artificially extend live ranges of referenced variables. 
    * also defines new variables which aren't really live
    * Two obvious way to achieve this: 
      * perform live variable analysis prior to SSA construction and use it to avoid placing dead phi functions; 
      * run dead code elimination (DCE) pass after the construction (which requires live variable analysis first, this time on SSA form of the program already)
    * pruned SSA construction is more expensive than just the minimal form
    * if we will run DCE pass on anyway, we don't need to be concerned to *construct* pruned form, as we will get it after the DCE pass "for free".
  * **Semi-pruned:** an attempt to reduce Φ functions without incurring high cost of computing live variable information
    * compromise between fully pruned and minimal form, sometimes called "Briggs-Minimal" form
    * if a variable is never live upon entry into a basic block, it never needs a Φ function
    * during SSA construction, Φ functions for any "block-local" variables are omitted
  * **Not pruned**
