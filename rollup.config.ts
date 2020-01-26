import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    postcss({
      modules: {
        generateScopedName: '[name]__[local]--[hash:base64:5]'
      },
      minimize: true,
      plugins: [autoprefixer({})]
    })
  ]
};
