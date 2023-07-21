import { BriskCssConfig } from "./config";
import { scan } from "./scan";
import { convert } from "./transform";
import { outputFile } from "fs-extra";
import { join, normalize, parse } from "pathe";

export async function build(config: BriskCssConfig) {
  const css = await scan(config);
  const inputDir = join(config.cwd!, config.inputDir);
  const outDir = join(config.cwd!, config.outDir!);

  const result = await convert(css, config);

  for (const { path, code } of result) {

    const { base, dir } = parse(normalize(path).replace(inputDir, ""));

    await outputFile(join(outDir, dir, base), code);
  }
}
