// Import the math module from "@thainanluiz/tssuper"
import { math } from "../../dist/index";

// Destructure the math module to obtain the formatNumber function
const { formatNumber } = math;

// Define an object with properties number and decimalPlaces to specify the desired number and decimal places
const formatNumberProps = { number: 123.456789, decimalPlaces: 2 };

// Format the number to the specified decimal places using formatNumber
const formattedNumber = formatNumber(formatNumberProps);

// Print the formatted number to the console
console.log("Formatted number:", formattedNumber);

// Example output:
// Formatted number: 123.46
// (The output will be the same each time you run the script)
