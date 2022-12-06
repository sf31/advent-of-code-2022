import { readFileByLine } from "../utils";

const file = readFileByLine(`${__dirname}/input.txt`)[0];
const index = getMarkerIndex(file);
const output = index === -1 ? "Marker not found" : `Found Marker at: ${index}`;
console.log(output);

function getMarkerIndex(buffer: string): number {
  for (let i = 3; i < buffer.length; i++) {
    const subset = buffer.slice(i - 4, i);
    const distinctCharCount = new Set(Array.from(subset)).size;
    if (distinctCharCount === 4) return i;
  }
  return -1;
}
