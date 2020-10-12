import { readdirSync } from 'fs';
import { join } from 'path';
import yargs from 'yargs';

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
export type RootCommand = typeof rootCommand;

const javaScriptFileMatch = new RegExp(/^[A-z0-9/]+\.js$/);

// Only finds scripts in top level
const directorySearch = (localDirectory: string) =>
  readdirSync(join(__dirname, localDirectory), { withFileTypes: true })
    .map(({ name }) => name)
    .filter((value) => {
      return javaScriptFileMatch.test(value);
    });

/**
 * Add global arguments here using the .option function.
 * E.g. const rootCommand = yargs.option('example', {type: 'string'});
 */
const rootCommand = yargs;

directorySearch('scripts').map((path) => require(path)(rootCommand));

rootCommand.demandCommand().help().argv;
