export async function readFile(pathname: string) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(pathname);
  return decoder.decode(data);
}

export function readDayInputs(currentImportPath: string | undefined) {
  return Promise.all([
    readFile(
      currentImportPath?.replace("src", "data") + "/example.txt",
    ),
    readFile(
      currentImportPath?.replace("src", "data") + "/input.txt",
    ),
  ]);
}

export function signedModulo(value: number, divider: number): number {
  if (divider > 0) {
    value %= divider;
    return value;
  }

  while (value < 0) {
    value += -divider;
  }

  return value;
}

export function makeGrid(input: string) {
  const rows = input.split("\n");
  const grid: { data: Record<string, string>; width: number; height: number } =
    {
      data: {},
      width: rows[0].length,
      height: rows.length,
    };
  const key = (x: number, y: number) => x + "," + y;

  for (let y = 0; y < rows.length; y++) {
    const cols = rows[y];
    for (let x = 0; x < cols.length; x++) {
      const cell = cols[x];
      grid.data[key(x, y)] = cell;
    }
  }

  return {
    grid,
    forEach(callback: (x: number, y: number, cell: string) => void) {
      for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
          callback(x, y, grid.data[key(x, y)]);
        }
      }
    },
    n4(x: number, y: number) {
      if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return [];
      }
      return [
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
      ].map(([x, y]) => grid.data[key(x, y)]);
    },
    n8(x: number, y: number) {
      if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return [];
      }
      return [
        [x, y - 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
        [x, y + 1],
        [x - 1, y + 1],
        [x - 1, y],
        [x - 1, y - 1],
      ].map(([x, y]) => grid.data[key(x, y)]);
    },
  };
}

export const Brray = {
  countChar: (char: string) => (acc: number, curr: string): number => {
    return (acc ?? 0) + (curr === char ? 1 : 0);
  },
};
