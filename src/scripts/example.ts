import { RootCommand } from '..';
import { Argv } from 'yargs';

export default ({ command }: RootCommand) =>
  command(
    'name',
    'description',
    (yargs: Argv) => yargs,
    (args) => {
      // Add your code here
    }
  );
