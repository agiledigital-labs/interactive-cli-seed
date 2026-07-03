# Interactive Cli Seed

This project is a seed project that has the tools required to develop
interactive shell environments. It complies with executable shell files for the
commands.

[![CI Status](https://github.com/agiledigital-labs/interactive-cli-seed/actions/workflows/node.js.yml/badge.svg)](https://github.com/agiledigital-labs/interactive-cli-seed/actions/workflows/test.yml)

## Tooling

The project has Agile Digital's development tooling for TypeScript projects.

### `yargs`

CLI framework that defines commands and parses arguments.

### Biome

Linter and formatter, with rules configured a CLI:

- Secret detection
- No direct access to `process.env`, encouraging parsing via `yargs` instead

### `nvm`

[`.nvmrc`](./.nvmrc) can set your runtime environment to the correct Node
version for this project. Run command `nvm use`.

### `tsup`

Zero-config bundler that uses `esbuild` under the hood.

### `pnpm`

`npm` alternative with improved security, caching and more. Configured to reduce
the risk of supply-chain attacks via minimum-age requirements and an allowlist
for post-install scripts.

## Using the CLI seed

To use the seed project:

1. Set the `cli-name` in `package.json`. If someone installs your CLI, this is
   how they'll call it.
2. Define a prefix for environment variables that are referenced by your script
   in [`src/baseConfig.ts`](./src/baseConfig.ts#L5)
3. Create handlers in the [`scripts`](./src/scripts) directory, such as the
   example [`src/scripts/example.ts`](./src/scripts/example.ts)
4. Define CLI options for a command in e.g.,
   [`src/scripts/config.ts`](./src/scripts/config.ts) which extends
   [`src/baseConfig.ts`](./src/baseConfig.ts)

```typescript
// Seed Template - scripts/example.ts
export default (yargs: RootCommand): Argv<unknown> =>
  yargs.command(
    "example",
    "your example CLI command",
    exampleConfig,
    exampleCommand,
  );
```

The command function parameters are set up as follows

1. `'example'`: Command name. What are you going to call it via. E.g.
   `myCli mySubCommand`
2. `'your example CLI command'`: Information about what the command does.
3. `exampleConfig`: options for your command. Should extend the
   [`src/baseConfig.ts`](./src/baseConfig.ts)

   ```typescript
   (yargs) => baseConfig(yargs).option('example', { type: 'string' }),
   ```

4. `exampleCommand`: The implementation for your command. The `args` parameter
   has all the CLI arguments for both local command and global.

   ```typescript
   const exampleCommand = (args: ExampleConfig) => {
      // Add your code here
      console.info("exampleArg:", args.exampleArg);
    };
    ```

## Prerequisites

1. Install [`node`](https://nodejs.org/en/) for the version in
   [`.nvmrc`](./.nvmrc) or use [`nvm`](https://github.com/nvm-sh/nvm):

  ```sh
  nvm install && nvm use
  ```

2. Install the [`pnpm`](https://pnpm.io/installation) package manager. One
   option is [`corepack`](https://nodejs.org/api/corepack.html) for automatic
   installation, which is an experimental `node` feature that must be enabled
   using:

  ```sh
  corepack enable
  ```

## Usage

1. Install dependencies with [`pnpm`](https://pnpm.io/installation):

  ```sh
  pnpm i
  ```

2. Clone the `.env.example`:

   ```sh
   cp .env.example .env
   ```

3. Build:

  ```sh
  pnpm build
  ```

3. Read the available commands and flags:

  ```sh
  pnpm start --help
  ```

4. Run the executable (where `example` is the command to run):

  ```sh
  pnpm start example
  ```

## Development

1. Run in watch mode to iterate quickly:

  ```sh
  pnpm watch
  ```

2. Note that build and watch do **not** automatically type check. Instead, use
   your IDE or run:

  ```sh
  pnpm type-check
  ```

3. Lint:

  ```sh
  pnpm lint
  ```

4. Format:

  ```sh
  pnpm format
  ```
