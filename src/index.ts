/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable functional/no-expression-statement */
import { readdirSync } from 'fs';
import { join } from 'path';
import yargs, { Argv } from 'yargs';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, functional/prefer-type-literal
    interface Require {
      <T>(id: string): T;
    }
  }
}

// eslint-disable-next-line functional/no-return-void
type DefaultFunction = (rootCommand: RootCommand) => Argv<unknown>;

/**
 * Dynamic type for global arguments. This needs to be it's own as we use a
 * require below to import all the commands
 */
export type RootCommand = typeof rootCommand;

// Only finds scripts in top level
const directorySearch = (localDirectory: string): readonly string[] =>
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

// Allows to configure handlers (any .js file in the scripts directory) with arguments (rootCommand in this case) at runtime.
// This means the end users of this tool won't have to touch this file, they just have to add their scripts in the scripts folder.
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
directorySearch('scripts').map((path) => {
  const command = require<
    { readonly default: DefaultFunction } | DefaultFunction
  >(path);

  return (typeof command === 'object' ? command.default : command)(rootCommand);
});

void rootCommand.demandCommand().strict().help().argv;
