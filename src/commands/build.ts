import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "../config";

export default defineCommand({
  meta: { name: "build", description: "Working with css files" },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
	const { config: configFile } = args;
    const { config } = await loadConfig(configFile as string);

    console.log("build config: ", config);
  },
});
