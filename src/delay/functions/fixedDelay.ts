import { FixedDelayProps } from "./../types/fixedDelayProps";

/**
 * Create a fixed delay function that returns a promise that resolves after a given number of milliseconds.
 * @param {FixedDelayProps} { ms, breakAt, returnElapsed }
 *
 * @returns {object} An object containing the promise and a cancel function
 *
 * @throws {Error} ms must be a positive number
 * @throws {Error} breakAt must be a positive number if defined
 * @throws {Error} returnElapsed must be a boolean if defined
 */
export function fixedDelay({ ms, breakAt, returnElapsed }: FixedDelayProps): {
  promise: Promise<number | void>;
  cancel: () => void;
} {
  // Validate that ms is a positive number
  if (typeof ms !== "number" || ms <= 0) {
    throw new Error("ms must be a positive number");
  }

  // Validate that breakAt is a positive number if defined
  if (breakAt !== undefined && (typeof breakAt !== "number" || breakAt <= 0)) {
    throw new Error("breakAt must be a positive number if defined");
  }

  // Validate that returnElapsed is a boolean if defined
  if (returnElapsed !== undefined && typeof returnElapsed !== "boolean") {
    throw new Error("returnElapsed must be a boolean if defined");
  }

  let timeoutId: NodeJS.Timeout;
  let startTime = Date.now();
  let resolvePromise: (value?: number | void) => void;

  const promise = new Promise<number | void>((resolve) => {
    resolvePromise = resolve;

    timeoutId = setTimeout(() => {
      if (returnElapsed) {
        resolve(Date.now() - startTime);
      } else {
        resolve();
      }
    }, ms);

    if (breakAt) {
      setTimeout(() => {
        clearTimeout(timeoutId);
        resolve(returnElapsed ? Date.now() - startTime : undefined);
      }, breakAt);
    }
  });

  // Return the promise and a cancel function
  return {
    promise,
    cancel: () => {
      clearTimeout(timeoutId);
      resolvePromise(returnElapsed ? Date.now() - startTime : undefined);
    },
  };
}
