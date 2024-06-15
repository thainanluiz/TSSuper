// Import the randomInt function from the built distribution of the project
const { randomInt } = require("tssuper");

// Generate a random integer between 1 and 10 (inclusive)
// This function have a type of { min: number, max: number } this is the RandomIntProps type (you can use wherever you want in your project)
// Type definition: type RandomIntProps = { min: number; max: number; };

const x = randomInt({ min: 1, max: 10 });

// Use the generated random integer
console.log(x);

// Output: 5

// Obs: The output will be different each time you run the script
