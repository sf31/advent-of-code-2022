import { readFileByLine } from "../utils";

const grid = readFileByLine(`${__dirname}/input.txt`, true).map((line) =>
  Array.from(line).map((tree) => parseInt(tree))
);

// const grid = [
//   [3, 0, 3, 7, 3],
//   [2, 5, 5, 1, 2],
//   [6, 5, 3, 3, 2],
//   [3, 3, 5, 4, 9],
//   [3, 5, 3, 9, 0],
// ];

const totalTrees = getTreeCount(grid);
const { innerVisibleTrees, maxScenicScore } = getInnerVisibleTrees(grid);
const perimeter = getPerimeter(grid);
const totalVisible = innerVisibleTrees + perimeter;

console.log(`
Total: ${totalTrees}
Hidden: ${totalTrees - totalVisible}
Visible: ${totalVisible}
Max scenic score: ${maxScenicScore}
`);

function getInnerVisibleTrees(grid: number[][]): {
  innerVisibleTrees: number;
  maxScenicScore: number;
} {
  let innerVisibleTrees = 0;
  let maxScenicScore = 0;

  for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < grid[rowIndex].length - 1; colIndex++) {
      const tree = grid[rowIndex][colIndex];
      const row = grid[rowIndex];
      const column = grid.map((row) => row[colIndex]);
      if (isVisible(tree, row, colIndex) || isVisible(tree, column, rowIndex))
        innerVisibleTrees = innerVisibleTrees + 1;
      const score = getScenicScore(tree, row, column, rowIndex, colIndex);
      if (score > maxScenicScore) maxScenicScore = score;
    }
  }

  return { innerVisibleTrees, maxScenicScore };
}

function isVisible(tree: number, list: number[], index: number): boolean {
  const first = list.slice(0, index);
  const last = list.slice(index + 1);
  return first.every((t) => t < tree) || last.every((t) => t < tree);
}

function getScenicScore(
  tree: number,
  row: number[],
  col: number[],
  rowIndex: number,
  colIndex: number
): number {
  //   console.log(
  //     `${tree}(col: ${colIndex}, row: ${rowIndex} ) - row: ${row} -- col: ${col}`
  //   );
  const left = row.slice(0, colIndex);
  const right = row.slice(colIndex + 1);
  const up = col.slice(0, rowIndex);
  const bottom = col.slice(rowIndex + 1);

  const leftScore = calcScenicScore(tree, [...left].reverse());
  const rightScore = calcScenicScore(tree, right);
  const upScore = calcScenicScore(tree, [...up].reverse());
  const bottomScore = calcScenicScore(tree, bottom);

  return leftScore * rightScore * upScore * bottomScore;
}

function calcScenicScore(tree: number, list: number[]): number {
  const higherTreeIndex = list.findIndex((t) => t >= tree);
  if (higherTreeIndex === -1) return list.length;
  return higherTreeIndex + 1;
}

function getPerimeter(grid: number[][]): number {
  return grid.length * 2 + grid[0].length * 2 - 4;
}

function getTreeCount(grid: number[][]): number {
  return grid.length * grid[0].length;
}
