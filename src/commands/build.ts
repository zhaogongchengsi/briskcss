import { defineCommand } from "citty";
import { commonArgs } from "./args";

export default defineCommand({
  meta: { name: "build", description: "Build an app" },
  args: {
    ...commonArgs,
  },
  run({ args }) {
    const { config } = args;

    console.log("build config: ", config);
  },
});
