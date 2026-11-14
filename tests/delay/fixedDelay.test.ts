import { fixedDelay } from "../../src/delay/functions/fixedDelay";

describe("fixedDelay", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should resolve after the specified delay", () => {
    const { promise } = fixedDelay({ ms: 1000 });
    jest.advanceTimersByTime(1000);
    return expect(promise).resolves.toBeUndefined();
  });

  test("should not resolve before the specified delay", async () => {
    const onResolve = jest.fn();
    fixedDelay({ ms: 1000 }).promise.then(onResolve);
    jest.advanceTimersByTime(999);
    await Promise.resolve();
    expect(onResolve).not.toHaveBeenCalled();
  });

  test("should resolve with elapsed time if returnElapsed is true", () => {
    const { promise } = fixedDelay({ ms: 1000, returnElapsed: true });
    jest.advanceTimersByTime(1000);
    return expect(promise).resolves.toBe(1000);
  });

  test("should resolve early if breakAt is set", () => {
    const { promise } = fixedDelay({ ms: 1000, breakAt: 500 });
    jest.advanceTimersByTime(500);
    return expect(promise).resolves.toBeUndefined();
  });

  test("should resolve with elapsed time if breakAt is set and returnElapsed is true", () => {
    const { promise } = fixedDelay({
      ms: 1000,
      breakAt: 500,
      returnElapsed: true,
    });
    jest.advanceTimersByTime(500);
    return expect(promise).resolves.toBe(500);
  });

  test("should not leave the breakAt timer pending when ms elapses first", () => {
    const { promise } = fixedDelay({ ms: 100, breakAt: 60000 });
    jest.advanceTimersByTime(100);
    // A pending timer would keep a Node.js process alive until breakAt
    expect(jest.getTimerCount()).toBe(0);
    return expect(promise).resolves.toBeUndefined();
  });

  test("should not leave the main timer pending when breakAt elapses first", () => {
    fixedDelay({ ms: 60000, breakAt: 100 });
    jest.advanceTimersByTime(100);
    expect(jest.getTimerCount()).toBe(0);
  });

  test("should throw an error if ms is not a positive number", () => {
    expect(() => fixedDelay({ ms: -100 })).toThrow(
      "ms must be a positive number"
    );
    expect(() => fixedDelay({ ms: 0 })).toThrow("ms must be a positive number");
    expect(() => fixedDelay({ ms: NaN })).toThrow(
      "ms must be a positive number"
    );
    expect(() => fixedDelay({ ms: "100" as any })).toThrow(
      "ms must be a positive number"
    );
  });

  test("should throw an error if ms exceeds the maximum timer delay", () => {
    // setTimeout silently fires after 1ms for delays above 2^31 - 1
    expect(() => fixedDelay({ ms: 2147483648 })).toThrow(
      "ms must be a positive number"
    );
    expect(() => fixedDelay({ ms: Infinity })).toThrow(
      "ms must be a positive number"
    );
    expect(() => fixedDelay({ ms: 2147483647 })).not.toThrow();
  });

  test("should throw an error if breakAt is not a positive number if defined", () => {
    expect(() => fixedDelay({ ms: 1000, breakAt: -500 })).toThrow(
      "breakAt must be a positive number if defined"
    );
    expect(() => fixedDelay({ ms: 1000, breakAt: NaN })).toThrow(
      "breakAt must be a positive number if defined"
    );
    expect(() => fixedDelay({ ms: 1000, breakAt: 2147483648 })).toThrow(
      "breakAt must be a positive number if defined"
    );
    expect(() => fixedDelay({ ms: 1000, breakAt: "500" as any })).toThrow(
      "breakAt must be a positive number if defined"
    );
  });

  test("should throw an error if returnElapsed is not a boolean if defined", () => {
    expect(() =>
      fixedDelay({ ms: 1000, returnElapsed: "true" as any })
    ).toThrow("returnElapsed must be a boolean if defined");
  });

  test("should resolve immediately if cancel is called", () => {
    const { promise, cancel } = fixedDelay({ ms: 1000 });
    cancel();
    return expect(promise).resolves.toBeUndefined();
  });

  test("should clear all pending timers when cancel is called", () => {
    const { cancel } = fixedDelay({ ms: 1000, breakAt: 500 });
    expect(jest.getTimerCount()).toBe(2);
    cancel();
    expect(jest.getTimerCount()).toBe(0);
  });

  test("should resolve with elapsed time if cancel is called and returnElapsed is true", () => {
    const { promise, cancel } = fixedDelay({ ms: 1000, returnElapsed: true });
    jest.advanceTimersByTime(500);
    cancel();
    return expect(promise).resolves.toBe(500);
  });

  test("should ignore cancel after the delay has already resolved", () => {
    const { promise, cancel } = fixedDelay({ ms: 1000, returnElapsed: true });
    jest.advanceTimersByTime(1000);
    jest.advanceTimersByTime(250);
    cancel();
    return expect(promise).resolves.toBe(1000);
  });
});
