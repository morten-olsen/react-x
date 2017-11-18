const path = require('path');

module.exports = (type) => ({
  entry: path.join(__dirname, `../src/${type}.js`),
  output: {
    path: path.join(__dirname, '../build'),
    filename: `${type}.js`,
    library: 'reactx',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      blocks: path.join(__dirname, `../src/blocks/${type}`),
      router: path.join(__dirname, `../src/router/${type}`),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'stage-1', 'react'],
      },
    }],
  },
  externals: [
    ...(type === 'native' ? [
      'styled-components',
      'react-native',
      'react',
    ]: []),
  ],
});
