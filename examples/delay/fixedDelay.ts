// Import the delay module from "@thainanluiz/tssuper"
import { delay } from "@thainanluiz/tssuper";

// Destructure the delay module to obtain the fixedDelay function
const { fixedDelay } = delay;

// Wait 30 seconds, but stop waiting after 25 seconds (breakAt) and resolve with the elapsed time
const fixedDelayProps = { ms: 30000, breakAt: 25000, returnElapsed: true };

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
}, 20000); // Cancel the delay after 20 seconds

// Example output:
// Canceling the delay...
// The delay finished after 20000 milliseconds.
// (Without the cancel call, it would finish after 25000 milliseconds because of breakAt)
