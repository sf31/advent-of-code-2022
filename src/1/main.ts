import * as fs from "fs";
import * as readline from "readline";

(async () => {
  const sumPerElf = await getSumPerElf();
  sumPerElf.sort((a, b) => b - a);
  const sumTopThree = sumPerElf
    .slice(0, 3)
    .reduce((acc, item) => acc + item, 0);

  console.log(`Top three Elves`);
  console.log(`#1 ${sumPerElf[0]}`);
  console.log(`#2 ${sumPerElf[1]}`);
  console.log(`#3 ${sumPerElf[2]}`);

  console.log(`\nSum: ${sumTopThree}`);
})();

async function getSumPerElf(): Promise<number[]> {
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

  return sumPerElf;
}
