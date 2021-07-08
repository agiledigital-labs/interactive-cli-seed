import { RootCommand } from '..';

export default ({ command }: RootCommand) =>
  command(
    'name',
    'description',
    (yargs) => yargs,
    (args) => {
      // Add your code here
      console.info(args);
    }
  );
