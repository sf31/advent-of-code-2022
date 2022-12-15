import { splitArray } from "../utils";
import { Monkey, Operation } from "./monkey.type";

export function parse(input: string[]): Monkey[] {
  return splitArray<string>(input, "").map((monkey) => {
    // const [id, items, op, test, ifTrue, ifFalse] = monkey;
    const id = parseId(monkey[0]);
    const items = parseItems(monkey[1]);
    const myWorry = calcWorry(monkey[2]);

    // TODO: next one requires the result (myWorry) above...
    const nextMonkeyId = calcNextMonkeyId(monkey[3], monkey[4], monkey[5]);

    return {
      id,
      items,
      myWorry,
      nextMonkeyId,
    };
  });
}

function parseId(str: string): number {
  const num = str.substring(0, str.length - 1).split(" ")[1];
  return parseInt(num);
}

function parseItems(str: string): number[] {
  return str
    .replace(/ /g, "")
    .split(":")[1]
    .split(",")
    .map((i) => parseInt(i));
}

function calcWorry(str: string): (input: number) => number {
  return (input: number) => {
    const expr = parseExpr(str, input);

    const arg1 = expr.arg1;

    if (expr.op === "*") return expr.arg1 * expr.arg2;
    if (expr.op === "+") return expr.arg1 + expr.arg2;
    throw Error(`Unsupported operation: "${expr.op}"`);
  };
}

type Expr = {
  arg1: number;
  op: string;
  arg2: number;
};
function parseExpr(expr: string, input: number): Expr {
  let [out, equal, arg1, op, arg2] = expr.split(":")[1].trim().split(" ");
  return { arg1: parseArg(arg1, input), op, arg2: parseArg(arg2, input) };
}

function parseArg(arg: string, input: number): number {
  if (arg === "old") return input;
  const num = parseInt(arg);
  if (isNaN(num)) throw Error(`arg is NaN: "${arg}"`);
  return num;
}

function calcNextMonkeyId(
  test: string,
  ifTrue: string,
  ifFalse: string
): (myWorry: number) => number {
  const divisible = test.split(" ")[1] === "divisible";
  if (!divisible) throw Error(`Test op unknown: "${test}"`);

  return (myWorry: number) => {
    return 1;
  };
}
