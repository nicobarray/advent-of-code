import { makeGrid, readDayInputs } from "../lib/utils.ts";

async function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  const grid = makeGrid(input);

  const source = grid.find((_x, y, cell) => y === 0 && cell === "S");

  if (!source) {
    throw new Error("impossible");
  }

  grid.forEach((x, y, cell) => {
    if (cell === "S") {
      grid.set(x, y + 1, "|");
    } else if (cell === "|") {
      if (grid.get(x, y + 1) === "^") {
        grid.setMany([[x - 1, y + 1], [x + 1, y + 1]], "|");
        part1++;
      } else {
        grid.set(x, y + 1, "|");
      }
    }
  });

  return [part1, part2] as const;
}

const [example, input] = await readDayInputs(import.meta.dirname);

const [example1, example2] = await solve(example);
const [input1, input2] = await solve(input);

console.table([
  {
    name: "Example - Part 1",
    solution: example1,
  },
  {
    name: "Example - Part 2",
    solution: example2,
  },
  {
    name: "Input - Part 1",
    solution: input1,
  },
  {
    name: "Input - Part 2",
    solution: input2,
  },
]);
