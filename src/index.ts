import yargs from 'yargs';
import example from './scripts/example';

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
// eslint-disable-next-line functional/type-declaration-immutability
export type RootCommand = typeof rootCommand;

/**
 * Add global arguments here using the .option function.
 * E.g. const rootCommand = yargs.option('example', {type: 'string'});
 */
// eslint-disable-next-line functional/prefer-immutable-types
const rootCommand = yargs;

// End users of this tool will have to import their subcommands, and call it following example subcommand.
// eslint-disable-next-line functional/no-expression-statements
example(rootCommand);

// eslint-disable-next-line functional/no-expression-statements
void rootCommand.demandCommand().strict().help().argv;
