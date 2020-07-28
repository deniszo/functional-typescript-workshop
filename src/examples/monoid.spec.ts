// Type Class
interface Monoid<T = any> {
  concat(a: T, b: T): T;
  empty: T;
}

// Type class instance
export const sumMonoid: Monoid<number> = {
  concat: (a, b) => a + b,
  empty: 0
};

function testMonoidLaws<
  M extends Monoid,
  Type = M extends Monoid<infer T> ? T : never
>(monoidName: string, { concat, empty }: M, a: Type, b: Type) {
  test(`${monoidName}.concat holds the associativity`, () => {
    expect(concat(a, b)).toEqual(concat(b, a));
  });

  test(`${monoidName}.concat holds the right identity`, () => {
    expect(concat(a, empty)).toEqual(a);
  });

  test(`${monoidName}.concat holds the left identity`, () => {
    expect(concat(empty, b)).toEqual(b);
  });
}

testMonoidLaws("sumMonoid", sumMonoid, 1, 2);
