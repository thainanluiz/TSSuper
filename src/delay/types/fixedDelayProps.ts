export type FixedDelayProps = {
  /** Delay in milliseconds (positive, at most 2147483647). */
  ms: number;
  /** Optional time in milliseconds after which the delay resolves early. */
  breakAt?: number;
  /** If true, the promise resolves with the elapsed time in milliseconds. */
  returnElapsed?: boolean;
};
