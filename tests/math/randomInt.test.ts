import { randomInt } from "../../src/math/functions/randomInt";

describe("randomInt", () => {
  test("should generate a random integer between min and max", () => {
    const result = randomInt({ min: 1, max: 10 });
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("should throw an error if min or max is not a number", () => {
    expect(() => randomInt({ min: "1" as any, max: 10 })).toThrow(
      "min and max must be numbers"
    );
    expect(() => randomInt({ min: 1, max: "10" as any })).toThrow(
      "min and max must be numbers"
    );
  });

  test("should throw an error if min or max is not finite", () => {
    expect(() => randomInt({ min: Infinity, max: 10 })).toThrow(
      "min and max must be finite numbers"
    );
    expect(() => randomInt({ min: 1, max: NaN })).toThrow(
      "min and max must be finite numbers"
    );
  });

  test("should throw an error if min or max is not an integer", () => {
    expect(() => randomInt({ min: 1.5, max: 10 })).toThrow(
      "min and max must be integers"
    );
    expect(() => randomInt({ min: 1, max: 10.5 })).toThrow(
      "min and max must be integers"
    );
  });

  test("should throw an error if min is greater than max", () => {
    expect(() => randomInt({ min: 10, max: 1 })).toThrow(
      "min must be less than or equal to max"
    );
  });
});
