export async function readFile(pathname: string) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(pathname);
  return decoder.decode(data);
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
