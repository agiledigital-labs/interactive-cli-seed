import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
const cliConfig = require('./config/cliConfig.json');

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/${
      process.env.NODE_ENV === 'development' ? 'dev-test' : cliConfig.name
    }`,
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    del({ targets: 'dist/*' }),
  ],
};
