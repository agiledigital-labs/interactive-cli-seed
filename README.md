# Interactive Cli Seed

This project is a seed project that has the tools required to develop
interactive shell environments. It complies with executable shell files for the
commands.

[![CI Status](https://github.com/agiledigital-labs/interactive-cli-seed/actions/workflows/node.js.yml/badge.svg)](https://github.com/agiledigital-labs/interactive-cli-seed/actions/workflows/node.js.yml)

## Tooling

The project has Agile Digital's development tooling for TypeScript projects.

### ESLint

A syntax and logic linter for JavaScript/TypeScript. ESlint-recommended with
some overrides is the currently configured rules.

- no-console: `console.log` has been banned for log observability.
- unused-imports: This is enabled to clear out imports that aren't needed.

### Nvmrc

Nvmrc can set your runtime environment to the correct Node version for this
project. Run command `nvm use`.

### Prettier

Code formatter for any support filed. We use defaults for prettier except for
requiring a single quote.

### Rollup

Code packager and compiler. Rollup builds the TypeScript CLI tool into an
executable JavaScript CLI tool. The executable file is a node environment.

## Building a CLI Tool

To use the seed project, you will:

1. Install node modules `npm install`
2. Edit the `config/cliConfig.json` to change the name of the executable file.
   The executable file will be available at `./dist/executableName`.
3. Create handlers in the `scripts` directory. Top-level only. Subcommands of
   those need to go into the file themselves or the handler. They will need to
   default export script configuration and explicitly imported and initialised 
   in index.ts. This will have your handler in it, along with the command metadata. 
   Commands from the handler file can be directly called with 
   `./dist/executableName command argument`.
4. To create arguments, you can express these by the third parameter. By adding
   in an option function in the middle, you put an argument you may need. See
   yargs documentation to enhance the customisation CLI startup behaviour.
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

The command function parameters are set up as follows

1. `'name'`: Command name. What are you going to call it via. E.g.
   `./dist/seed-project mySubCommand`
2. `'description'`: Information about what the command does.
3. `(yargs) => yargs`: Use the return `yargs` to specific arguments for this
   command.
   ```typescript
   (yargs) => yargs.option('example', { type: 'string' }),
   ```
4. `(args) => {}`: Write your own code in the braces. The `args` parameter has
   all the CLI arguments for both local command and global.

### Global Options

To add global options, e.g. verbose logging, which could be part of all
commands, you can do this from the `index.ts` file. Add these by the standard
argument approach using yargs.
https://github.com/yargs/yargs/blob/master/docs/api.md.

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
- **watch**: Build the command in development mode and watch the source
  directory for changes. If changes detected, will rebuild in development mode

## Known Issues

- External modules (node_modules) are not bundled into CLI scripts to make them
  self-contained. Rollup throws an error with an underlying library of yargs.
  Further investigation will be required to resolve why the bundle throws errors
  on that library.
