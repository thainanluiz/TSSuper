// Import the delay module from "@thainanluiz/tssuper"
import { delay } from "@thainanluiz/tssuper";

// Destructure the delay module to obtain the fixedRepeater function
const { fixedRepeater } = delay;

// Call the callback 5 times, once every second
const fixedRepeaterProps = {
  callback: () => console.log("Hello, world!"),
  ms: 1000,
  times: 5,
};

// Create a fixed repeater using the fixedRepeater function
const { promise, cancel } = fixedRepeater(fixedRepeaterProps);

// The promise resolves with the number of calls made,
// or rejects (and stops repeating) if the callback throws
promise
  .then((count) => {
    console.log(`The callback was called ${count} times.`);
  })
  .catch((error) => {
    console.error("Error during the fixed repeater:", error);
  });

// Optionally, cancel the fixed repeater before its completion
setTimeout(() => {
  console.log("Canceling the fixed repeater...");
  cancel();
}, 3500); // Cancel the fixed repeater after 3.5 seconds

// Example output:
// Hello, world!
// Hello, world!
// Hello, world!
// Canceling the fixed repeater...
// The callback was called 3 times.
// (Without the cancel call, it would print "Hello, world!" 5 times)
