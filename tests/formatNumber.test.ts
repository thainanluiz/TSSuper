import { formatNumber } from "../src/math/functions/formatNumber";
import { FormatNumberProps } from "../src/math/types/formatNumberProps";

describe("formatNumber", () => {
  test("formats a number to the specified decimal places", () => {
    const input: FormatNumberProps = { number: 123.456789, decimalPlaces: 2 };
    const num = formatNumber(input);
    expect(num).toBe(123.46);
  });

  test("handles negative numbers correctly", () => {
    const input: FormatNumberProps = { number: -987.654321, decimalPlaces: 1 };
    const num = formatNumber(input);
    expect(num).toBe(-987.7);
  });

  test("handles zero decimal places", () => {
    const input: FormatNumberProps = { number: 123.456789, decimalPlaces: 0 };
    const num = formatNumber(input);
    expect(num).toBe(123);
  });

  test("throws an error if number is not a number", () => {
    const input: FormatNumberProps = { number: "123" as any, decimalPlaces: 2 };
    expect(() => {
      formatNumber(input);
    }).toThrow("number must be a number");
  });

  test("throws an error if decimalPlaces is not an integer", () => {
    const input: FormatNumberProps = { number: 123.45, decimalPlaces: 2.5 };
    expect(() => {
      formatNumber(input);
    }).toThrow("decimalPlaces must be an integer");
  });
});
