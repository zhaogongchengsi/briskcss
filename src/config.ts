import { loadConfig as lc } from "c12";
import type { Targets, Drafts } from "lightningcss";
import { Features } from "lightningcss";

export type Entry = string;

export interface BriskCssConfig {
  inputDir: string;
  outDir?: string;
  mapDir?: string;
  cwd?: string;
  // see: https://lightningcss.dev/docs.html
  lightning?: {
    minify?: boolean;
    targets?: Targets;
    analyzeDependencies?: boolean;
    errorRecovery?: boolean;
    drafts?: Drafts;
    include?: Features;
    exclude?: Features;
  };
}

export async function loadConfig(configFile: string = "brisk.config.ts") {
  const cwd = process.cwd();
  return await lc<BriskCssConfig>({
    cwd,
    configFile: configFile!,
    defaultConfig: {
      inputDir: "",
      cwd,
      mapDir: "map",
      outDir: "style",
      lightning: {
        minify: false,
        analyzeDependencies: false,
        errorRecovery: true,
        drafts: {
          nesting: true,
          customMedia: true,
        },
      },
    },
  });
}

export function defineBriskConfig(config: BriskCssConfig): BriskCssConfig {
  return config;
}
