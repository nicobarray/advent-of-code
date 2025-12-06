import { readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  for (const range of input.split(",")) {
    const [from, to] = range.split("-").map((v) => parseInt(v));

    for (let i = from; i <= to; i++) {
      const id = i.toString();
      const left = id.substring(0, id.length / 2);
      const right = id.substring(id.length / 2);
      if (left === right) {
        // console.log("[part1]", id, left, right);
        part1 += i;
      }

      let isInvalidId = false;
      for (let k = 1; k <= id.length / 2; k++) {
        const pattern = id.substring(0, k);
        for (
          let times = 1;
          times <= id.length / pattern.length;
          times++
        ) {
          if (id === pattern.repeat(times)) {
            // console.log(
            //   "[part2]",
            //   "range is [" + from + "," + to + "]",
            //   id,
            //   "is just",
            //   pattern,
            //   "repeated",
            //   times,
            //   "times",
            // );
            part2 += i;
            isInvalidId = true;
            break;
          }
        }

        if (isInvalidId) {
          break;
        }
      }
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
