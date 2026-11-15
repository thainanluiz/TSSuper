import { expectError } from "../helpers/errors";
import { math } from "../helpers/subject";

const { randomInt } = math;

// Largest value Math.random() can return (the double just below 1)
const MAX_RANDOM = 1 - Number.EPSILON / 2;

describe("randomInt", () => {
  test("should generate a random integer between min and max", () => {
    const result = randomInt({ min: 1, max: 10 });
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("should include both min and max in the range", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    expect(randomInt({ min: -5, max: 5 })).toBe(-5);

    jest.spyOn(Math, "random").mockReturnValue(MAX_RANDOM);
    expect(randomInt({ min: -5, max: 5 })).toBe(5);
  });

  test("should return min when min equals max", () => {
    expect(randomInt({ min: 7, max: 7 })).toBe(7);
  });

  test("should default to the range 0..10", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    expect(randomInt()).toBe(0);
    expect(randomInt({})).toBe(0);

    jest.spyOn(Math, "random").mockReturnValue(MAX_RANDOM);
    expect(randomInt()).toBe(10);
    expect(randomInt({ min: 5 })).toBe(10);
    expect(randomInt({ max: 3 })).toBe(3);
  });

  test("should throw an error if min or max is not a number", () => {
    expectError(
      () => randomInt({ min: "1" as any, max: 10 }),
      Error,
      "min and max must be numbers"
    );
    expectError(
      () => randomInt({ min: 1, max: "10" as any }),
      Error,
      "min and max must be numbers"
    );
  });

  test("should throw an error if min or max is not finite", () => {
    expectError(
      () => randomInt({ min: Infinity, max: 10 }),
      Error,
      "min and max must be finite numbers"
    );
    expectError(
      () => randomInt({ min: 1, max: NaN }),
      Error,
      "min and max must be finite numbers"
    );
  });

  test("should throw an error if min or max is not an integer", () => {
    expectError(
      () => randomInt({ min: 1.5, max: 10 }),
      Error,
      "min and max must be integers"
    );
    expectError(
      () => randomInt({ min: 1, max: 10.5 }),
      Error,
      "min and max must be integers"
    );
  });

  test("should throw an error if min is greater than max", () => {
    expectError(
      () => randomInt({ min: 10, max: 1 }),
      Error,
      "min must be less than or equal to max"
    );
  });
});
