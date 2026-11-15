import { expectError } from "../helpers/errors";
import { delay } from "../helpers/subject";
import {
  advanceTime,
  flushPromises,
  pendingTimers,
  trackPromise,
  useFakeTimers,
} from "../helpers/timers";

const { fixedRepeater } = delay;

const MS_ERROR = "ms must be a positive number (at most 2147483647)";
const TIMES_ERROR = "times must be a positive integer";

describe("fixedRepeater", () => {
  useFakeTimers();

  test("should call the callback the specified number of times with the specified delay", async () => {
    const callback = jest.fn();
    const { promise } = fixedRepeater({ callback, ms: 1000, times: 3 });
    advanceTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
    await expect(promise).resolves.toBe(3);
  });

  test("should call the callback with the specified delay", async () => {
    const callback = jest.fn();
    const { promise } = fixedRepeater({ callback, ms: 1000, times: 3 });
    advanceTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    advanceTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    advanceTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    await expect(promise).resolves.toBe(3);
  });

  test("should call the callback once and resolve with 1 when times is 1", async () => {
    const callback = jest.fn();
    const state = trackPromise(
      fixedRepeater({ callback, ms: 1000, times: 1 }).promise
    );

    advanceTime(999);
    await flushPromises();
    expect(callback).not.toHaveBeenCalled();
    expect(state()).toEqual({ status: "pending" });

    advanceTime(1);
    await flushPromises();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(state()).toEqual({ status: "fulfilled", value: 1 });
    expect(pendingTimers()).toBe(0);

    advanceTime(10000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("should stop the interval after the last repetition", () => {
    const callback = jest.fn();
    fixedRepeater({ callback, ms: 1000, times: 2 });
    advanceTime(10000);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(pendingTimers()).toBe(0);
  });

  test("should resolve early if cancel is called", async () => {
    const callback = jest.fn();
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 3 });
    advanceTime(2000);
    cancel();
    expect(callback).toHaveBeenCalledTimes(2);
    await expect(promise).resolves.toBe(2);
  });

  test("should resolve with 0 if cancel is called before the first call", async () => {
    const callback = jest.fn();
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 3 });
    advanceTime(999);
    cancel();
    expect(pendingTimers()).toBe(0);
    advanceTime(10000);
    expect(callback).not.toHaveBeenCalled();
    await expect(promise).resolves.toBe(0);
  });

  test("should not call the callback again after cancel", () => {
    const callback = jest.fn();
    const { cancel } = fixedRepeater({ callback, ms: 1000, times: 5 });
    advanceTime(1000);
    cancel();
    advanceTime(10000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(pendingTimers()).toBe(0);
  });

  test("should ignore cancel after all repetitions are done", async () => {
    const callback = jest.fn();
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 3 });
    advanceTime(3000);
    await expect(promise).resolves.toBe(3);

    expect(() => cancel()).not.toThrow();
    advanceTime(10000);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(pendingTimers()).toBe(0);
    await expect(promise).resolves.toBe(3);
  });

  test("should reject and stop repeating if the callback throws", async () => {
    const error = new Error("boom");
    const callback = jest.fn(() => {
      throw error;
    });
    const state = trackPromise(
      fixedRepeater({ callback, ms: 1000, times: 5 }).promise
    );

    advanceTime(5000);
    await flushPromises();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(pendingTimers()).toBe(0);
    expect(state()).toEqual({ status: "rejected", reason: error });
  });

  test("should ignore cancel after the callback has thrown", async () => {
    const error = new Error("boom");
    const callback = jest.fn(() => {
      throw error;
    });
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 5 });
    const state = trackPromise(promise);

    advanceTime(1000);
    await flushPromises();
    expect(state()).toEqual({ status: "rejected", reason: error });

    expect(() => cancel()).not.toThrow();
    advanceTime(10000);
    await flushPromises();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(pendingTimers()).toBe(0);
    expect(state()).toEqual({ status: "rejected", reason: error });
    await expect(promise).rejects.toBe(error);
  });

  test("should throw an error if callback is not a function", () => {
    expectError(
      () =>
        fixedRepeater({ callback: "not a function" as any, ms: 1000, times: 3 }),
      Error,
      "callback must be a function"
    );
  });

  test.each([-1000, 0, NaN, "1000"])("should throw an error if ms is %p", (ms) => {
    expectError(
      () => fixedRepeater({ callback: () => {}, ms: ms as number, times: 3 }),
      Error,
      MS_ERROR
    );
  });

  test("should throw an error if ms exceeds the maximum timer delay", () => {
    expectError(
      () => fixedRepeater({ callback: () => {}, ms: 2147483648, times: 3 }),
      Error,
      MS_ERROR
    );
    expectError(
      () => fixedRepeater({ callback: () => {}, ms: Infinity, times: 3 }),
      Error,
      MS_ERROR
    );
  });

  // NaN used to be accepted and made the repeater run forever
  test.each([-3, 0, 2.5, NaN, Infinity, "3"])(
    "should throw an error if times is %p",
    (times) => {
      expectError(
        () =>
          fixedRepeater({ callback: () => {}, ms: 1000, times: times as number }),
        Error,
        TIMES_ERROR
      );
    }
  );
});
