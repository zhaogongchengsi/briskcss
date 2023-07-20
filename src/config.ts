import { loadConfig as lc } from "c12";

export async function loadConfig(configFile: string = "brisk.config.ts") {
  const cwd = process.cwd();
  return await lc({
    cwd,
    configFile: configFile!,
  });
}

