import { Argv } from 'yargs';
import { RootCommand } from '..';

export default ({ command }: RootCommand): Argv<unknown> =>
  command(
    'name',
    'description',
    (yargs) => yargs,
    (args) => {
      // Add your code here
      // eslint-disable-next-line functional/no-expression-statement
      console.info(args);
    }
  );
