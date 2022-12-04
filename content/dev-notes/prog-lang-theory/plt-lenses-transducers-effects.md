# Lenses, Transducers, and Algebraic Effects

## Homomorphisms

Homomorphisms are a **structure preserving map** between **two algebraic structures of the same type** (e.g. two groups, vector spaces, etc.) that preserves the **operations** of the structures

- suppose $f: A \to B$ is a homomorphism between two sets $A$, $B$
- suppose $\cdot$ is an operation of the structure (e.g. a _binary operation_)
- $f(x\cdot y)=f(x)\cdot f(y)$ for every pair $x$, $y$ of elements of $A$

Common examples

- **linear maps:** homomorphisms of vector spaces
- **isomorphism:** a subset of homomorphisms that also have an inverse
- **homomorphic encryption:** is a form of encryption that permits users to perform computations on its encrypted data without first decrypting it

## Functors

- Functors are structure preserving maps between Categories

- Functors are functions that lift functions to a context

- Functors compose as functions

- [Functors == Homomorphisms](https://math.stackexchange.com/questions/405459/homomorphisms-vs-functors)
  
   > 
   > You are correct, functors are the structure preserving entities between categories. They could have been called homomorphisms.
   > I don't know much about the reason for the terminology used, but I think that Mac Lane and Eilenberg, when inventing category theory, borrowed terminology from philosophy where category and functor are known (at least to some)
   > Polymorphism is common in mathematics. For instance, _the structure preserving entities between topological spaces are called continuous rather than homomorphisms_.
   > And an invertible continuous function with continuous inverse is called a homeomorphism rather than an isomorphism. A structure preserving entity between vectors spaces is called a linear transformation.
   > A structure preserving mappings between metric spaces is called a short map. And an invertible one is called an isometry rather than an isomorphism. Clearly, historical reasons play a role.

- [Connections to transducers](https://news.ycombinator.com/item?id=10297337)
  \>On the fancy Haskell lens hierarchy (hackage.haskell.org/package/lens) we have the notion of a fold or a "getter which touches multiple items".
  \>The existence of a fold for a type like `Fold s a` indicates that we can extract from the type `s` some number (0 to many) `a` values in sequence. This is the idea of "Foldable" in Haskell.
  \>Given a foldable type `s` and a transducer we execute the transducer by passing the "build" reducer in and then "visiting" each value `a` inside of `s` with the reducer that
  \>the transducer returns (modulo the early stopping bit which is just sort of a Clojure-specific optimization).
  \>Essentially, the transducer is a notion of "visitation" which is invariant to how the final summary is constructed—essentially the same thing that's captured in the "getter which touches multiple items" of a Fold.
  \>So there really ought to be a way to treat any specter optic as a possibly very limited transducer. Essentially, the "read" component of a lens will correspond pretty directly.
  \>We can also see this by remembering that any _pure transducer is semantically equivalent to a function `a -> [b]`_ which you can read as a way of finding 0-to-many `b` values "inside" of `a`.

## Lenses

![](../_assets/lenses.png)

- a composable _getter: whole → part_ & _setter: (whole, part) → whole_
- "Lens" because you're "zooming" into a part
- Only looks complicated bc of var Laarhoven style lenses which define the getter & setter in one function and uses clever functor tricks to extract getter/setter
- Protocol/Key operations:
  - get ( == "view")
  - set ( == "set")
  - update (== "over"):  same as set except takes in a _f: part → part_ that allows updating based on existing part value
    - Why? The performant but less readable version of a lens relies on _view & over,_ where _set_ is defined using the _const functor_ & _over_
- Why?
  - Decouple state shape dependencies, especially in UI. Instead of littering your codebase with code that dives deep into the shape of a particular object, import a lens. If you later need to change the state shape, you can do so in the lens, and none of the code that depends on the lens will need to change.
  - Immutable & composable niceness (getters are easy, but how do you do setters)?

Lenses allow you to abstract state shape behind getters and setters.

This follows the principle that a small change in requirements should require only a small change in the system.

- Sensible explanation
  [https://sinusoid.es/lager/lenses.html](https://sinusoid.es/lager/lenses.html)
  [https://medium.com/@reidev275/composable-immutable-property-access-with-lenses-in-typescript-798da4ddc30e](https://medium.com/@reidev275/composable-immutable-property-access-with-lenses-in-typescript-798da4ddc30e)
  [https://medium.com/javascript-scene/lenses-b85976cb0534](https://medium.com/javascript-scene/lenses-b85976cb0534)

### Code Explanation

- suboptimal but readable version
  
  ```haskell
  
  export interface Lens<A, B> {
    get(a: A): B;
    set(b: B, a: A): A;
  }
  
  export const compose = <A, B, C>(x: Lens<A, B>, y: Lens<B, C>): Lens<A, C> => ({
    get: (a: A) => y.get(x.get(a)),
    set: (c: C, a: A) => {
      const b: B = x.get(a);
      const b2: B = y.set(c, b);
      return x.set(b2, a);
    }
  });
  ```

- Usual Haskell implementation but expanded out
  
  ```haskell
  get(w): p =
    return w.p
  
  update :: (p -> p) -> w -> w
  update(P: p->p, w): w =
    w` = w
    w`.p = P(w.p)
    return w
  
  set :: Lens s a -> a -> s -> s
  set l a s = update l (const a) s
  
  compose :: Lens l t -> Lens w l -> Lens w t
  compose lt wl = Lens
    { get = (w,t) -> t : lt.get( wl.get(w) )
    , update = f(t->t), w: wl.update(f,w) . lt.update(f,t)
    }
  
  g.f =>
    composeGet<glens,flens>(w) = 
      return flens.get(glens.get(w))
  
    composeUpdate<glens,flens>(T: fp->fp, gw): gw =  
      auto fpupdateCurry = [T](gp): gp = 
        # fw == gp
        return flens.update(T, gp)
  
      glens.update(
        fpupdateCurry,
        gw)
  
  ```

## Transducers

A transducer is an object that incrementally transforms one (potentially infinite) sequence of elements into another sequence; effectively "state machines" involving [(Reference)](https://docs.racket-lang.org/rebellion/Transducers.html)

- starting the transducer to get an initial state
- repeatedly updating that state by either consuming an element from the input sequence or by emitting an element to the output sequence
- when input is exhausted, the transducer enters a half closed state where it may emit more output elements but it will never consume more input elements
- when the transducer stops emitting elements, its finisher is called to clean up any resources held in the final transduction state.
- Optionally, a transducer may half close early, before the input sequence is fully consumed

## Algebraic Effects

_**ELI5:**_ generalized `catch/throw` with value semantics i.e. you can pass around a catch block

- _**WHAT:**_ Delimited continuations for humans
- _**WHY:**_ Effect systems decomplect where, what, and how
- _**HOW:**_ By these semantics
  - all semantics are _**strongly typed value semantics**_ i.e. can be passed around as values
  - delimited continuations as strongly typed interfaces (~=  defining an "`Exception`" type)
  - semantics for scoped signaling (~= message passing) of an effect (~= `throw`)
  - semantics for specifying scoped implementations of effects (~= handlers)
  - semantics for resuming from an implementation

---

### Details

- Types: **what** _`func()`_ computes
  - Constrain world inside your function
  - Handled by callee
- Effects: **how** _`func()`_ computes
  - Constrain world outside
  - Handled by caller
- **motivation:**
  - gives you the power of virtualization at the expression level (e.g. can easily write a debugger that way)
  - you get static strong typing for dynamic things like callbacks
  - can actually be implemented with delimited continuations
  - mostly aimed towards statically typed languages like Haskell as a replacement of monad transformers, which has both cognitive and performance benefits
- analogies/concept similarities
  - **syscalls**
    - C program puts stuff away in mem/registers, and tells kernel comeback and resume me when you're done
    - entire program is a continuation
    - the process is delimited continuation
      - syscall are parameterized side-effects
      - the process is a parameters (e.g. `fork`  the program continues _**twice**_)
  - **virtualization**
    - works by mocking syscall table
    - means can isolate side-effects and create a functional world for that process
    - algebraic effects give you the power of virtualization at the expression level
      - so you can virtualize any function like any process
  - **common lisp condition system**: decouple the treatment of exceptional situations (or conditions) into three orthogonal roles:
    - signaling the condition (akin to “throwing”),
    - handling the condition (akin to “catching”),
    - recovering from the condition (which has no resemblance in popular languages).
    - The signaler, the handler, and the recoverer can be three disjoint bodies of code sitting in different parts of your call stack.
  - **interpreters**
    - Tagless final algebras are another much more popular alternative that has been proven very effective in practical software.
    - In tagless final, one writes composable DSLs (which are just records of functions) with the nature and interpretation of effects left abstract.
    - One then writes interpreters which interpret the DSL, giving meaning to the effects. This achieves the same fundamental goals as algebraic effects, but just using the ordinary language features of static FP languages.

### Walkthrough

```haskell
type choice = effect
  operation decide : unit -> bool
end

let c = new choice

handle
  let x = (if c#decide () then 10 else 20) in
  let y = (if c#decide () then 0  else  5) in
    x - y
with
| c#decide () k -> k true
```

- `effect` definition
  - =="interface" defining supported operations==
  - dictates the "type"
- `effect` must be instanced to use
  - needed because we may want to use same result of effect in multiple places
- `effect` used in a scoped evaluation context
  - is a scoped "implementation" of `effect` interfaces
  - **important!** `c#effect()` ==invocation is through typed message passing, _**not**_ function invocation==

### F#'s Effect handlers

- TLDR: Allow user plug in a definition of `yield`  and be able to call `resume` within `yield` block to resume continuation
- Are really just delimited continuations) but seem better/more ergonomic than transducers: <http://mikeinnes.github.io/2020/06/12/transducers.html>
- Very much similar to `async/await`

#### Motivating Examples

```fsharp
sum = 0
handle {
  mapping(f, xs)
} with yield(x) {
  sum += x
  resume()
}
return sum
```

```fsharp
// Concat
for x in xs { yield(x) }
for y in ys { yield(y) }
// Interleave
for (x, y) in zip(xs, ys) {
  yield(x)
  yield(y)
}
// Cartesian Product
for x in xs {
  for y in ys {
    yield((x, y))
  }
}
```

```fsharp
ys = handle {
  mapping(f, xs)
  nil
} with yield(x) {
  cons(x, LazySeq(resume))
}
```

```fsharp
// Take while
for x in xs {
  if f(x) {
    yield(x)
  } else {
    break
  }
}
```

```fsharp
// Dedupe
last = nil
for x in xs {
  if x != last {
    yield(x)
  }
  last = x
}
```

### References

- ELIU presentation: <https://speakerdeck.com/paperswelove/brandon-bloom-on-programming-with-algebraic-effects-and-handlers-by-andrej-bauer-and-matija-pretnar>
- <https://github.com/brandonbloom/eclj>
- More in style of CommonLisp's condition system: <https://github.com/clojureman/special>
- <https://lilac.town/writing/effects-in-clojure/>
- From Scratch Tutorial in javascript:
  - <https://gist.github.com/yelouafi/57825fdd223e5337ba0cd2b6ed757f53>
  - <https://gist.github.com/yelouafi/bbc559aef92f00d9682b8d0531a36503>
  - <https://gist.github.com/yelouafi/7261da07c97c5e6322da3894f6ea60e2>
  - <https://gist.github.com/yelouafi/5f8550b887ab7ffcf3284602330bd37d>
