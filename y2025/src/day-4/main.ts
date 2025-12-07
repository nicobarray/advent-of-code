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

  let removedSome = false;
  const tick = () => {
    const removed: [number, number][] = [];
    grid.forEach((x, y, cell) => {
      if (cell !== "@") {
        return;
      }

      const around = grid.n8(x, y);

      if (around.reduce(Brray.countChar("@"), 0) >= 4) {
        return;
      }

      removed.push([x, y]);

      // part1++;
      part2++;
    });

    removedSome = removed.length > 0;
    grid.setMany(removed, ".");
  };

  do {
    tick();
  } while (removedSome);

  // console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
