// Import the math module from "@thainanluiz/tssuper"
import { math } from "@thainanluiz/tssuper";

// Destructure the math module to obtain the randomInt function
const { randomInt } = math;

// Define an object with properties min and max to specify the desired range
const randomIntProps = { min: 1, max: 10 };

// Generate a random integer within the specified range using randomInt
const randomNumber = randomInt(randomIntProps);

// Print the generated random integer to the console
console.log("Random number:", randomNumber);

// Without arguments, the range defaults to { min: 0, max: 10 }
console.log("Random number between 0 and 10:", randomInt());

// Example output:
// Random number: 5
// Random number between 0 and 10: 8
// (The output will be different each time you run the script)
