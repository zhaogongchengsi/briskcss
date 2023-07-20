#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import dev from "./commands/dev";
import build from "./commands/build";

const main = defineCommand({
  meta: {
    name: "brisk",
    version: "0.0.1",
    description: "Lightning CSS CLI",
  },
  subCommands: {
    dev,
    build,
  },
});

runMain(main);
