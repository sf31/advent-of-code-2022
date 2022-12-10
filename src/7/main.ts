import { readFileByLine } from "../utils";

const lines = readFileByLine(`${__dirname}/input.txt`);
const dirList: { [path: string]: number } = {};
let path: string = "";

for (const line of lines) {
  if (line.length === 0) continue;
  if (line.charAt(0) === "$") {
    const [, cmd, arg] = line.split(" ");
    if (cmd === "cd") {
      if (arg === "/") path = "";
      else if (arg === "..") path = path.substring(0, path.lastIndexOf("/"));
      else path = `${path}/${arg}`;
    }
  } else {
    const [dirOrSize, name] = line.split(" ");
    const newPath = `${path}/${name}`;
    if (dirOrSize === "dir") dirList[newPath] = 0;
    else dirList[newPath] = parseInt(dirOrSize);
  }
}

const sumByDir: { [path: string]: number } = {};
Object.keys(dirList).forEach((path) => {
  const size = dirList[path];
  if (size === 0) return;

  const split = path
    .split("/")
    .slice(0, -1)
    .filter((p) => p);

  let subPath = "";
  split.forEach((dirName) => {
    subPath = `${subPath}/${dirName}`;
    sumByDir[subPath] = (sumByDir[subPath] || 0) + size;
  });
});

const resultOne = Object.keys(sumByDir)
  .map((dirName) => sumByDir[dirName])
  .filter((size) => size < 100000)
  .reduce((acc, item) => acc + item, 0);

const diskSpace = 70000000;
const minAvailableSpace = 30000000;

console.log(sumByDir);

console.log(`Part one: ${resultOne}`);

/**
 
{
    '/dir1/file1': 10,
    '/dir1/file2': 2,
    '/dir2/file2': 13,
    '/dir2/dir4/file4': 20
    ....
    '/dir1/dir2/.../dirN/file': value 
}
  
 */
