import { tssuper } from "./helpers/subject";

describe("package entry point", () => {
  test("should expose the math and delay namespaces", () => {
    expect(Object.keys(tssuper).sort()).toEqual(["delay", "math"]);
  });

  test("should expose every public function", () => {
    expect(Object.keys(tssuper.math).sort()).toEqual([
      "formatNumber",
      "randomInt",
    ]);
    expect(Object.keys(tssuper.delay).sort()).toEqual([
      "fixedDelay",
      "fixedRepeater",
    ]);
    expect(typeof tssuper.math.randomInt).toBe("function");
    expect(typeof tssuper.math.formatNumber).toBe("function");
    expect(typeof tssuper.delay.fixedDelay).toBe("function");
    expect(typeof tssuper.delay.fixedRepeater).toBe("function");
  });
});
