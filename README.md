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
3. Create handlers in the `scripts` directory. They will need to default export
   script configuration. This will have your handler in it along with the
   command metadata.
4. To create arguments for your tool you can express these on the builder
   property. By adding in a option function in the middle, you put an argument you may
   need.
   See yargs documentation to enhance the customisation cli startup behaviour.
   > https://github.com/yargs/yargs/blob/master/docs/api.md

```typescript
// Seed Template - scripts/example.ts
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
```

To specify the command name, change the command line

```typescript
command: 'example',
```

To specify a description for the command, change the desc value

```typescript
desc: 'Example description',
```

To add a argument change the configuration line as seen below

```typescript
builder: (yargs) => yargs.option('example', { type: 'string' }),
```

Don't modify this line otherwise types break (See note at [bottom](#known-issues))

```typescript
// @ts-ignore See notes in README
handler: (...args) => handler<CommandArguments>(...args),
```

### Global Options

To add global options e.g. verbose logging which could be part of all commands,
you can do this from `index.ts` file. Add these by the standard argument
approach using yargs. https://github.com/yargs/yargs/blob/master/docs/api.md.

You will need to update the Global Argument type to force all commands to get
this model.

In the `models/Script.ts` update the GlobalArguments interface.

```typescript
export interface GlobalArguments {
  example: string;
}
```

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

- Handler arguments type should be derived from yargs argv. The type signature is
  not available until the .argv is called. In the commandDir setup this happens
  behind the scenes not exposing the argument signature.

- External modules (node_modules) are not bundled into cli scripts to make then
  self contained. Rollup throws an error with an underlying library of yargs.
  Further investigation will be required to resolve why bundle throws errors on
  that library.
