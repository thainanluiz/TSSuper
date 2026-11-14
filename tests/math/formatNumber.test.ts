import { formatNumber } from "../../src/math/functions/formatNumber";

describe("formatNumber", () => {
  test("should format the number to the specified number of decimal places", () => {
    const result = formatNumber({ number: 3.1415926535, decimalPlaces: 2 });
    expect(result).toBe(3.14);
  });

  test("should format the number to zero decimal places", () => {
    const result = formatNumber({ number: 3.1415926535, decimalPlaces: 0 });
    expect(result).toBe(3);
  });

  test("should round half away from zero without floating-point errors", () => {
    // Number.prototype.toFixed gets these wrong (1.005.toFixed(2) === "1.00")
    expect(formatNumber({ number: 1.005, decimalPlaces: 2 })).toBe(1.01);
    expect(formatNumber({ number: 1.255, decimalPlaces: 2 })).toBe(1.26);
    expect(formatNumber({ number: 1.45, decimalPlaces: 1 })).toBe(1.5);
    expect(formatNumber({ number: -1.005, decimalPlaces: 2 })).toBe(-1.01);
    expect(formatNumber({ number: 2.5, decimalPlaces: 0 })).toBe(3);
    expect(formatNumber({ number: -2.5, decimalPlaces: 0 })).toBe(-3);
    expect(formatNumber({ number: 0.1 + 0.2, decimalPlaces: 2 })).toBe(0.3);
  });

  test("should handle numbers written in exponential notation", () => {
    expect(formatNumber({ number: 1.5e-7, decimalPlaces: 7 })).toBe(2e-7);
    expect(formatNumber({ number: 1e-7, decimalPlaces: 2 })).toBe(0);
    expect(formatNumber({ number: 1e21, decimalPlaces: 2 })).toBe(1e21);
    expect(formatNumber({ number: 1e300, decimalPlaces: 100 })).toBe(1e300);
  });

  test("should return integers unchanged", () => {
    expect(formatNumber({ number: 42, decimalPlaces: 3 })).toBe(42);
    expect(formatNumber({ number: -7, decimalPlaces: 0 })).toBe(-7);
  });

  test("should never return negative zero", () => {
    expect(formatNumber({ number: -0.001, decimalPlaces: 2 })).toBe(0);
    expect(formatNumber({ number: -0, decimalPlaces: 2 })).toBe(0);
  });

  test("should accept up to 100 decimal places", () => {
    expect(formatNumber({ number: 1.5, decimalPlaces: 100 })).toBe(1.5);
  });

  test("should throw an error if number is not a number", () => {
    expect(() =>
      formatNumber({ number: "3.14" as any, decimalPlaces: 2 })
    ).toThrow("number must be a number");
  });

  test("should throw an error if number is not finite", () => {
    expect(() => formatNumber({ number: Infinity, decimalPlaces: 2 })).toThrow(
      "number must be a finite number"
    );
    expect(() => formatNumber({ number: NaN, decimalPlaces: 2 })).toThrow(
      "number must be a finite number"
    );
  });

  test("should throw an error if decimalPlaces is not an integer", () => {
    expect(() => formatNumber({ number: 3.14, decimalPlaces: 2.5 })).toThrow(
      "decimalPlaces must be an integer"
    );
  });

  test("should throw an error if decimalPlaces is negative", () => {
    expect(() => formatNumber({ number: 3.14, decimalPlaces: -1 })).toThrow(
      "decimalPlaces must be non-negative"
    );
  });

  test("should throw an error if decimalPlaces is greater than 100", () => {
    expect(() => formatNumber({ number: 3.14, decimalPlaces: 101 })).toThrow(
      "decimalPlaces must be at most 100"
    );
  });
});
