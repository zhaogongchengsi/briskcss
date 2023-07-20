import { loadConfig as lc } from "c12";
import type { Targets } from "lightningcss";

export interface BriskCssConfig {
  entry?: string[] | string;
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
}

export async function loadConfig(configFile: string = "brisk.config.ts") {
  const cwd = process.cwd();
  return await lc<BriskCssConfig>({
    cwd,
    configFile: configFile!,
    defaultConfig: {
      entry: "**/*.css",
      minify: false,
      analyzeDependencies: false,
      errorRecovery: true,
    },
  });
}

export function defineBriskConfig(config: BriskCssConfig): BriskCssConfig {
  return config;
}
