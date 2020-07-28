// 1) storing functions to variables and passing them to other functions
// function decalration
export function add1Decl(a) {
  return a + 1;
}

[1, 2, 3].map(add1Decl);

// function expressions
export const add1Expr = function add1Expr(a) {
  return a + 1;
};

[1, 2, 3].map(add1Expr);

// same with more fancy arrow functions
export const add1ExprArr = a => a + 1;

[1, 2, 3].map(add1ExprArr);

// You can also use expressions immediately

[1, 2, 3].map(function(a) {
  return a + 1;
});

// returning functions from functions
const map = <T, R>(mapper: (input: T) => R) => (items: Array<T>): Array<R> =>
  items.map(mapper);

// incrementItems is also a plain old function expecting an array of integers
export const incrementItems = map((a: number) => a + 1);

export const incremented = incrementItems([1, 2, 3]);

// typescript is clever enough
// const noCompile = incrementItems(["1"])
