import { FixedDelayProps } from "../types/fixedDelayProps";
import { MAX_DELAY_MS, isValidDelay } from "../utils/isValidDelay";

/**
 * Create a fixed delay function that returns a promise that resolves after a given number of milliseconds.
 * @param {FixedDelayProps} { ms, breakAt, returnElapsed }
 *
 * @returns {object} An object containing the promise and a cancel function
 *
 * @throws {Error} ms must be a positive number (at most 2147483647)
 * @throws {Error} breakAt must be a positive number if defined (at most 2147483647)
 * @throws {Error} returnElapsed must be a boolean if defined
 */
export function fixedDelay({ ms, breakAt, returnElapsed }: FixedDelayProps): {
  promise: Promise<number | void>;
  cancel: () => void;
} {
  // Validate that ms is a positive number within the timer limit
  if (!isValidDelay(ms)) {
    throw new Error(`ms must be a positive number (at most ${MAX_DELAY_MS})`);
  }

  // Validate that breakAt is a positive number within the timer limit if defined
  if (breakAt !== undefined && !isValidDelay(breakAt)) {
    throw new Error(
      `breakAt must be a positive number if defined (at most ${MAX_DELAY_MS})`
    );
  }

  // Validate that returnElapsed is a boolean if defined
  if (returnElapsed !== undefined && typeof returnElapsed !== "boolean") {
    throw new Error("returnElapsed must be a boolean if defined");
  }

  const startTime = Date.now();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let breakTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let finish!: () => void;

  const promise = new Promise<number | void>((resolve) => {
    // Clear every pending timer (so none keeps the process alive) and resolve.
    // Calling it more than once is harmless: a promise only resolves once.
    finish = () => {
      clearTimeout(timeoutId);
      clearTimeout(breakTimeoutId);
      resolve(returnElapsed ? Date.now() - startTime : undefined);
    };
  });

  timeoutId = setTimeout(finish, ms);

  if (breakAt !== undefined) {
    breakTimeoutId = setTimeout(finish, breakAt);
  }

  // Return the promise and a cancel function
  return { promise, cancel: finish };
}
