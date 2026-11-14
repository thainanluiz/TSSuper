export type FixedRepeaterProps = {
  /** Function called on every repetition. */
  callback: () => void;
  /** Interval in milliseconds between calls (positive, at most 2147483647). */
  ms: number;
  /** Number of times the callback is called (positive integer). */
  times: number;
};
