import * as tssuper from "../src";

describe("package entry point", () => {
  test("should expose the math and delay namespaces", () => {
    expect(Object.keys(tssuper).sort()).toEqual(["delay", "math"]);
  });

  test("should expose every public function", () => {
    expect(typeof tssuper.math.randomInt).toBe("function");
    expect(typeof tssuper.math.formatNumber).toBe("function");
    expect(typeof tssuper.delay.fixedDelay).toBe("function");
    expect(typeof tssuper.delay.fixedRepeater).toBe("function");
  });
});
