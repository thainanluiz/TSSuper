import { randomInt } from "../src/math/functions/randomInt";
import { RandomIntProps } from "../src/math/types/randomIntProps";

describe("randomInt", () => {
  test("generates a number within the given range", () => {
    const input: RandomIntProps = { min: 1, max: 10 };
    const num = randomInt(input);
    expect(num).toBeGreaterThanOrEqual(input.min);
    expect(num).toBeLessThanOrEqual(input.max);
  });

  test("generates a number equal to the min value when min and max are the same", () => {
    const input: RandomIntProps = { min: 5, max: 5 };
    const num = randomInt(input);
    expect(num).toBe(input.min);
  });

  test("throws an error if min is greater than max", () => {
    const input: RandomIntProps = { min: 10, max: 1 };
    expect(() => randomInt(input)).toThrow(
      "min must be less than or equal to max"
    );
  });

  test("throws an error if min or max is not a number", () => {
    const input1: RandomIntProps = { min: "1" as any, max: 10 };
    const input2: RandomIntProps = { min: 1, max: "10" as any };
    expect(() => randomInt(input1)).toThrow("min and max must be numbers");
    expect(() => randomInt(input2)).toThrow("min and max must be numbers");
  });

  test("throws an error if min or max is not an integer", () => {
    const input1: RandomIntProps = { min: 1.5, max: 10 };
    const input2: RandomIntProps = { min: 1, max: 10.5 };
    expect(() => randomInt(input1)).toThrow("min and max must be integers");
    expect(() => randomInt(input2)).toThrow("min and max must be integers");
  });
});
