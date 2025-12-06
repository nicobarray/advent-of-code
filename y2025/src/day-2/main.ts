import { readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  // let part2 = 0;

  for (const range of input.split(",")) {
    const [from, to] = range.split("-").map((v) => parseInt(v));

    for (let i = from; i <= to; i++) {
      const j = i.toString();
      const l = j.substring(0, j.length / 2);
      const r = j.substring(j.length / 2);
      if (l === r) {
        console.log(j, l, r);
        part1 += i;
      }
    }
  }

  console.log("Anwser 1:", part1);
  // console.log("Anwser 2:", part2);
}

const [example, input] = await readDayInputs(import.meta.dirname);

solve(input);
// solve(example);
