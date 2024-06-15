import { FormatNumberProps } from "../types/formatNumberProps";

/**
 * Format a number to a specific number of decimal places
 * @param {FormatNumberProps} { number, decimalPlaces }
 *
 * @returns {number}
 *
 * @throws {Error} number must be a number
 * @throws {Error} decimalPlaces must be an integer
 */
export function formatNumber({
  number,
  decimalPlaces,
}: FormatNumberProps): number {
  // Validate that number is a number
  if (typeof number !== "number") {
    throw new Error("number must be a number");
  }

  // Validate that decimalPlaces is an integer
  if (!Number.isInteger(decimalPlaces)) {
    throw new Error("decimalPlaces must be an integer");
  }

  return Number(number.toFixed(decimalPlaces));
}
