import type { Argv } from "yargs";
import type { RootCommand } from "..";
import { type ExampleConfig, exampleConfig } from "./config";

/* v8 ignore next -- @preserve */
const exampleCommand = (args: ExampleConfig) => {
  // Add your code here
  console.info("exampleArg:", args.exampleArg);
};

/* v8 ignore next -- @preserve */
export default (yargs: RootCommand): Argv<unknown> =>
  yargs.command(
    "example",
    "your example CLI command",
    exampleConfig,
    exampleCommand,
  );
