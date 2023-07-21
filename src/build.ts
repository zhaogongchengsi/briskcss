import { BriskCssConfig } from "./config";
import { scan } from "./scan";
import { transform } from "./transform";
import { outputFile } from "fs-extra";
import { join, parse } from "path";

export async function build(config: BriskCssConfig) {
  const css = await scan(config);

  for (const path of css) {
    const { code } = await transform(path, config);
    const { base } = parse(path);
    await outputFile(join(config.cwd!, config.outDir!, base), code);
  }
}
