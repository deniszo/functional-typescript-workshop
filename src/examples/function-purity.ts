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
