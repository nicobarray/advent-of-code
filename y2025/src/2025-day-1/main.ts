import { readFile } from "../lib/utils.ts";

async function solve(pathname: string) {
  const input = await readFile(pathname);

  let dial = 50;
  let part1 = 0;
  let part2 = 0;

  console.log(`The dial starts by pointing at ${dial}.`);

  for (const line of input.split("\n")) {
    const dir = line[0] === "L" ? -1 : 1;
    let amount = parseInt(line.substring(1));

    while (amount > 0) {
      amount--;

      dial += dir;

      if (dial === 100) {
        dial = 0;
      }

      if (dial === -1) {
        dial = 99;
      }

      if (dial === 0) {
        part2++;
      }
    }

    if (dial === 0) {
      part1++;
    }

    console.log(`The dial is rotated ${line} to point at ${dial}.`);
  }

  console.log("Anwser 1:", part1);
  console.log("Anwser 2:", part2);
}

solve("data/2025-day-1/input.txt");
solve("data/2025-day-1/example.txt");
