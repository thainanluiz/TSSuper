type ErrorClass = new (...args: any[]) => Error;

/**
 * Assert that `fn` throws synchronously an error of exactly `type` (a
 * subclass does not count) whose message is exactly `message` (a substring
 * does not count). Error messages and classes are part of the public API.
 */
export function expectError(
  fn: () => unknown,
  type: ErrorClass,
  message: string
): void {
  try {
    fn();
  } catch (error) {
    const thrown = error as { constructor?: unknown; message?: unknown } | null;
    expect({
      type: thrown?.constructor,
      message: thrown?.message,
    }).toEqual({ type, message });
    return;
  }

  throw new Error(
    `Expected the function to throw ${type.name}("${message}"), but it did not throw`
  );
}
