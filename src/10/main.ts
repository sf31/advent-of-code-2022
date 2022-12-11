import { readFileByLine } from "../utils";

const input = readFileByLine(`${__dirname}/input.txt`, true);
const instructionList = addNoopInstructions(input);

let xReg = 1;
let cycle = 0;
let sum = 0;
let crt = getCrt();
const crtEmptyLine = Array(40)
  .fill(".")
  .reduce((acc, item) => acc + item);

for (const i of instructionList) {
  cycle++;
  if (isCheckCycle(cycle)) sum = sum + cycle * xReg;
  const [code, arg] = i.split(" ");
  if (code === "addx") xReg += parseInt(arg);

  const spritePos = replaceAt(crtEmptyLine, xReg - 1, "###");
  const crtRow = Math.floor(cycle / 40);
  const crtPixelIndex = cycle - 40 * crtRow;

  if (crt[crtRow]) {
    crt[crtRow] = replaceAt(
      crt[crtRow],
      crtPixelIndex,
      spritePos[crtPixelIndex]
    );
  }
}

console.log(`Sum: ${sum}`);
console.log(crt);

function addNoopInstructions(instructions: string[]): string[] {
  return instructions
    .map((i) => {
      const [code] = i.split(" ");
      if (code === "addx") return ["noop", i];
      else return [i];
    })
    .flat();
}

function isCheckCycle(cycle: number): boolean {
  if (cycle === 20) return true;
  if (cycle > 220) return false; // should we stop at 220th cycle?
  return (cycle - 20) % 40 === 0;
}

function getCrt(): string[] {
  const width = 40;
  const height = 6;

  const row = Array(width)
    .fill(".")
    .reduce((acc, item) => acc + item);
  return Array(height).fill(row);
}

function replaceAt(str: string, index: number, replaceWith: string): string {
  const first = str.substring(0, index);
  const last = str.substring(index + replaceWith.length);
  return `${first}${replaceWith}${last}`;
}
