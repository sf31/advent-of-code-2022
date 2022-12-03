import { readFileByLine } from "../utils";

type Shape = "Rock" | "Paper" | "Scissors";
type Round = { me: Shape; opponent: Shape };

function main(): void {
  const roundList = readFileByLine(`${__dirname}/input.txt`);

  const totalScore = roundList
    .map((roundString) => {
      const round = parseRound(roundString);
      if (round === null) return 0;
      return getMyRoundScore(round) + getShapeScore(round.me);
    })
    .reduce((acc, item) => acc + item, 0);

  console.log(`My total score: ${totalScore}`);
}

function parseRound(round: string): Round | null {
  if (round.length === 0) return null;
  const me = round.split(" ")[1];
  const opponent = round.split(" ")[0];
  return { me: letterToShape(me), opponent: letterToShape(opponent) };
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

main();
