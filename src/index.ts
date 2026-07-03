#!/usr/bin/env node
/* v8 ignore start -- @preserve */
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import example from "./scripts/example";

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
export type RootCommand = typeof rootCommand;

/**
 * Add global arguments here using the .option function.
 * E.g. const rootCommand = yargs.option('example', {type: 'string'});
 */
const rootCommand = yargs(hideBin(process.argv));

// End users of this tool will have to import their subcommands, and call it following example subcommand.
example(rootCommand);

void rootCommand
  .usage("Usage: $0 <command> [options]")
  .demandCommand(1, "You need to specify a command to run the utility")
  .strict()
  .help()
  .parse();
/* v8 ignore end -- @preserve */
