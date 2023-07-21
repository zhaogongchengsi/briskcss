import { bundle } from "lightningcss";
import { BriskCssConfig } from "./config";

export async function transform(path: string, config: BriskCssConfig) {
  return bundle({
    filename: path,
    // code: css,
    minify: false,
    sourceMap: true,
    ...config.lightning,
  });
}
