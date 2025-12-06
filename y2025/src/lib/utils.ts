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
