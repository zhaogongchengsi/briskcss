import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "../config";
import { build } from "../build";
import consola from "consola";

export default defineCommand({
  meta: { name: "build", description: "Working with css files" },
  args: {
    ...commonArgs
  },
  async run({ args }) {
    const { config: configFile } = args;
    const { config } = await loadConfig(configFile as string);
    consola.start("Start compilation");
    await build(config!);
    consola.success("Compilation completed");
  },
});
