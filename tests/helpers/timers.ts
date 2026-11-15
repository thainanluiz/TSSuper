/**
 * Fake timer helpers. Every timer call to the test runner lives here, so the
 * tests do not depend on one runner's timer API.
 */

/**
 * Use fake timers (including a fake `Date.now`) in every test of the
 * enclosing `describe` block, and drop any timer a test leaves behind.
 */
export function useFakeTimers(): void {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
}

/** Move the fake clock forward, running every timer due in that time. */
export function advanceTime(ms: number): void {
  jest.advanceTimersByTime(ms);
}

/**
 * Number of timers still scheduled. A pending timer keeps a Node.js process
 * alive, so a finished or cancelled operation must leave none.
 */
export function pendingTimers(): number {
  return jest.getTimerCount();
}

export type PromiseState<T> =
  | { status: "pending" }
  | { status: "fulfilled"; value: T }
  | { status: "rejected"; reason: unknown };

/**
 * Follow a promise without awaiting it. Call `flushPromises()` before reading
 * the state, so the settlement has been delivered. Tracking also handles a
 * rejection, so it is never reported as unhandled.
 */
export function trackPromise<T>(promise: Promise<T>): () => PromiseState<T> {
  let state: PromiseState<T> = { status: "pending" };

  promise.then(
    (value) => {
      state = { status: "fulfilled", value };
    },
    (reason: unknown) => {
      state = { status: "rejected", reason };
    }
  );

  return () => state;
}

/**
 * Let the promise callbacks already queued run, without advancing any timer.
 * Several turns, so a settlement that goes through a short chain of
 * promises is also delivered.
 */
export async function flushPromises(): Promise<void> {
  for (let turn = 0; turn < 10; turn++) {
    await Promise.resolve();
  }
}
