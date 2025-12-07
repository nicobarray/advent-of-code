import { readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  const [rangesInput, ingredients] = input.split("\n\n");

  const ranges = rangesInput.split("\n").map((line) =>
    line.split("-").map(Number)
  ) as [number, number][];

  for (const ingredient of ingredients.split("\n").map(Number)) {
    if (
      ranges.some(([left, right]) => ingredient >= left && ingredient <= right)
    ) {
      part1++;
    }
  }

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
