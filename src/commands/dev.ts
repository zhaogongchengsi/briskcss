import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "../config";
import { dev } from "../dev";
import consola from "consola";

export default defineCommand({
  meta: { name: "dev", description: "Process css files and monitor file changes by default" },
  args: {
    ...commonArgs,
    watch: {
      alias: "w",
      default: true,
      type: "boolean",
      description: "Whether to turn on file monitoring mode",
    },
  },
  async run({ args }) {
    const { config: configFile } = args;
    const { config } = await loadConfig(configFile as string);
	consola.start("Start compilation");
    await dev(config!);
  },
});
