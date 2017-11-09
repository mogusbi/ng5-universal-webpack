const {ContextReplacementPlugin, DefinePlugin, NoEmitOnErrorsPlugin} = require('webpack');
const nodeExternals = require('webpack-node-externals');
const {resolve} = require('path');

module.exports = {
  context: __dirname,
  devtool: false,
  entry: resolve('src/server.ts'),
  externals: [
    nodeExternals()
  ],
  plugins: [
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      resolve('src'),
      {}
    ),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        exclude: [
          /\.(e2e-spec|spec|mock)\.ts$/
        ],
        loader: 'awesome-typescript-loader',
        test: /\.ts$/
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false,
    Buffer: true,
    crypto: true,
    global: true,
    process: true
  },
  output: {
    crossOriginLoading: false,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: resolve('dist')
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  target: 'node'
};
