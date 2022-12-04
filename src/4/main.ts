import { readFileByLine } from "../utils";

type Assignment = { from: number; to: number };
type Pair = { one: Assignment; two: Assignment };

const pairList = readFileByLine(`${__dirname}/input.txt`)
  .filter((pair) => pair.length > 1)
  .map(parsePair);

const fullyContained = pairList.map(isFullyContained);
const partContained = pairList.map(isPartiallyContained);

console.log(`Fully contained count: ${countTrueValues(fullyContained)}`);
console.log(`Partially contained count: ${countTrueValues(partContained)}`);

function countTrueValues(list: boolean[]): number {
  return list
    .map((val): number => (val ? 1 : 0))
    .reduce((acc, item) => acc + item, 0);
}

/**
 * Parse a pair (string). E.g '91-93,6-92'
 */
function parsePair(pair: string): Pair {
  if (pair.split(",").length !== 2)
    throw Error(`Input is not a (string) pair: '${pair}`);

  return {
    one: parseAssignment(pair.split(",")[0]),
    two: parseAssignment(pair.split(",")[1]),
  };
}

/**
 * Parse a string assignment. E.g '91-93'
 */
function parseAssignment(assignment: string): Assignment {
  const from = parseInt(assignment.split("-")[0]);
  const to = parseInt(assignment.split("-")[1]);
  if (isNaN(from) || isNaN(to))
    throw Error(`Cannot parse (NaN): "${assignment}"`);
  return { from, to };
}

function isFullyContained(pair: Pair): boolean {
  const assignmentOne = pair.one;
  const assignmentTwo = pair.two;

  if (
    isInRange(assignmentOne.from, assignmentTwo) &&
    isInRange(assignmentOne.to, assignmentTwo)
  )
    return true;

  if (
    isInRange(assignmentTwo.from, assignmentOne) &&
    isInRange(assignmentTwo.to, assignmentOne)
  )
    return true;

  return false;
}

function isInRange(value: number, assignment: Assignment): boolean {
  return value >= assignment.from && value <= assignment.to;
}

function isPartiallyContained(pair: Pair): boolean {
  if (isInRange(pair.one.from, pair.two)) return true;
  if (isInRange(pair.two.from, pair.one)) return true;
  return false;
}

// function getAssignmentSize(assignment: Assignment): number {
//   return Math.abs(assignment.to - assignment.from) + 1;
// }
