import "dotenv/config";
import type { ArgumentsCamelCase, Argv } from "yargs";
import { baseConfig, type InferArgv } from "../baseConfig";

/* v8 ignore next -- @preserve */
export const exampleConfig = (yargs: Argv) =>
  baseConfig(yargs).option("exampleArg", {
    type: "string",
    alias: "e",
    description:
      "Can be passed as a flag (--exampleArg, --example-arg, -e) or environment variable (PREFIX_EXAMPLE_ARG)",
  });

export type ExampleConfig = ArgumentsCamelCase<
  InferArgv<ReturnType<typeof exampleConfig>>
>;
