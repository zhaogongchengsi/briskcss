import { defineCommand } from "citty";
import { commonArgs } from "./args";
import { loadConfig } from "c12";

export default defineCommand({
  meta: { name: "dev", description: "Build an app" },
  args: {
    ...commonArgs,
  },
  async run({ args }) {
    const { config } = args;

    console.log("dev config: ", config);
  },
});
