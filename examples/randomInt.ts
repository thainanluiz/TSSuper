// Import the randomInt function from the built distribution of the "tssuper" project
const { randomInt } = require("@thainanluiz/tssuper");

// Define an object with properties min and max to specify the desired range
const randomIntProps = { min: 1, max: 10 };

// Generate a random integer within the specified range
const x = randomInt(randomIntProps);

// Print the generated random integer to the console
console.log("Random number:", x);

// Example output:
// Random number: 5
// (The output will be different each time you run the script)
