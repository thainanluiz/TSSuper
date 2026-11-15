// Import the delay module from "@thainanluiz/tssuper"
import { delay } from "@thainanluiz/tssuper";

// Destructure the delay module to obtain the fixedDelay function
const { fixedDelay } = delay;

// Wait 3 seconds, but stop waiting after 2 seconds (breakAt) and resolve with the elapsed time
const fixedDelayProps = { ms: 3000, breakAt: 2000, returnElapsed: true };

// Create a fixed delay using the fixedDelay function
const { promise, cancel } = fixedDelay(fixedDelayProps);

// Handle the promise resolution to log the elapsed time
promise.then((elapsed) => {
  console.log(`The delay finished after ${elapsed} milliseconds.`);
});

// Optionally, cancel the delay before its completion
setTimeout(() => {
  console.log("Canceling the delay...");
  cancel();
}, 1000); // Cancel the delay after 1 second

// Example output:
// Canceling the delay...
// The delay finished after ~1000 milliseconds.
// (The elapsed time varies by a few milliseconds between runs.
// Without the cancel call, it would finish after ~2000 milliseconds because of breakAt)
