import type { FormatNumberProps } from "../types/formatNumberProps";

const MAX_DECIMAL_PLACES = 100;

/**
 * Move the decimal point of a number by editing its exponent in decimal
 * notation, avoiding the binary floating-point error of multiplying by a
 * power of ten (e.g. 1.005 * 100 === 100.49999999999999).
 */
function shiftDecimalPoint(value: number, places: number): number {
  const [mantissa, exponent = "0"] = String(value).split("e");
  return Number(`${mantissa}e${Number(exponent) + places}`);
}

/**
 * Format a number to a specific number of decimal places, rounding half away from zero
 * @param {FormatNumberProps} { number, decimalPlaces }
 *
 * @returns {number}
 *
 * @throws {Error} number must be a number
 * @throws {Error} number must be a finite number
 * @throws {Error} decimalPlaces must be an integer
 * @throws {Error} decimalPlaces must be non-negative
 * @throws {Error} decimalPlaces must be at most 100
 */
export function formatNumber({
  number,
  decimalPlaces,
}: FormatNumberProps): number {
  // Validate that number is a number
  if (typeof number !== "number") {
    throw new Error("number must be a number");
  }

  // Validate that number is a finite number
  if (!Number.isFinite(number)) {
    throw new Error("number must be a finite number");
  }

  // Validate that decimalPlaces is an integer
  if (!Number.isInteger(decimalPlaces)) {
    throw new Error("decimalPlaces must be an integer");
  }

  // Validate that decimalPlaces is non-negative
  if (decimalPlaces < 0) {
    throw new Error("decimalPlaces must be non-negative");
  }

  // Validate that decimalPlaces is within the supported range
  if (decimalPlaces > MAX_DECIMAL_PLACES) {
    throw new Error(`decimalPlaces must be at most ${MAX_DECIMAL_PLACES}`);
  }

  // Integers have nothing to round (this includes every number >= 2^53)
  if (Number.isInteger(number)) {
    return number === 0 ? 0 : number;
  }

  // Round the absolute value so halves are rounded away from zero
  const rounded = Math.round(
    shiftDecimalPoint(Math.abs(number), decimalPlaces)
  );
  const result = Math.sign(number) * shiftDecimalPoint(rounded, -decimalPlaces);

  // Normalize -0 (e.g. -0.001 rounded to 2 places) to 0
  return result === 0 ? 0 : result;
}
