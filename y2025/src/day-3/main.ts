import { readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  for (const line of input.split("\n")) {
    const bank = line.split("").map(Number);

    let maxIndex = -1;
    for (let i = 0; i < bank.length - 1; i++) {
      if (maxIndex === -1 || bank[maxIndex] < bank[i]) {
        maxIndex = i;
      }
    }

    let unitIndex = -1;
    for (let j = maxIndex + 1; j < bank.length; j++) {
      if (unitIndex === -1 || bank[unitIndex] < bank[j]) {
        unitIndex = j;
      }
    }

    part1 += bank[maxIndex] * 10 + bank[unitIndex];
  }

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
