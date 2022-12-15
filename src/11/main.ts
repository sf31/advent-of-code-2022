import { readFileByLine, splitArray } from "../utils";
import { parse } from "./parse.utils";

type Monkey = {
  id: number;
  items: number[];
  op: (item: number) => number;
  test: (item: number) => number;
};

const input = readFileByLine(`${__dirname}/input.sample.txt`);

// console.log(input);
parse(input);
