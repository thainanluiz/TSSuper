/**
 * Single entry point for the code under test.
 *
 * Every test imports the library from here, and only through its public
 * API (the package entry point), never from internal files. To run the
 * same suite against another build of the package, change this file only.
 */
export * as tssuper from "../../src";
export { math, delay } from "../../src";
