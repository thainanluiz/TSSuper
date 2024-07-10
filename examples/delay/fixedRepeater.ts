// Import the math module from "@thainanluiz/tssuper"
import { delay } from "@thainanluiz/tssuper";

// Destructure the math module to obtain the fixedRepeater function
const { fixedRepeater } = delay;

// Define an object with properties callback, ms and times to specify the desired callback, delay and number of repetitions
const fixedRepeaterProps = {
  callback: () => console.log("Hello, world!"),
  ms: 1000,
  times: 5,
};

// Create a fixed repeater using the fixedRepeater function
const { promise, cancel } = fixedRepeater(fixedRepeaterProps);

// Handle the promise resolution to log the completion
promise
  .then(() => {
    console.log("The fixed repeater has completed all repetitions.");
  })
  .catch((error) => {
    console.error("Error during the fixed repeater:", error);
  });

// Optionally, cancel the fixed repeater before its completion
setTimeout(() => {
  console.log("Canceling the fixed repeater...");
  cancel();
}, 3000); // Cancel the fixed repeater after 3 seconds

// Example output:
// Hello, world!
// Hello, world!
// Hello, world!
// Hello, world!
// Hello, world!
// The fixed repeater has completed all repetitions.
// (The output may vary depending on whether the fixed repeater was completed or canceled)
