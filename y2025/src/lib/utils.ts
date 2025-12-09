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
    down(x: number, y: number) {
      return Array.from({ length: grid.height })
        .map((_, dy) => {
          return this.get(x, y + (dy + 1));
        }).filter((cell) => cell != null);
    },
    get(x: number, y: number) {
      if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
        return undefined;
      }
      return grid.data[key(x, y)];
    },
    setMany(indexes: [number, number][], value: string) {
      indexes.forEach(([x, y]) => {
        if (x < 0 || y < 0 || x >= grid.width || y >= grid.height) {
          return;
        }

        grid.data[key(x, y)] = value;
      });
    },
  };
}

export const Brray = {
  countChar: (char: string) => (acc: number, curr: string): number => {
    return (acc ?? 0) + (curr === char ? 1 : 0);
  },
  sum: (a: number, b: number): number => (a ?? 0) + b,
  mult: (a: number, b: number): number => (a ?? 1) * b,
  rotate90: (array: unknown[][]) => {
    const width = array.length;
    const height = array[0].length;

    const res = Array.from({ length: height }).map((_) =>
      Array.from({ length: width })
    );

    for (let x = 0; x < array.length; x++) {
      for (let y = 0; y < array[0].length; y++) {
        res[y][x] = array[x][y];
      }
    }

    return res;
  },
  splitN(str: string, indexes: number[]) {
    const res: string[] = [];

    let prevIndex = 0;
    for (let i = 0; i < indexes.length; i++) {
      res.push(str.slice(prevIndex, indexes[i]));
      prevIndex = indexes[i] + 1;
    }

    res.push(str.slice(prevIndex));

    return res;
  },
};
