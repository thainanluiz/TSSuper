/**
 * Globals available to the library source.
 *
 * The source is type-checked without any environment typings (no DOM, no
 * Node.js), so the ECMAScript standard library plus the four timer functions
 * below are all it can use. They exist in every supported runtime: browsers,
 * Node.js, Bun and Deno.
 *
 * The timer handle is opaque because its concrete type differs between
 * runtimes (a number in browsers, an object in Node.js). Keep it in local
 * variables typed as `ReturnType<typeof setTimeout>` and never expose it in
 * the public API.
 *
 * This file is only read by src/tsconfig.json and is not part of the
 * published typings.
 */

interface TimerHandle {
  readonly __timerHandle: never;
}

declare function setTimeout(handler: () => void, timeout?: number): TimerHandle;
declare function clearTimeout(handle: TimerHandle | undefined): void;
declare function setInterval(handler: () => void, timeout?: number): TimerHandle;
declare function clearInterval(handle: TimerHandle | undefined): void;
