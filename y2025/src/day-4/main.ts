import { Brray, makeGrid, readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  const grid = makeGrid(input);

  grid.forEach((x, y, cell) => {
    if (cell !== "@") {
      return;
    }

    const around = grid.n8(x, y);

    if (around.reduce(Brray.countChar("@"), 0) >= 4) {
      return;
    }

    part1++;
  });

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
