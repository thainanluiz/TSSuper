import { FixedRepeaterProps } from "./../types/fixedRepeaterProps";

/**
 * Create a fixed repeater function that calls a given function a given number of times with a fixed delay between each call.
 * @param {FixedRepeaterProps} { callback, ms, times }
 *
 * @returns {object} An object containing the promise and a cancel function
 *
 * @throws {Error} callback must be a function
 * @throws {Error} ms must be a positive number
 * @throws {Error} times must be a positive number
 */
export function fixedRepeater({ callback, ms, times }: FixedRepeaterProps): {
  promise: Promise<number | void>;
  cancel: () => void;
} {
  // Validate that callback is a function
  if (typeof callback !== "function") {
    throw new Error("callback must be a function");
  }

  // Validate that ms is a positive number
  if (typeof ms !== "number" || ms <= 0) {
    throw new Error("ms must be a positive number");
  }

  // Validate that times is a positive number
  if (typeof times !== "number" || times <= 0) {
    throw new Error("times must be a positive number");
  }

  let count = 0;
  let canceled = false;
  let intervalId: NodeJS.Timeout;

  let resolvePromise: (value?: number | void) => void;

  const promise = new Promise<number | void>((resolve) => {
    resolvePromise = resolve;

    intervalId = setInterval(() => {
      if (canceled) {
        clearInterval(intervalId);
        resolve(count);
        return;
      }

      callback();
      count++;

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
      canceled = true;
      clearInterval(intervalId);
      resolvePromise(count);
    },
  };
}
