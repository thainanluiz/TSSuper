import { fixedDelay } from "../../src/delay/functions/fixedDelay";

describe("fixedDelay", () => {
  jest.useFakeTimers();

  test("should resolve after the specified delay", () => {
    const { promise } = fixedDelay({ ms: 1000 });
    jest.advanceTimersByTime(1000);
    return expect(promise).resolves.toBeUndefined();
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

  test("should throw an error if ms is not a positive number", () => {
    expect(() => fixedDelay({ ms: -100 })).toThrow(
      "ms must be a positive number"
    );
    expect(() => fixedDelay({ ms: "100" as any })).toThrow(
      "ms must be a positive number"
    );
  });

  test("should throw an error if breakAt is not a positive number if defined", () => {
    expect(() => fixedDelay({ ms: 1000, breakAt: -500 })).toThrow(
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

  test("should resolve with elapsed time if cancel is called and returnElapsed is true", () => {
    const { promise, cancel } = fixedDelay({ ms: 1000, returnElapsed: true });
    jest.advanceTimersByTime(500);
    cancel();
    return expect(promise).resolves.toBe(500);
  });
});
