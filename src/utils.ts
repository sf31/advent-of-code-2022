import * as fs from "fs";

export function readFileByLine(path: string): string[] {
  return fs.readFileSync(path, "utf8").toString().split("\n");
}

export function notNullOrUndefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}
