import { expectError } from "../helpers/errors";
import { delay } from "../helpers/subject";
import {
  advanceTime,
  flushPromises,
  pendingTimers,
  trackPromise,
  useFakeTimers,
} from "../helpers/timers";

const { fixedDelay } = delay;

const MS_ERROR = "ms must be a positive number (at most 2147483647)";
const BREAK_AT_ERROR =
  "breakAt must be a positive number if defined (at most 2147483647)";

describe("fixedDelay", () => {
  useFakeTimers();

  test("should resolve after the specified delay", async () => {
    const { promise } = fixedDelay({ ms: 1000 });
    advanceTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });

  test("should not resolve before the specified delay", async () => {
    const state = trackPromise(fixedDelay({ ms: 1000 }).promise);
    advanceTime(999);
    await flushPromises();
    expect(state()).toEqual({ status: "pending" });
  });

  test("should resolve with elapsed time if returnElapsed is true", async () => {
    const { promise } = fixedDelay({ ms: 1000, returnElapsed: true });
    advanceTime(1000);
    await expect(promise).resolves.toBe(1000);
  });

  test("should resolve early if breakAt is set", async () => {
    const { promise } = fixedDelay({ ms: 1000, breakAt: 500 });
    advanceTime(500);
    await expect(promise).resolves.toBeUndefined();
  });

  test("should resolve with elapsed time if breakAt is set and returnElapsed is true", async () => {
    const { promise } = fixedDelay({
      ms: 1000,
      breakAt: 500,
      returnElapsed: true,
    });
    advanceTime(500);
    await expect(promise).resolves.toBe(500);
  });

  test("should resolve at ms when breakAt equals ms", async () => {
    const state = trackPromise(
      fixedDelay({ ms: 1000, breakAt: 1000, returnElapsed: true }).promise
    );

    advanceTime(999);
    await flushPromises();
    expect(state()).toEqual({ status: "pending" });

    advanceTime(1);
    await flushPromises();
    expect(state()).toEqual({ status: "fulfilled", value: 1000 });
    expect(pendingTimers()).toBe(0);
  });

  test("should resolve at ms when breakAt is greater than ms", async () => {
    const state = trackPromise(
      fixedDelay({ ms: 1000, breakAt: 5000, returnElapsed: true }).promise
    );

    advanceTime(999);
    await flushPromises();
    expect(state()).toEqual({ status: "pending" });

    advanceTime(1);
    await flushPromises();
    expect(state()).toEqual({ status: "fulfilled", value: 1000 });
    expect(pendingTimers()).toBe(0);
  });

  test("should not leave the breakAt timer pending when ms elapses first", async () => {
    const { promise } = fixedDelay({ ms: 100, breakAt: 60000 });
    advanceTime(100);
    // A pending timer would keep a Node.js process alive until breakAt
    expect(pendingTimers()).toBe(0);
    await expect(promise).resolves.toBeUndefined();
  });

  test("should not leave the main timer pending when breakAt elapses first", () => {
    fixedDelay({ ms: 60000, breakAt: 100 });
    advanceTime(100);
    expect(pendingTimers()).toBe(0);
  });

  test.each([-100, 0, NaN, "100"])(
    "should throw an error if ms is %p",
    (ms) => {
      expectError(() => fixedDelay({ ms: ms as number }), Error, MS_ERROR);
    }
  );

  test("should throw an error if ms exceeds the maximum timer delay", () => {
    // setTimeout silently fires after 1ms for delays above 2^31 - 1
    expectError(() => fixedDelay({ ms: 2147483648 }), Error, MS_ERROR);
    expectError(() => fixedDelay({ ms: Infinity }), Error, MS_ERROR);
    expect(() => fixedDelay({ ms: 2147483647 })).not.toThrow();
  });

  test.each([-500, 0, NaN, 2147483648, Infinity, "500"])(
    "should throw an error if breakAt is %p",
    (breakAt) => {
      expectError(
        () => fixedDelay({ ms: 1000, breakAt: breakAt as number }),
        Error,
        BREAK_AT_ERROR
      );
    }
  );

  test("should throw an error if returnElapsed is not a boolean if defined", () => {
    expectError(
      () => fixedDelay({ ms: 1000, returnElapsed: "true" as any }),
      Error,
      "returnElapsed must be a boolean if defined"
    );
  });

  test("should resolve immediately if cancel is called", async () => {
    const { promise, cancel } = fixedDelay({ ms: 1000 });
    cancel();
    await expect(promise).resolves.toBeUndefined();
  });

  test("should clear all pending timers when cancel is called", () => {
    const { cancel } = fixedDelay({ ms: 1000, breakAt: 500 });
    expect(pendingTimers()).toBe(2);
    cancel();
    expect(pendingTimers()).toBe(0);
  });

  test("should resolve with elapsed time if cancel is called and returnElapsed is true", async () => {
    const { promise, cancel } = fixedDelay({ ms: 1000, returnElapsed: true });
    advanceTime(500);
    cancel();
    await expect(promise).resolves.toBe(500);
  });

  test("should ignore cancel after the delay has already resolved", async () => {
    const { promise, cancel } = fixedDelay({ ms: 1000, returnElapsed: true });
    advanceTime(1000);
    advanceTime(250);
    cancel();
    await expect(promise).resolves.toBe(1000);
  });
});
