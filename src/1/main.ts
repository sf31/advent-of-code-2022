import { readFileByLine } from "../utils";

const lines = readFileByLine(`${__dirname}/input`);

const sumByElf: number[] = [];
let caloriesCounter: number = 0;

for (const line of lines) {
  const calories = parseInt(line);
  if (isNaN(calories)) {
    // `calories` is NaN when there's an emtpy line, meaning the next line
    // will be a new elf. Store the current counter value and reset it.
    sumByElf.push(caloriesCounter);
    caloriesCounter = 0;
  } else {
    // still in same elf count
    caloriesCounter += calories;
  }
}

sumByElf.sort((a, b) => b - a);
const sumTopThree = sumByElf.slice(0, 3).reduce((acc, item) => acc + item, 0);

console.log(`Top three Elves`);
console.log(`#1 ${sumByElf[0]}`);
console.log(`#2 ${sumByElf[1]}`);
console.log(`#3 ${sumByElf[2]}`);
console.log(`\nSum: ${sumTopThree}`);
