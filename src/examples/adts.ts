// A Sum type in Typescript can be represented by a discrinitated union type:
type Sum =
  | {
      tag: "foo";
    }
  | {
      tag: "bar";
    };

// A product type can be represented by a tuple
type Product<A, B> = [A, B];

type OneOrTwo = 1 | 2;
type ThreeOrFour = 3 | 4;

type MyProduct = Product<OneOrTwo, ThreeOrFour>;

export const oneThree: MyProduct = [1, 3];
export const oneFour: MyProduct = [1, 4];
export const twoThree: MyProduct = [2, 3];
export const twoFour: MyProduct = [2, 4];

// does not belong to MyProduct
// export const oneFive: MyProduct = [1, 5]
// export const twoFive: MyProduct = [2, 5]
