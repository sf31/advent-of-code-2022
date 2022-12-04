import { readFileByLine } from "../utils";

const rucksackList = readFileByLine(`${__dirname}/input.txt`);

const prioritiesPartOne: number[] = rucksackList.map((rucksack) => {
  // last line might be an empty (can be considered as empty rucksack)
  if (rucksack.length === 0) return 0;
  return getPriority(getSharedItem(rucksack));
});

const prioritiesPartTwo: number[] = [];
for (let i = 0; i < rucksackList.length; i += 3) {
  const group = rucksackList.slice(i, i + 3);
  if (group.length > 1) {
    const sharedItem = getSharedItemGroup(group);
    prioritiesPartTwo.push(getPriority(sharedItem));
  }
}

console.log(`[Part one] Sum: ${sumArrayValues(prioritiesPartOne)}`);
console.log(`[Part two] Sum: ${sumArrayValues(prioritiesPartTwo)}`);

/**
 * Helpers
 */

function sumArrayValues(array: number[]): number {
  return array.reduce((acc, item) => acc + item, 0);
}

function getSharedItemGroup(rucksackList: string[]): string {
  const itemCounterMap: { [letter: string]: number } = {};
  const rucksackListUnique = rucksackList
    .map((rucksack) => [...new Set(Array.from(rucksack))])
    .reduce((acc, item) => [...acc, ...item], []);

  for (let i = 0; i < rucksackListUnique.length; i++) {
    const item = rucksackListUnique[i];
    const count = itemCounterMap[item] || 0;
    itemCounterMap[item] = count + 1;
  }

  let max = { letter: "", count: 0 };

  for (const letter of Object.keys(itemCounterMap)) {
    const count = itemCounterMap[letter];
    if (count > max.count) max = { letter, count };
  }

  console.log(max, rucksackList);
  if (max.count !== rucksackList.length)
    throw Error(`No shared letters found: ${rucksackList}`);
  return max.letter;
}

function getSharedItem(rucksack: string): string {
  const itemsCount = rucksack.length;
  if (itemsCount === 0) throw Error("Error: emtpy rucksack!");

  const compartmentOneMap: { [k: string]: string } = {};
  const compartmentTwoMap: { [k: string]: string } = {};

  for (let i = 0; i < itemsCount / 2; i++) {
    const itemOne = rucksack[i];
    const itemTwo = rucksack[i + itemsCount / 2];
    compartmentOneMap[itemOne] = itemOne;
    compartmentTwoMap[itemTwo] = itemTwo;
  }

  const sharedList = Object.keys(compartmentOneMap).filter((k) =>
    compartmentTwoMap.hasOwnProperty(k)
  );

  if (sharedList.length !== 1)
    throw Error(`Multiple shared items found: ${sharedList}`);
  return sharedList[0];
}

function getPriority(letter: string): number {
  const code = letter.charCodeAt(0);

  // lower case char
  if (code >= 97 && code <= 122) return code - 96;

  // upper case char
  if (code >= 65 && code <= 90) return code - 38;

  return 0;
}
