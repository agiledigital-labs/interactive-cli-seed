# Interactive Cli Seed

This seed project is designed to preloaded with the tools required to develop
interactive shell environments. It is already configured to compile to
executable shell files.

## Tooling

It has been configured with Agile Digital's tooling for typescript projects.

### ESLint

A syntax and logic linter for Javascript/Typescript. It has been configured to
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

Code packager and compiler. This builds the Typescript cli tool into a
executable Javascript cli tool.

## Building a CLI Tool

To use the seed project you will:

1. Install node modules `npm install`
2. Edit the `config/cliConfig.json` to change the name of the executable file.
3. Edit the `src/index.ts` file. In this file contains a async self executing
   function and some other imports. The comment `Handle your code here`, you can
   start writing your command line utility.
4. To create arguments for your tool you can express these on the command
   const. By adding in a option call in the middle, you put an argument you may
   need.
   See yargs documentation to enhance the customisation cli startup behaviour.
   > https://github.com/yargs/yargs/blob/master/docs/api.md

```typescript
// Seed Template
const command = yargs.argv;

// Add argument
const command = yargs.option('argument', {}).argv;
```

## Included packages

- **clear**: Clear screen on terminal (https://www.npmjs.com/package/clear)
- **clui**: Create gauges, sparklines, progress lines and spinners
  (https://www.npmjs.com/package/clui)
- **color**: Colored text on cli output (https://www.npmjs.com/package/color)
- **inquirer**: Create interactive prompts
  (https://www.npmjs.com/package/inquirer)
- **yargs**: Command line parser (https://www.npmjs.com/package/yargs)

## Commands

- **start**: Builds and runs the command in a development mode
- **build**: Builds a production version of the command
