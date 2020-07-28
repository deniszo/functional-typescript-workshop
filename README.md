# Functional Typescript Workshop

# What is Functional Programming

By referring to `Functional Programming` (FP) people usually mean programming paradigm where the function is the main building block of the programs (for example in Object Oriented porgramming the main building block is an object). As you know programs are usually cosntructed by creating and combining variables, passing them to the methods, functions and procedures. Since function is the main building block in FP, we need to be able to store functions in variables, pass them to other functions and return them from functions. Programming language providing this capabilities usually referred to as having `first-class functions`.

## Function purity

By default functions in FP should be `pure`. Purity of a function is insured by the following function properties:

- Totality. Function is total if it always returns a result
- Absence of the observable side effects. Side effect means changing the world outside the function (any function still changes the outside world, by changing the execution stack or creating objects in the heap of the running program, or changing the values in the registers of the processor. For more info on it refer to SICP)
- Referential transparency (RT). RT means given the same argument(s) a function should always return the same result and the result does not depend on the ouside world

Here are some examples

```javascript
// pure function
// total - always returns result
// no (observable) side effects
// for the same arguments always returns the same value
export function sum(a, b) {
  return a + b;
}

// impure functions

// not total - sometimes does not return
export function throwIf(shouldThrow) {
  console.error("Let's what awaits"); // side effect

  if (shouldThrow) {
    throw Error("No return for you"); // side effect
  }

  return 42;
}

let foo = 0;

export function setFoo(newFoo) {
  foo = newFoo; // side effect
}

export function multiplyFoo(multiplyBy) {
  // 1) side effect when reading foo
  // 2) breaks referential transparency as the result may be different for the same argument
  return foo * multiplyBy;
}

export function getRandomValue(max) {
  // 1) side effect by using Math.random
  // 2) breaks referential transparency

  return Math.random() * max;
}
```

## Immutability

Another important concept in FP and in programming in general is immutability. It means that in program there should be no variables, only constants. Objects' properties can not be mutated, functions should treat their arguments as read-only values, etc.

Javascript in particular is a very dynamic and mutation oriented language, so you might need to adjust your view of the world to this, but if you're using React and Redux - immutability is your bread and butter, so it shouldn't be something new.

# Why Functional Programming

By constraining the functions we naturally make them easier to reason about and test since the result only depends on the arguments of the functiion. We also make the code easier to parallelize, since there is no shared state between functions and everything is immutable - we don't need to controll the access to this state and eliminate the whole class of the problems such as `race conditions`, `deadlocks`, `livelocks`, etc.

Having reasonable and parallelizable programs is cool, but how are we actually going print something out on the screen or throw an error to stop the program? Some languages are completely pure meaning they don't even have a `console.log` function and `throw` keyword, so they need to invent a way to construct side-effectful programs in a pure way. It is usually achieved by lazily evaluated side effects, this is where a notion of `IO` comes in. An IO is just a description of the effect and maintains the purity but makes you as a developer responsible for safely running the effect when is appropriate.

```typescript
// not production ready IO
const IO = effect => ({
  usafeRun() {
    effect();
  }
});

// it's just an object and for the same effect it always returns the same object
const possiblyThrowingIO = IO(() => {
  if (Math.random() > 0.3) throw Error("I'm a side effeeeect!");
});

// somewhere in the program
possiblyThrowingIO.usafeRun();
```

In case of Javascript and Typescript we are not restricted and can create and run sideeffectful functions as we please, which sometimes is very convenient, but most of the time is not required at all and it makes people very lazy about the way they write their programs. So in underwriting ts we tried to stick to the idea of `functional core`, where most of the logic should be pure, but when we actually render things on the screen, we can go and do side effects. Especially after React introduced hooks, which are impure in their very nature.

# Functional programming tools

## Function Composition

## Algebraic Data Types

An Algebraic Data Type (ADT, don't mix it with Absctract Data Types) are usually defined in terms of `Sum` and `Product` types.

```typescript
// A Sum type in Typescript can be represented by a discrinitated union type:
type Sum<T> =
  | {
      tag: "foo";
    }
  | {
      tag: "bar";
    };
```

The number of inhabitants of a Sum type is equal to sum of the separate values of this type.

```
// A product type can be represented by a tuple
type Product<A, B> = [A, B];

type OneOrTwo = 1 | 2;
type ThreeOrFour = 3 | 4;

type MyProduct = Product<OneOrTwo, ThreeOrFour>;

export const oneThree: MyProduct = [1, 3];
export const oneFour: MyProduct = [1, 4];
export const twoThree: MyProduct = [2, 3];
export const twoFour: MyProduct = [2, 4];
```

The number of inhabitants of a Product type is determined by multiplication of the number of separate instances

## Type Classes

Type Classes are formalized intefaces that provide specific functionality over ADTs which abide to some concrete `laws`.

### Monoid

Monoid abstracts joining two values together, so it's interface can be formalized the following way
