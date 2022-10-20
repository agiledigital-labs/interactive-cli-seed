import typescript from 'rollup-plugin-typescript2';
import * as fg from 'fast-glob';
import del from 'rollup-plugin-delete';
import cleanup from 'rollup-plugin-cleanup';
import { spawnSync } from 'child_process';


const cliConfig = require('./config/cliConfig.json');

/**
 * Rollup global plugins
 */
const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
  cleanup(),
];

/**
 * Config to use for the individual script handlers
 *
 * @param {string} filePath
 * @returns {object} rollup configuration
 */
const scriptConfiguration = (filePath) => ({
  input: filePath,
  output: {
    file: `dist${filePath.replace('src', '').replace('.ts', '.js')}`,
    format: 'cjs',
    exports: 'auto',
  },
  plugins,
});

const scriptFiles = fg.sync(['src/scripts/**/*.ts'], {
  ignore: [
    '**/*.test.ts',
    '**/__fixtures__'
  ]
});

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
        }
      },
      !process.env.ROLLUP_WATCH ? del({ targets: 'dist/**/*' }) : undefined,
    ],
  },
  ...scriptFiles.map(scriptConfiguration),
];
