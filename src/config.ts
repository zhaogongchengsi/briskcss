import { loadConfig as lc } from "c12";
import type { Targets, Drafts } from "lightningcss";
import { Features } from "lightningcss";

export type Entry = string;

export interface BriskCssConfig {
  entry: Entry;
  outDir?: string;
  cwd?: string;
  lightning?: {
    /** Whether to enable minification. */
    minify?: boolean;
    /** The browser targets for the generated code. */
    targets?: Targets;
    /**
     * Whether to analyze `url()` dependencies.
     * When enabled, `url()` dependencies are replaced with hashed placeholders
     * that can be replaced with the final urls later (after bundling).
     * Dependencies are returned as part of the result.
     */
    analyzeDependencies?: boolean;
    /**
     * Whether to ignore invalid rules and declarations rather than erroring.
     * When enabled, warnings are returned, and the invalid rule or declaration is
     * omitted from the output code.
     */
    errorRecovery?: boolean;
    drafts?: Drafts;
    // Always compile colors and CSS nesting, regardless of browser targets.
    include?: Features;
    // Never add any vendor prefixes, regardless of targets.
    exclude?: Features;
  };
}

export async function loadConfig(configFile: string = "brisk.config.ts") {
  const cwd = process.cwd();
  return await lc<BriskCssConfig>({
    cwd,
    configFile: configFile!,
    defaultConfig: {
      cwd,
      entry: "**/*.css",
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
