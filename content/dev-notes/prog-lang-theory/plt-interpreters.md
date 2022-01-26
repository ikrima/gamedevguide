# Interpreters

## Tagless Shallow embedding approach to interpreters

* TLDR: Use closures as AST nodes → interpreter becomes library
  * Describe language grammar as functions that take a free-bound "evaluator" function param instead of data types (a "final algebra"/"object algebra")
  * ✔: Performance (no tag dispatch), allows for partial evaluation extension, and expression problem solution
* Explanations:
  * ELIU in C# https://higherlogics.blogspot.com/2008/09/mostly-tagless-interpreters-in-c.html
  * http://lambda-the-ultimate.org/node/4572
  * Papers: 
    http://okmij.org/ftp/tagless-final/JFP.pdf
    http://www.cs.utexas.edu/~wcook/Drafts/2012/ecoop2012.pdf
* Sample implementations:
  * Simple C++ example 
    ````cpp
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
    ````
  
  * Implementations in different languages: https://i.cs.hku.hk/~bruno/oa/
  * C# (2008) 
    * Snippet: http://lambda-the-ultimate.org/node/4572#comment-72110
    * More complete: http://lambda-the-ultimate.org/node/2569#comment-43805
    * Expanded Version (2009): https://higherlogics.blogspot.com/2009/06/mobile-code-in-c-via-finally-tagless.html
    * Advanced Query language in C#: https://higherlogics.blogspot.com/2019/09/building-query-dsl-in-c.html
  * Snippet with Pratt parser (http://lambda-the-ultimate.org/node/4572#comment-72110)
    * Syntax to semantic constructors
      
      ````csharp
      interface IMathSemantics<T>
      {
        T Int(string lit);
        T Add(T lhs, T rhs);
        T Sub(T lhs, T rhs);
        T Mul(T lhs, T rhs);
        T Div(T lhs, T rhs);
        T Pow(T lhs, T rhs);
        T Neg(T arg);
        T Pos(T arg);
        T Fact(T arg);
      }
      
      class MathGrammar<T> : Grammar<T>
      {
          public MathGrammar(IMathSemantics<T> math)
          {
              Infix("+", 10, math.Add);   Infix("-", 10, math.Sub);
              Infix("*", 20, math.Mul);   Infix("/", 20, math.Div);
              InfixR("^", 30, math.Pow);  Postfix("!", 30, math.Fact);
              Prefix("-", 100, math.Neg); Prefix("+", 100, math.Pos);
      
              Group("(", ")", int.MaxValue);
              Match("(digit)", char.IsDigit, 0, math.Int);
              SkipWhile(char.IsWhiteSpace);
          }
      }
      ````
    
    * Interpreter
      
      ````csharp
      sealed class MathInterpreter : IMathSemantics
      {
      public int Int(string lit) { return int.Parse(lit); }
      public int Add(int lhs, int rhs) { return lhs + rhs; }
      public int Sub(int lhs, int rhs) { return lhs - rhs; }
      public int Mul(int lhs, int rhs) { return lhs * rhs; }
      public int Div(int lhs, int rhs) { return lhs / rhs; }
      public int Pow(int lhs, int rhs) { return (int)Math.Pow(lhs, rhs); }
      public int Neg(int arg) { return -arg; }
      public int Pos(int arg) { return arg; }
      public int Fact(int arg)
      {
          return arg == 0 || arg == 1 ? 1 : arg * Fact(arg - 1);
      }
      }
      ````
    
    * Extending abstract semantics to support local bindings:
      
      ````csharp
      interface IEquationSemantics<T> : IMathSemantics<T>
      {
          T Var(string name);
          T Let(T x, T value, T body);
      }
      class EquationParser<T> : MathGrammar<T>
      {
          public EquationParser(IEquationSemantics<T> eq) : base(eq)
          {
              Match("(ident)", char.IsLetter, 0, eq.Var);
              TernaryPrefix("let", "=", "in", 90, eq.Let);
          }
      }
      ````
