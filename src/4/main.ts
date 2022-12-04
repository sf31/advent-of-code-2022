import { readFileByLine } from "../utils";

type Assignment = { from: number; to: number };
type Pair = { one: Assignment; two: Assignment };

const fullyContainedCount = readFileByLine(`${__dirname}/input.txt`)
  .map((pair) => {
    if (pair.length <= 1) return false;
    return isFullyContained(parsePair(pair));
  })
  .map((doesOverlap): number => (doesOverlap ? 1 : 0))
  .reduce((acc, item) => acc + item, 0);

console.log(`Fully contained count: ${fullyContainedCount}`);

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

// function getAssignmentSize(assignment: Assignment): number {
//   return Math.abs(assignment.to - assignment.from) + 1;
// }
