import { randomInt } from "../src/math/functions/randomInt";

describe("randomInt", () => {
  test("generates a number within the given range", () => {
    const min = 1;
    const max = 10;
    const num = randomInt({ min, max });
    expect(num).toBeGreaterThanOrEqual(min);
    expect(num).toBeLessThanOrEqual(max);
  });

  test("generates a number equal to the min value when min and max are the same", () => {
    const min = 5;
    const max = 5;
    const num = randomInt({ min, max });
    expect(num).toBe(min);
  });

  test("throws an error if min is greater than max", () => {
    const min = 10;
    const max = 1;
    expect(() => randomInt({ min, max })).toThrow(
      "min must be less than or equal to max"
    );
  });

  test("throws an error if min or max is not a number", () => {
    expect(() => randomInt({ min: "a" as any, max: 10 })).toThrow();
    expect(() => randomInt({ min: 1, max: "b" as any })).toThrow();
  });

  test("throws an error if min or max is not an integer", () => {
    expect(() => randomInt({ min: 1.5, max: 10 })).toThrow(
      "min and max must be integers"
    );
    expect(() => randomInt({ min: 1, max: 10.5 })).toThrow(
      "min and max must be integers"
    );
  });
});
