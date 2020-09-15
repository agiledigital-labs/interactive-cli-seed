import yargs from 'yargs';
// @ts-ignore - Type Defs from Import
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import colors from 'colors';
require('colors');

const command = yargs.option('argument', {}).argv;

(async (argv: typeof command) => {
  // Handle your code here
})(command);
