import { Argv } from 'yargs';
import { RootCommand } from '..';

// eslint-disable-next-line functional/prefer-immutable-types
export default ({ command }: RootCommand): Argv<unknown> =>
  command(
    'name',
    'description',
    // eslint-disable-next-line functional/prefer-immutable-types
    (yargs) => yargs,
    // eslint-disable-next-line functional/no-return-void, functional/prefer-immutable-types
    (args) => {
      // Add your code here
      console.info(args);
    }
  );
