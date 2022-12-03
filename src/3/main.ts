import { readFileByLine } from "../utils";

const rucksackList = readFileByLine(`${__dirname}/input.txt`);

// console.log(getPriority("a"));
getPriority("A");
getPriority("Z");

const priorities = rucksackList
  .map((rucksack) => {
    const sharedLetterList = getSharedItems(rucksack);
    const priorityList = sharedLetterList.map(getPriority);
    const prioritySum = priorityList.reduce((acc, item) => acc + item, 0);
    return prioritySum;
  })
  .reduce((acc, item) => acc + item, 0);

console.log(`Sum o priorities: ${priorities}`);

function getSharedItems(rucksack: string): string[] {
  const itemsCount = rucksack.length;
  if (itemsCount === 0) return [];

  const compartmentOneMap: { [k: string]: string } = {};
  const compartmentTwoMap: { [k: string]: string } = {};

  for (let i = 0; i < itemsCount / 2; i++) {
    const itemOne = rucksack[i];
    const itemTwo = rucksack[i + itemsCount / 2];
    compartmentOneMap[itemOne] = itemOne;
    compartmentTwoMap[itemTwo] = itemTwo;
  }

  return Object.keys(compartmentOneMap).filter((k) =>
    compartmentTwoMap.hasOwnProperty(k)
  );
}

function getPriority(letter: string): number {
  const code = letter.charCodeAt(0);

  // lower case char
  if (code >= 97 && code <= 122) return code - 96;

  // upper case char
  if (code >= 65 && code <= 90) return code - 38;

  return 0;
}
