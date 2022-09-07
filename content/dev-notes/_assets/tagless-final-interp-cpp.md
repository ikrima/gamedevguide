
```cpp
// From https://i.cs.hku.hk/~bruno/oa/
#include <iostream>
#include <string>
#include <memory>
using namespace std;

/*
 * This program has used some C++11 features to get rid of manual memory management. 
 * 
 * If you prefer the older C++ version, do the follwing steps:
 * 1. Switch all "EvalPtr" to "Eval *"; do the same to "PPrintPtr"
 *    WARNING: you need to do some additional cleanup for those newed objects
 * 2. Replace "make_shared<Closure>" with "new Closure"
 * 3. Substitude "to_string" to some other ways of converting int to string
 */

// Initial object algebra interface for expressions: integers and addition
template <typename E> 
class ExpAlg
{
  public:
    virtual E lit(int x) = 0;
    virtual E add(E e1, E e2) = 0;
};

// An object algebra implementing that interface (evaluation)

// The evaluation interface
class Eval 
{
  public:
    virtual int eval() = 0;
};
typedef shared_ptr<Eval> EvalPtr;

class EvalLit : public Eval {
  public:
    EvalLit(int x) : _x(x) {}

    virtual int eval() {
      return _x;
    }
  private:
    int _x;
};

class EvalAdd : public Eval {
  public:
    EvalAdd(EvalPtr l, EvalPtr r) : _l(l), _r(r) {}

    virtual int eval() {
      return _l->eval() + _r->eval();
    }
  private:
    EvalPtr _l;
    EvalPtr _r;
};

// The object algebra
class EvalExpAlg : virtual public ExpAlg<EvalPtr>
{
  public:
    virtual EvalPtr lit(int x) {
      return make_shared<EvalLit>(x);
    }

    virtual EvalPtr add(EvalPtr e1, EvalPtr e2) {
      return make_shared<EvalAdd>(e1, e2);
    }
};

// Evolution 1: Adding subtraction
template<typename E>
class SubExpAlg : virtual public ExpAlg<E>
{
  public:
    virtual E sub(E e1, E e2) = 0;
};

class EvalSub : public Eval {
  public:
    EvalSub(EvalPtr l, EvalPtr r)
      : _l(l), _r(r) {}

    int eval() {
      return _l->eval() - _r->eval();
    }
  private:
    EvalPtr _l;
    EvalPtr _r;
};

// Updating evaluation:
class EvalSubExpAlg : public EvalExpAlg, public SubExpAlg<EvalPtr>
{
  public:
    virtual EvalPtr sub(EvalPtr e1, EvalPtr e2) {
      return make_shared<EvalSub>(e1, e2);
    }
};


// Evolution 2: Adding pretty printing
class PPrint 
{
  public:
    virtual string print() = 0;
};

typedef shared_ptr<PPrint> PPrintPtr;

class PrintLit : public PPrint
{
  public:
    PrintLit(int x) : _x(x) {}

    virtual string print() {
      return to_string(_x);
    }
  private:
    int _x;
};

class PrintAdd : public PPrint 
{
  public:
    PrintAdd(PPrintPtr e1, PPrintPtr e2)
      : _e1(e1), _e2(e2) {}

    virtual string print() {
      return _e1->print() + " + " + _e2->print();
    }

  private:
    PPrintPtr _e1;
    PPrintPtr _e2;
};

class PrintSub : public PPrint
{
  public:
    PrintSub(PPrintPtr e1, PPrintPtr e2)
      : _e1(e1), _e2(e2) {}
    virtual string print() {
      return _e1->print() + " - " + _e2->print();
    }
  private:
    PPrintPtr _e1;
    PPrintPtr _e2;
};

class PrintExpAlg : virtual public SubExpAlg<PPrintPtr>
{
  public:
    virtual PPrintPtr lit(int x) {
      return make_shared<PrintLit>(x);
    }    

    virtual PPrintPtr add(PPrintPtr e1, PPrintPtr e2) {
      return make_shared<PrintAdd>(e1, e2);
    }

    virtual PPrintPtr sub(PPrintPtr e1, PPrintPtr e2) {
      return make_shared<PrintSub>(e1, e2);
    }
};

// An alternative object algebra for pretty printing
class PrintExpAlg2 : virtual public SubExpAlg<string>
{
  public:
    virtual string lit(int x) {
      return to_string(x);
    }    

    virtual string add(string e1, string e2) {
      return e1 + " + " + e2;
    }

    virtual string sub(string e1, string e2) {
      return e1 + " - " + e2;
    }
};

// Testing


// An expression using the basic ExpAlg
template<typename E>
E exp1(ExpAlg<E>& alg) {
  return alg.add(alg.lit(3), alg.lit(4));
}

// An expression using subtraction too
template<typename E>
E exp2(SubExpAlg<E>& alg) {
  return alg.sub(exp1(alg), alg.lit(4));
}

int main() {
  // Some object algebras:
  EvalExpAlg ea;
  EvalSubExpAlg esa;
  PrintExpAlg pa;
  PrintExpAlg2 pa2;

  EvalPtr ev = exp1(esa);

  // But calling ea with exp2 is an error
  // EvalPtr ev_bad = exp2(ea);

  cout << "Evaluation of exp1 \"" << exp1(pa)->print() << "\" is: " << ev->eval() << endl;
  cout << "Evaluation of exp2 \"" << exp2(pa)->print() << "\" is: " << exp2(esa)->eval() << endl;
  cout << "The alternative pretty printer works nicely too!\n" 
     << "exp1: " << exp1(pa2) << "\n"
     << "exp2: " << exp2(pa2);
}
```
