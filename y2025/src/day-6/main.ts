import { Brray, makeGrid, readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;

  const part1Input = Brray.rotate90(
    input.split("\n").map((l) => l.trim().split(/\s+/)),
  );

  part1 = part1Input.map((problem) => {
    const op = problem[problem.length - 1];
    return problem.slice(0, problem.length - 1).map(Number).reduce(
      op === "*" ? Brray.mult : Brray.sum,
    );
  }).reduce(Brray.sum);

  console.log("Anwser 1:", part1);

  let part2 = 0;

  const grid = makeGrid(input);

  const seperatorIndexes: number[] = [];
  grid.forEach((x, y, cell) => {
    if (y !== 0 || cell !== " ") return;
    if (grid.down(x, y).join("").trim() === "") {
      seperatorIndexes.push(x);
    }
  });

  const problems: string[][] = [];

  for (const line of input.split("\n")) {
    const parts = Brray.splitN(line, seperatorIndexes);
    for (let x = 0; x < parts.length; x++) {
      problems[x] ??= [];
      problems[x].push(parts[x]);
    }
  }

  for (const def of problems) {
    const ns: number[] = [];
    for (let x = def[0].length - 1; x >= 0; x--) {
      let n = "";
      for (let y = 0; y < def.length - 1; y++) {
        n += def[y][x];
      }
      ns.push(Number(n));
    }
    part2 += ns.reduce(def[def.length - 1][0] === "*" ? Brray.mult : Brray.sum);
  }

  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
