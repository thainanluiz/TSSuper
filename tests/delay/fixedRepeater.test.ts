import { fixedRepeater } from "../../src/delay/functions/fixedRepeater";

describe("fixedRepeater", () => {
  jest.useFakeTimers();

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

  test("should resolve early if cancel is called", () => {
    const callback = jest.fn();
    const { promise, cancel } = fixedRepeater({ callback, ms: 1000, times: 3 });
    jest.advanceTimersByTime(2000);
    cancel();
    expect(callback).toHaveBeenCalledTimes(2);
    return expect(promise).resolves.toBe(2);
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
      fixedRepeater({ callback: () => {}, ms: "1000" as any, times: 3 })
    ).toThrow("ms must be a positive number");
  });

  test("should throw an error if times is not a positive number", () => {
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: -3 })
    ).toThrow("times must be a positive number");
    expect(() =>
      fixedRepeater({ callback: () => {}, ms: 1000, times: "3" as any })
    ).toThrow("times must be a positive number");
  });
});
