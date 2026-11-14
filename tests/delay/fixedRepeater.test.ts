import { fixedRepeater } from "../../src/delay/functions/fixedRepeater";

describe("fixedRepeater", () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should call the callback the specified number of times with the specified delay", () => {
    const callback = jest.fn();
    const { promise } = fixedRepeater({ callback, ms: 1000, times: 3 });
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
    return expect(promise).resolves.toBe(3);
  });

  test("should call the callback with the specified delay", () => {
    const callback = jest.fn();
    const { promise } = fixedRepeater({ callback, ms: 1000, times: 3 });
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
    return expect(promise).resolves.toBe(3);
  });

  test("should stop the interval after the last repetition", () => {
    const callback = jest.fn();
    fixedRepeater({ callback, ms: 1000, times: 2 });
    jest.advanceTimersByTime(10000);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(jest.getTimerCount()).toBe(0);
  });

  test("should resolve early if cancel is called", () => {
    const callback = jest.fn();
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 3 });
    jest.advanceTimersByTime(2000);
    cancel();
    expect(callback).toHaveBeenCalledTimes(2);
    return expect(promise).resolves.toBe(2);
  });

  test("should not call the callback again after cancel", () => {
    const callback = jest.fn();
    const { cancel } = fixedRepeater({ callback, ms: 1000, times: 5 });
    jest.advanceTimersByTime(1000);
    cancel();
    jest.advanceTimersByTime(10000);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  test("should reject and stop repeating if the callback throws", async () => {
    const error = new Error("boom");
    const callback = jest.fn(() => {
      throw error;
    });
    const { promise } = fixedRepeater({ callback, ms: 1000, times: 5 });
    const assertion = expect(promise).rejects.toBe(error);

    jest.advanceTimersByTime(5000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
    await assertion;
  });

  test("should throw an error if callback is not a function", () => {
    expect(() =>
      fixedRepeater({ callback: "not a function" as any, ms: 1000, times: 3 })
    ).toThrow("callback must be a function");
  });

  test("should throw an error if ms is not a positive number", () => {
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: -1000, times: 3 })
    ).toThrow("ms must be a positive number");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: NaN, times: 3 })
    ).toThrow("ms must be a positive number");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: "1000" as any, times: 3 })
    ).toThrow("ms must be a positive number");
  });

  test("should throw an error if ms exceeds the maximum timer delay", () => {
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 2147483648, times: 3 })
    ).toThrow("ms must be a positive number");
  });

  test("should throw an error if times is not a positive integer", () => {
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: -3 })
    ).toThrow("times must be a positive integer");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: 0 })
    ).toThrow("times must be a positive integer");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: 2.5 })
    ).toThrow("times must be a positive integer");
    // NaN used to be accepted and made the repeater run forever
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: NaN })
    ).toThrow("times must be a positive integer");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: "3" as any })
    ).toThrow("times must be a positive integer");
  });
});
