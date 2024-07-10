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
});
