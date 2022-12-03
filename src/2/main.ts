import { readFileByLine } from "../utils";

type Shape = "Rock" | "Paper" | "Scissors";
type Round = { me: Shape; opponent: Shape };
type EndResult = "Win" | "Draw" | "Lose";

(() => {
  const roundList = readFileByLine(`${__dirname}/input.txt`);

  const totalPartOne = roundList
    .map(parseRoundPartOne)
    .map(getTotalRoundScore)
    .reduce((acc, item) => acc + item, 0);

  const totalPartTwo = roundList
    .map(parseRoundPartTwo)
    .map(getTotalRoundScore)
    .reduce((acc, item) => acc + item, 0);

  console.log(`[ Part one ] Total score: ${totalPartOne}`);
  console.log(`[ Part two ] Total score: ${totalPartTwo}`);
})();

function parseRoundPartOne(round: string): Round | null {
  if (round.length === 0) return null;
  const opponent = round.split(" ")[0];
  const me = round.split(" ")[1];
  return { me: letterToShape(me), opponent: letterToShape(opponent) };
}

function parseRoundPartTwo(round: string): Round | null {
  if (round.length === 0) return null;
  const myEndResult = getEndResult(round.split(" ")[1]);
  const opponent = letterToShape(round.split(" ")[0]);
  const me = getShapeToEnd(opponent, myEndResult);

  return { me, opponent };
}

/**
 * Helpers
 */

function getTotalRoundScore(round: Round | null): number {
  if (round === null) return 0;
  return getMyRoundScore(round) + getShapeScore(round.me);
}

function getShapeToEnd(opponent: Shape, result: EndResult): Shape {
  if (result === "Win") {
    if (opponent === "Rock") return "Paper";
    if (opponent === "Paper") return "Scissors";
    return "Rock";
  }
  if (result === "Lose") {
    if (opponent === "Rock") return "Scissors";
    if (opponent === "Paper") return "Rock";
    return "Paper";
  }
  return opponent;
}

function getEndResult(letter: string): EndResult {
  switch (letter) {
    case "X":
      return "Lose";
    case "Y":
      return "Draw";
    case "Z":
      return "Win";
    default:
      throw Error(`Invalid letter found: "${letter}"`);
  }
}

function letterToShape(letter: string): Shape {
  switch (letter) {
    case "A":
    case "X":
      return "Rock";
    case "B":
    case "Y":
      return "Paper";
    case "C":
    case "Z":
      return "Scissors";
    default:
      throw Error(`Invalid letter found: "${letter}"`);
  }
}

function getShapeScore(shape: Shape): number {
  switch (shape) {
    case "Rock":
      return 1;
    case "Paper":
      return 2;
    case "Scissors":
      return 3;
    default:
      return 0;
  }
}

function getMyRoundScore(round: Round): number {
  const { me, opponent } = round;
  if (me === opponent) return 3;

  if (me === "Rock") return opponent === "Paper" ? 0 : 6;
  if (me === "Paper") return opponent === "Scissors" ? 0 : 6;
  if (me === "Scissors") return opponent === "Rock" ? 0 : 6;

  return 0;
}
