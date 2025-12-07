import { Brray, readDayInputs } from "../lib/utils.ts";

function solve(input: string) {
  let part1 = 0;
  let part2 = 0;

  const [rangesInput, ingredients] = input.split("\n\n");

  const ranges = rangesInput.split("\n").map((line) =>
    line.split("-").map(Number)
  ) as [number, number][];

  // #region Part 2

  let toProcess = ranges;
  let somethingChanged = false;
  let it = 0;
  do {
    somethingChanged = false;
    const processedRanges: [number, number][] = [];
    for (const range of toProcess) {
      // console.log(range);
      // some overlap.
      const overlappingIndex = processedRanges.findIndex((r) => {
        const [aLeft, aRight] = range;
        const [bLeft, bRight] = r;

        // --------[aaa]-[bbb]----- don't overlap
        // --------[aa#bb]--------- overlap
        // --------[###]----------- overlap
        // ------[bb#aa]----------- overlap
        // --[bbb]-[aaa]----------- don't overlap

        return bLeft <= aRight && bRight >= aLeft;
      });

      if (overlappingIndex === -1) {
        processedRanges.push(range);
      } else {
        somethingChanged = true;
        processedRanges[overlappingIndex] = [
          Math.min(processedRanges[overlappingIndex][0], range[0]),
          Math.max(processedRanges[overlappingIndex][1], range[1]),
        ];
      }
    }

    // console.log("It", it++);
    // console.table(processedRanges);
    toProcess = processedRanges;
  } while (somethingChanged);

  part2 = toProcess.map((r) => r[1] - r[0] + 1).reduce(Brray.sum);
  // #endregion

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
