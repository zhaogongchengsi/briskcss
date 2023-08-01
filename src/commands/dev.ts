import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "../config";
import { dev } from "../dev";
import consola from "consola";

export default defineCommand({
  meta: { name: "dev", description: "Process css files and monitor file changes by default" },
  args: {
    ...commonArgs
  },
  async run({ args }) {
    const { config: configFile } = args;
    const { config } = await loadConfig(configFile as string);
    consola.start("Start compilation");
    await dev(config!);
  },
});
