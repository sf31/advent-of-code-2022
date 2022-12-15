import * as fs from "fs";

export function readFileByLine(
  path: string,
  skipEmptyLines: boolean = false
): string[] {
  return !skipEmptyLines
    ? readFile(path)
    : readFile(path).filter((line) => line.length);
}

function readFile(path: string): string[] {
  return fs.readFileSync(path, "utf8").toString().split("\n");
}

export function notNullOrUndefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

export function splitArray<T>(array: T[], divideBy: T): T[][] {
  const chunks: T[][] = [];
  let chunk: T[] = [];

  for (const item of array) {
    if (item === divideBy) {
      chunks.push(chunk);
      chunk = [];
    } else {
      chunk.push(item);
    }
  }

  return chunks;
}
