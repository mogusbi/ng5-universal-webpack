const {PurifyPlugin} = require('@angular-devkit/build-optimizer');
const {AngularCompilerPlugin} = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const {DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin,} = require('webpack');
const {CommonsChunkPlugin, ModuleConcatenationPlugin, UglifyJsPlugin} = require('webpack').optimize;

const client = {
  entry: {
    app: resolve('src/main-browser.ts'),
    polyfills: resolve('src/polyfills.ts')
  },
  module: {
    rules: [
      {
        exclude: [
          /\.(e2e-spec|spec|mock)\.ts$/
        ],
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack'
        ]
      },
      {
        loader: {
          loader: 'html-loader',
          options: {
            caseSensitive: true,
            collapseWhitespace: true,
            minimize: true,
            removeComments: true,
            removeOptionalTags: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            removeAttributeQuotes: false
          }
        },
        test: /\.html$/
      }
    ]
  },
  output: {
    chunkFilename: '[id]-[chunkhash].chunk.js',
    filename: '[name]-[chunkhash].js',
    path: resolve('dist/browser')
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new CommonsChunkPlugin({
      minChunks: null,
      name: [
        'inline'
      ]
    }),
    new CommonsChunkPlugin({
      chunks: [
        'app'
      ],
      minChunks: (module) => module.resource && module.resource.startsWith(resolve('node_modules')),
      name: [
        'vendor'
      ]
    }),
    new CommonsChunkPlugin({
      async: 'common',
      minChunks: 2,
      name: [
        'app'
      ]
    }),
    new ModuleConcatenationPlugin(),
    new NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({
      compress: {
        passes: 3,
        pure_getters: true
      },
      ecma: 5,
      ie8: false,
      mangle: true,
      output: {
        ascii_only: true,
        comments: false
      }
    }),
    new LoaderOptionsPlugin({
      htmlLoader: {
        caseSensitive: true,
        minimize: true,
        removeAttributeQuotes: false
      }
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: (left, right) => {
        const entryPoints = [
          'inline',
          'polyfills',
          'vendor',
          'app'
        ];
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightIndex = entryPoints.indexOf(right.names[0]);

        if (leftIndex > rightIndex) {
          return 1;
        } else if (leftIndex < rightIndex) {
          return -1;
        } else {
          return 0;
        }
      },
      template: resolve('src/index.html')
    }),
    new PurifyPlugin(),
    new AngularCompilerPlugin({
      entryModule: resolve('src/app/app.module#AppModule'),
      mainPath: resolve('src/main-browser.ts'),
      tsConfigPath: resolve('tsconfig-aot.json')
    })
  ],
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  }
};

module.exports = client;
