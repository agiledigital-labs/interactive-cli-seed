import { readdirSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
export type RootCommand = typeof rootCommand;

// Only finds scripts in top level
const directorySearch = (localDirectory: string) =>
  readdirSync(join(__dirname, localDirectory), { withFileTypes: true })
    .map(({ name }) => name)
    .filter((value) => value.endsWith('.js'))
    // Weirdness with string concat as path resolves the the ./ and drops it
    // from the final string
    .map((name) => `./${join(localDirectory, name)}`);

/**
 * Add global arguments here using the .option function.
 * E.g. const rootCommand = yargs.option('example', {type: 'string'});
 */
const rootCommand = yargs;

// Allows to find in any scripts in the scripts folder without explicitly stating in the index file.
directorySearch('scripts').map((path) => require(path)(rootCommand));

rootCommand.demandCommand().strict().help().argv;
