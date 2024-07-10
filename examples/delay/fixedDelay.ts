// Import the math module from "@thainanluiz/tssuper"
import { delay } from "@thainanluiz/tssuper";

// Destructure the math module to obtain the fixedDelay function
const { fixedDelay } = delay;

// Define an object with properties ms, breakAt, and returnElapsed to specify the desired delay and options
const fixedDelayProps = { ms: 30000, breakAt: 25000, returnElapsed: true };

// Create a fixed delay using the fixedDelay function
const { promise, cancel } = fixedDelay(fixedDelayProps);

// Handle the promise resolution to log the elapsed time or completion
promise
  .then((elapsed) => {
    console.log(`The delay was completed in ${elapsed} milliseconds.`);
  })
  .catch((error) => {
    console.error("Error during the delay:", error);
  });

// Optionally, cancel the delay before its completion
setTimeout(() => {
  console.log("Canceling the delay...");
  cancel();
}, 20000); // Cancel the delay after 20 seconds

// Example output:
// The delay was completed in 25000 milliseconds.
// (The output may vary depending on whether the delay was completed or canceled)
