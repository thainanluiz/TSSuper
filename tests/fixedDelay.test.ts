import { fixedDelay } from "../src/delay/functions/fixedDelay";
import { FixedDelayProps } from "../src/delay/types/fixedDelayProps";

describe("fixedDelay", () => {
  test("resolves after the given number of milliseconds", async () => {
    const input: FixedDelayProps = { ms: 1000 };
    const { promise } = fixedDelay(input);
    const startTime = Date.now();
    await promise;
    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(input.ms);
  });

  test("returns the number of milliseconds that have elapsed if returnElapsed is true", async () => {
    const input: FixedDelayProps = { ms: 1000, returnElapsed: true };
    const { promise } = fixedDelay(input);
    const elapsed = await promise;
    expect(elapsed).toBeGreaterThanOrEqual(input.ms);
  });

  test("breaks the delay if breakAt is reached", async () => {
    const input: FixedDelayProps = { ms: 1000, breakAt: 500 };
    const { promise } = fixedDelay(input);
    const startTime = Date.now();
    await promise;
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(input.ms);
  });

  test("returns the number of milliseconds that have elapsed if breakAt is reached and returnElapsed is true", async () => {
    const input: FixedDelayProps = {
      ms: 1000,
      breakAt: 500,
      returnElapsed: true,
    };
    const { promise } = fixedDelay(input);
    const elapsed = await promise;
    expect(elapsed).toBeLessThan(input.ms);
  });

  test("throws an error if ms is not a positive number", () => {
    const inputs = [{ ms: "1000" as any }, { ms: -1000 }, { ms: 0 }];
    inputs.forEach((input) => {
      expect(() => fixedDelay(input)).toThrow("ms must be a positive number");
    });
  });

  test("throws an error if breakAt is not a positive number", () => {
    const inputs = [
      { ms: 1000, breakAt: "500" as any },
      { ms: 1000, breakAt: -500 },
      { ms: 1000, breakAt: 0 },
    ];
    inputs.forEach((input) => {
      expect(() => fixedDelay(input)).toThrow(
        "breakAt must be a positive number if defined"
      );
    });
  });

  test("throws an error if returnElapsed is not a boolean", () => {
    const input: FixedDelayProps = { ms: 1000, returnElapsed: "true" as any };
    expect(() => fixedDelay(input)).toThrow(
      "returnElapsed must be a boolean if defined"
    );
  });

  test("cancels the delay when the cancel function is called", async () => {
    const input: FixedDelayProps = { ms: 1000 };
    const { promise, cancel } = fixedDelay(input);
    const startTime = Date.now();
    cancel();
    await promise;
    const endTime = Date.now();
    expect(endTime - startTime).toBeLessThan(input.ms);
  });

  test("returns the number of milliseconds that have elapsed when the cancel function is called and returnElapsed is true", async () => {
    const input: FixedDelayProps = { ms: 1000, returnElapsed: true };
    const { promise, cancel } = fixedDelay(input);
    cancel();
    const elapsed = await promise;
    expect(elapsed).toBeLessThan(input.ms);
  });

  test("does not throw an error if the cancel function is called multiple times", () => {
    const input: FixedDelayProps = { ms: 1000 };
    const { cancel } = fixedDelay(input);
    expect(() => {
      cancel();
      cancel();
    }).not.toThrow();
  });
});
