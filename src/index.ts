/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable functional/no-expression-statement */

import yargs from 'yargs';
import example from './scripts/example';

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
export type RootCommand = typeof rootCommand;

/**
 * Add global arguments here using the .option function.
 * E.g. const rootCommand = yargs.option('example', {type: 'string'});
 */
const rootCommand = yargs;

// End users of this tool will have to import their subcommands, and call it following example subcommand.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
example(rootCommand);

rootCommand.demandCommand().strict().help().argv;
