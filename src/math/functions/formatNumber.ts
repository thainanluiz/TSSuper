import { FormatNumberProps } from "../types/formatNumberProps";

/**
 * Format a number to a specific number of decimal places
 * @param {FormatNumberProps} { number, decimalPlaces }
 *
 * @returns {number}
 *
 * @throws {Error} number must be a number
 * @throws {Error} number must be a finite number
 * @throws {Error} decimalPlaces must be an integer
 * @throws {Error} decimalPlaces must be non-negative
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
  if (!isFinite(number)) {
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

  // Format the number to the specified number of decimal places
  return Number(number.toFixed(decimalPlaces));
}
