/**
 * Largest delay accepted by setTimeout/setInterval (2^31 - 1 ms, ~24.8 days).
 * Bigger values overflow and the timer fires after ~1ms instead.
 */
export const MAX_DELAY_MS = 2147483647;

/**
 * Check that a value can be safely used as a timer delay: a positive number
 * no greater than MAX_DELAY_MS (rejects NaN and Infinity).
 */
export function isValidDelay(value: unknown): value is number {
  return typeof value === "number" && value > 0 && value <= MAX_DELAY_MS;
}
