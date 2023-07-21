import { BriskCssConfig } from "./config";
import chokidar from "chokidar";
import { transform } from "./transform";
import { outputFile, remove } from "fs-extra";
import { join, relative, parse } from "pathe";

export async function dev(config: BriskCssConfig) {
  const inputDir = join(config.cwd!, config.inputDir);
  const outDir = join(config.cwd!, config.outDir!);

  const watcher = chokidar.watch("./**/*.css", {
    cwd: inputDir,
  });

  const build = async (path: string) => {
    const { name, dir, base } = parse(path);
    if (name.startsWith("_")) {
      return;
    }

    const tagDir = join(outDir, path);

    const { code, map } = await transform(join(inputDir, path), config);
    if (map) {
      const mapPath = join(config.cwd!, config.mapDir!, dir, `${base}.map`);
      await outputFile(mapPath, map);
      const comment = Buffer.from(`\n\n/*# sourceMappingURL=${relative(tagDir, mapPath).substring(3)} */`);
      await outputFile(tagDir, Buffer.concat([code, comment]));
    } else {
      await outputFile(tagDir, code);
    }
  };

  watcher.on("add", (path) => {
    build(path);
  });

  watcher.on("change", (path) => {
    build(path);
  });

  watcher.on("unlink", (path) => {
    remove(join(outDir, path));
  });

  watcher.on("unlinkDir", (path) => {
    remove(join(outDir, path));
  });
}
