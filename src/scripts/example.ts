import { Argv } from 'yargs';
import { GlobalArguments, Script } from './../models/Script';

interface CommandArguments extends GlobalArguments {
  // Add Arguments here for typing information. See notes in README
}

const handler = async (argv: Argv<CommandArguments>['argv']): Promise<void> => {
  // Add your code here
};

export default {
  command: '',
  desc: '',
  builder: (yargs) => yargs,
  // @ts-ignore See notes in README
  handler: async (...args) => handler<CommandArguments>(...args),
} as Script;
