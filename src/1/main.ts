import * as fs from "fs";
import * as readline from "readline";

(async () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/input`, "utf8"),
  });

  const sumPerElf: number[] = [];
  let caloriesCounter: number = 0;

  for await (const line of rl) {
    const calories = parseInt(line);

    if (isNaN(calories)) {
      // `calories` is NaN when there's an emtpy line, meaning the next line
      // will be a new elf. Store the current counter value and reset it.
      sumPerElf.push(caloriesCounter);
      caloriesCounter = 0;
    } else {
      // still in same elf count
      caloriesCounter += calories;
    }
  }

  // if file ends without a new/empty line, counter will still have the last elf calories sum
  if (caloriesCounter > 0) sumPerElf.push(caloriesCounter);

  // find the max value in the final array
  const max = Math.max(...sumPerElf);

  console.log(`Higher calories count: ${max}`);
})();
