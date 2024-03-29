import typescript from 'rollup-plugin-typescript2';
import { join } from 'path';
import { readdirSync } from 'fs';
import del from 'rollup-plugin-delete';
import cleanup from 'rollup-plugin-cleanup';
import { spawnSync } from 'child_process';

const cliConfig = require('./config/cliConfig.json');

/**
 * Deep searches for files within a directory
 *
 * @param {string} fileExtension filter for extension
 * @param {string} localDirectory root directory
 * @returns {string[]} file list
 */
const deepDirectorySearch = (fileExtension, localDirectory) => {
  const path = join(__dirname, localDirectory);
  const locations = readdirSync(path, { withFileTypes: true });

  // This should be a flatMap with a filter but JS auto targets ES2015. flatMap
  // is part of ES2018. I've implemented a flatMap using the underlying
  // functions. This should be fixed by force the target to >= ES2018 or wait
  // for default target to be updated.
  return locations
    .map((value) => {
      const localisedPath = join(localDirectory, value.name);

      if (value.isDirectory()) {
        return deepDirectorySearch(fileExtension, localisedPath);
      }

      return localisedPath;
    })
    .reduce(
      (acc, value) => [
        ...acc,
        ...(typeof value === 'string' ? [value] : value),
      ],
      []
    )
    .filter((value) => value.endsWith('.ts'));
};

/**
 * Rollup global plugins
 */
const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
  cleanup(),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: `dist/${cliConfig.name}`,
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
    plugins: [
      ...plugins,
      // add execute permission to the executable
      {
        name: 'writeBundle',
        writeBundle: () => {
          spawnSync(`chmod`, ['u+x', `dist/${cliConfig.name}`]);
        },
      },
      !process.env.ROLLUP_WATCH ? del({ targets: 'dist/**/*' }) : undefined,
    ],
  },
];
