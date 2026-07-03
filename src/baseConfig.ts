import "dotenv/config";
import type { Argv } from "yargs";

/* v8 ignore next -- @preserve */
export const baseConfig = (yargs: Argv) =>
  yargs.env("PREFIX").option("dryRun", {
    type: "boolean",
    description: "Run the command in dry run mode without making any changes",
  });

export type InferArgv<T> = T extends Argv<infer U> ? U : never;
