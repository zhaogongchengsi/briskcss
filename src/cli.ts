#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import build from "./commands/build";
import dev from "./commands/dev";

const main = defineCommand({
  meta: {
    name: "brisk",
    version: "0.0.1",
    description: "Lightning CSS CLI",
  },

  subCommands: {
    build,
    dev
  },
});

runMain(main);
