import { bundle, Features } from "lightningcss";
import { BriskCssConfig } from "./config";

export async function transform(path: string, config: BriskCssConfig) {
  return bundle({
    filename: path,
    minify: false,
    sourceMap: true,
    include:
      Features.Colors |
      Features.Nesting |
      Features.CustomMediaQueries |
      Features.MediaRangeSyntax |
      Features.NotSelectorList |
      Features.MediaQueries |
      Features.VendorPrefixes |
      Features.ClampFunction,
    ...config.lightning,
  });
}

export async function convert(paths: string[], config: BriskCssConfig) {
  const css: { code: Buffer; map: void | Buffer; path: string }[] = [];
  for (const path of paths) {
    const result = await transform(path, config);
    css.push({ ...result, path });
  }
  return css;
}
