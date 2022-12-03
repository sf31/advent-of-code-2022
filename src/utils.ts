import * as fs from "fs";

export function readFileByLine(path: string): string[] {
  return fs.readFileSync(path, "utf8").toString().split("\n");
}
