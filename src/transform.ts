import { transform as tf } from "lightningcss";

export async function transform(path: string) {
  const filename = "";
  const css = Buffer.from(".foo { color: red }");

  let { code, map } = tf({
    filename,
    code: css,
    minify: true,
    sourceMap: true,
  });
}
