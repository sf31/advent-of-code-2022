import { notNullOrUndefined, readFileByLine } from "../utils";

type Move = { qty: number; from: number; to: number };
const { moveList, stackList } = parseFile(`${__dirname}/input.txt`);

/**
 * Run only one of the following functions at time (comment out the other)
 * Arrays are modified in place!
 */

// for (const move of moveList) crateMover9000(move, stackList);
for (const move of moveList) crateMover9001(move, stackList);

const topCrateList = stackList
  .map((stack) => stack[stack.length - 1])
  .reduce((acc, item) => acc + item, "")
  .replace(/\[|\]/g, "");

console.log(`Top crate list: ${topCrateList}`);

/*****/

function parseFile(path: string): { moveList: Move[]; stackList: string[][] } {
  const lines = readFileByLine(path);
  const instructionStartIndex = lines.findIndex((line) => line === "");

  const crateStackList = lines.slice(0, instructionStartIndex);
  const moveList = lines.slice(instructionStartIndex + 1);

  return {
    moveList: parseMoveList(moveList),
    stackList: parseStackList(crateStackList),
  };
}

function parseStackList(stackList: string[]): string[][] {
  const stackCount = stackList[stackList.length - 1].replace(/\s/g, "").length;

  /**
   * Crates as array from bottom
   */
  const crateStackList: string[][] = [];

  for (let k = 0; k < stackList.length - 1; k++) {
    const line = stackList[k];
    for (let i = 0; i < line.length; i += 4) {
      const crate = line.slice(i, i + 4).trim();
      if (crate.length === 0) continue;
      const crateIndex = i / 4;
      const currentCrateStack = crateStackList[crateIndex] || [];
      crateStackList[crateIndex] = [crate, ...currentCrateStack];
    }
  }

  return crateStackList;
}

function parseMoveList(moveList: string[]): Move[] {
  return moveList
    .map((move) => {
      const split = move.split(" ");
      if (split.length !== 6) return null;

      const qty = parseInt(split[1]);
      const from = parseInt(split[3]);
      const to = parseInt(split[5]);

      if (isNaN(qty) || isNaN(from) || isNaN(to))
        throw Error(`Cannot parse input: ${qty}`);
      return { qty, from, to };
    })
    .filter(notNullOrUndefined);
}

/**
 * !! Warning: in-place arrays functions used !!
 * These two functions will modifify the input arrays
 */
function crateMover9000(move: Move, stackList: string[][]): void {
  const fromStack = stackList[move.from - 1];
  const toStack = stackList[move.to - 1];

  for (let i = 0; i < move.qty; i++) {
    const elemToMove = fromStack.pop();
    if (!elemToMove) throw Error("Cannot move from an empty stack!");
    toStack.push(elemToMove);
  }
}

function crateMover9001(move: Move, stackList: string[][]): void {
  const fromStack = stackList[move.from - 1];
  const toStack = stackList[move.to - 1];

  const cratesToMove = fromStack.slice(-move.qty);
  for (const crate of cratesToMove) toStack.push(crate);
  fromStack.splice(-move.qty);
}
