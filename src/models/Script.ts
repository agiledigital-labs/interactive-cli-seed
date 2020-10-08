import Yargs, { Argv } from 'yargs';

/**
 * Global Arguments for all commands
 */
export interface GlobalArguments {}

/**
 * Each handler script needs to define these options as a default export
 */
export interface Script {
  command: string;
  desc?: string;
  builder: (yargs: typeof Yargs) => typeof Yargs;
  handler: <T extends GlobalArguments>(argv: Argv<T>['argv']) => Promise<void>;
}
