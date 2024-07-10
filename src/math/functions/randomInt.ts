import { RandomIntProps } from "../types/randomIntProps";

/**
 * Generate a random integer between min and max (inclusive)
 * @param {RandomIntProps} { min, max }
 *
 * @returns {number}
 *
 * @throws {Error} min and max must be numbers
 * @throws {Error} min and max must be integers
 * @throws {Error} min must be less than or equal to max
 */
export function randomInt({ min, max }: RandomIntProps): number {
  // Validate that min and max are numbers
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("min and max must be numbers");
  }

  // Validate that min and max are integers
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("min and max must be integers");
  }

  // Validate that min is less than or equal to max
  if (min > max) {
    throw new Error("min must be less than or equal to max");
  }

  // Generate a random integer between min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
