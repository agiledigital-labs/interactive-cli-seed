# Interactive Cli Seed

This seed project is designed to preloaded with the tools required to develop
interactive shell environments. It is already configured to compile to
executable shell files.

## Tooling

It has been configured with Agile Digital's tooling for TypeScript projects.

### ESLint

A syntax and logic linter for JavaScript/TypeScript. It has been configured to
work with eslint-recommended with some overrides.

- no-console: `console.log` has been banned for log observability.
- unused-imports: This has been enabled to clear out imports that aren't needed
  as we can't trust the developer will do so

### Nvmrc

This can set your runtime environment to the correct Node version for this
project. Run command `nvm use`.

### Prettier

Code formatter for any support filed. We use defaults for prettier except for
requiring single quote.

### Rollup

Code packager and compiler. This builds the TypeScript cli tool into a
executable JavaScript cli tool.

## Building a CLI Tool

To use the seed project you will:

1. Install node modules `npm install`
2. Edit the `config/cliConfig.json` to change the name of the executable file.
3. Create handlers in the `scripts` directory. Top level only. Sub commands of
   those need to go into the file themselves or the handler They will need to
   default export script configuration. This will have your handler in it along
   with the command metadata.
4. To create arguments for your tool you can express on the third parameter. By
   adding in a option function in the middle, you put an argument you may need.
   See yargs documentation to enhance the customisation cli startup behaviour.
   > https://github.com/yargs/yargs/blob/master/docs/api.md

```typescript
// Seed Template - scripts/example.ts
import { RootCommand } from '..';

export default ({ command }: RootCommand) =>
  command(
    'name',
    'description',
    (yargs) => yargs,
    (args) => {
      // Add your code here
    }
  );
```

The command function parameters are setup as follows

1. `'name'`: Command name. What are you going to call it via. E.g. `seed-project mySubCommand`
2. `'description'`: Information about what the command does
3. `(yargs) => yargs`: Use the return `yargs` to specific arguments for this
   command.
   ```typescript
   (yargs) => yargs.option('example', { type: 'string' }),
   ```
4. `(args) => {}`: Write your own code in the braces. The `args` parameter has
   all the CLI arguments for both local command and global.

### Global Options

To add global options e.g. verbose logging which could be part of all commands,
you can do this from `index.ts` file. Add these by the standard argument
approach using yargs. https://github.com/yargs/yargs/blob/master/docs/api.md.

You need to add arguments to this line:

```typescript
// Default line
const rootCommand = yargs;

// Adding Arguments
const rootCommand = yargs.option('example', { type: 'string' });
```

If you add them to the other yargs line, typing information for the global
arguments will not show up.

## Included packages

- **clear**: Clear screen on terminal (https://www.npmjs.com/package/clear)
- **clui**: Create gauges, sparklines, progress lines and spinners
  (https://www.npmjs.com/package/clui)
- **color**: Colored text on cli output (https://www.npmjs.com/package/color)
  <br/>To use colours you will need to import them using a ES6 and ES5 import.
  There is some weirdless that can't be explain with types.
  ```typescript
  // @ts-ignore - Type Defs from Import
  // eslint-disable-next-line unused-imports/no-unused-imports-ts
  import colors from 'colors';
  require('colors');
  ```
- **inquirer**: Create interactive prompts
  (https://www.npmjs.com/package/inquirer)
- **yargs**: Command line parser (https://www.npmjs.com/package/yargs)

## Commands

- **start**: Builds the command in a development mode
- **build**: Builds a production version of the command
- **watch**: Build the command in development mode and will watch source
  directory for changes. If changes detected, will rebuild in development mode

## Known Issues

- External modules (node_modules) are not bundled into cli scripts to make then
  self contained. Rollup throws an error with an underlying library of yargs.
  Further investigation will be required to resolve why bundle throws errors on
  that library.
