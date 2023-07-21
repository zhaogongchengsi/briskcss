import { BriskCssConfig } from "./config";
import { glob } from "glob";
import { parse } from "path";
import { resolve } from "pathe";

export async function scan(config: BriskCssConfig) {
  const { cwd, inputDir } = config;
  const cssFile = await glob(`${inputDir}/**/*.css`, {
    cwd,
    absolute: true,
  });

  return cssFile
    .filter((path) => {
      const { ext, name } = parse(path);
      return ext === ".css" && !name.startsWith("_");
    })
    .map((path) => resolve(path));
}
