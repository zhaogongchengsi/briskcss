import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "../config";
import { build } from "../build";
import consola from "consola";
import { colors } from "consola/utils";

export default defineCommand({
  meta: { name: "build", description: "Working with css files" },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    const { config: configFile } = args;
    const { config } = await loadConfig(configFile as string);
    consola.start("Start compilation");
    const start = Date.now();
    await build(config!);
    const end = Date.now();

    consola.success(`It takes ${colors.greenBright(`${end - start} ms`)} seconds to compile successfully.`);
  },
});
