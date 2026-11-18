import type { FixedRepeaterProps } from "../types/fixedRepeaterProps";
import { MAX_DELAY_MS, isValidDelay } from "../utils/isValidDelay";

/**
 * Create a fixed repeater function that calls a given function a given number of times with a fixed delay between each call.
 * @param {FixedRepeaterProps} { callback, ms, times }
 *
 * @returns {object} An object containing the promise and a cancel function.
 * The promise resolves with the number of completed calls, or rejects with the
 * error thrown by the callback (which also stops the repetitions).
 *
 * @throws {Error} callback must be a function
 * @throws {Error} ms must be a positive number (at most 2147483647)
 * @throws {Error} times must be a positive integer
 */
export function fixedRepeater({ callback, ms, times }: FixedRepeaterProps): {
  promise: Promise<number>;
  cancel: () => void;
} {
  // Validate that callback is a function
  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }

  // Validate that ms is a positive number within the timer limit
  if (!isValidDelay(ms)) {
    throw new Error(`ms must be a positive number (at most ${MAX_DELAY_MS})`);
  }

  // Validate that times is a positive integer
  if (!Number.isInteger(times) || times <= 0) {
    throw new Error("times must be a positive integer");
  }

  let count = 0;
  let intervalId: ReturnType<typeof setInterval> | undefined;
  let resolvePromise!: (count: number) => void;

  const promise = new Promise<number>((resolve, reject) => {
    resolvePromise = resolve;

    intervalId = setInterval(() => {
      count++;
      try {
        callback();
      } catch (error) {
        // Stop repeating and surface the error through the promise
        clearInterval(intervalId);
        reject(error);
        return;
      }

      if (count >= times) {
        clearInterval(intervalId);
        resolve(count);
      }
    }, ms);
  });

  // Return the promise and a cancel function
  return {
    promise,
    cancel: () => {
      clearInterval(intervalId);
      resolvePromise(count);
    },
  };
}
