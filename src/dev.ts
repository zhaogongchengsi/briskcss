import { BriskCssConfig } from "./config";
import chokidar from "chokidar";
import { transform } from "./transform";
import { outputFile, remove } from "fs-extra";
import { join, relative, parse } from "pathe";
import consola from "consola";
import { colors } from "consola/utils";

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

  const info = (message: string) => {
    return colors.greenBright(message);
  };

  watcher.on("add", (path) => {
    consola.info(`Add new file: ${info(path)}`);
    build(path);
  });

  watcher.on("change", (path) => {
    consola.info(`${info(path)} file change`);
    build(path);
  });

  watcher.on("unlink", (path) => {
    consola.warn(`remove ${colors.red(path)}`);
    remove(join(outDir, path));
  });

  watcher.on("unlinkDir", (path) => {
    consola.warn(`remove ${colors.red(path)}`);
    remove(join(outDir, path));
  });
}
