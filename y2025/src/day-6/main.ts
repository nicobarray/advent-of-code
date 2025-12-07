import { Brray, readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  const problems = Brray.rotate90(
    input.split("\n").map((l) => l.trim().split(/\s+/)),
  );

  part1 = problems.map((problem) => {
    const op = problem[problem.length - 1];
    return problem.slice(0, problem.length - 1).map(Number).reduce(
      op === "*" ? Brray.mult : Brray.sum,
    );
  }).reduce(Brray.sum);

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
