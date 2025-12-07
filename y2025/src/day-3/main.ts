import { readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  for (const line of input.split("\n")) {
    const bank = line.split("").map(Number);

    const maxIndexInRange = (from: number, to: number) => {
      let maxIndex_ = -1;
      for (let j = from; j < to; j++) {
        if (maxIndex_ === -1 || bank[maxIndex_] < bank[j]) {
          maxIndex_ = j;
        }
      }
      return maxIndex_;
    };

    const calculateBankPower = (n: number) =>
      Array.from({ length: n }).reduce(
        ({ power, lastIndex }, _, i) => {
          const maxIndex = maxIndexInRange(
            lastIndex + 1,
            bank.length - (n - i - 1),
          );
          const nextPower = power + 10 ** (n - 1 - i) * bank[maxIndex];
          return {
            power: nextPower,
            lastIndex: maxIndex,
          };
        },
        { power: 0, lastIndex: -1 },
      ).power;

    part1 += calculateBankPower(2);
    part2 += calculateBankPower(12);
  }

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

console.log("Example");
solve(example);
console.log("Input");
solve(input);
