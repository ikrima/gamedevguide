# Lenses/Transducers

# Lenses

## Explanation

* A composable *getter: whole → part* & *setter: (whole,part) → whole*
* "Lens" because you're "zooming" into
* Only looks complicated bc of var Laarhoven style lenses which define the getter & setter in one function and uses clever functor tricks to extract getter/setter
* Protocol/Key operations:
  * get (=="view")
  * set ( == "set")
  * update (== "over"):  same as set except takes in a *f: part → part* that allows updating based on existing part value
    * Why? The performant but less readable version of a lens relies on *view & over,* where *set* is defined using the *const functor* & *over*
* Why?
  * Decouple state shape dependencies, especially in UI. Instead of littering your codebase with code that dives deep into the shape of a particular object, import a lens. If you later need to change the state shape, you can do so in the lens, and none of the code that depends on the lens will need to change.
  * Immutable & composable niceness (getters are easy, but how do you do setters)?

Lenses allow you to abstract state shape behind getters and setters. 

This follows the principle that a small change in requirements should require only a small change in the system.

* Sensible explanation: 
  [https://sinusoid.es/lager/lenses.html](https://sinusoid.es/lager/lenses.html)
  [https://medium.com/@reidev275/composable-immutable-property-access-with-lenses-in-typescript-798da4ddc30e](https://medium.com/@reidev275/composable-immutable-property-access-with-lenses-in-typescript-798da4ddc30e)
  [https://medium.com/javascript-scene/lenses-b85976cb0534](https://medium.com/javascript-scene/lenses-b85976cb0534)

## Code Explanation

* unoptimal but readable version
  
  ````cpp
  unoptimal version
  
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
  ````

* Usual haskell implementation but expanded out:
  
  ````cpp
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
  
  ````

# Transducer

A transducer is an object that can incrementally transform one (potentially infinite) sequence of elements into another sequence. Transducers are state machines; performing a transduction involves starting the transducer to get an initial state, then repeatedly updating that state by either consuming an element from the input sequence or by emitting an element to the output sequence. When the input sequence is exhausted, the transducer enters a half closed state where it may emit more output elements but it will never consume more input elements. When the transducer stops emitting elements, its finisher is called to clean up any resources held in the final transduction state. Optionally, a transducer may half close early, before the input sequence is fully consumed 
[Reference](https://docs.racket-lang.org/rebellion/Transducers.html)
