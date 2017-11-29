const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';


const commonConfig = {
  entry: ['babel-polyfill'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: 'babel-loader',
        include: path.resolve(process.cwd(), 'src'),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
        include: path.resolve(process.cwd(), 'src/assets/fonts'),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new HTMLWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
      inject: 'body',
      filename: 'index.html',
    }),
  ]
}

if (isDev) {
  module.exports = merge(commonConfig, {
    entry: [
      'react-hot-loader/patch',
      path.resolve(process.cwd(), 'src/index.js'),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader?sourceMap=true',
            'css-loader?sourceMap=true&modules=true&localIdentName=[local]__[hash:base64:5]',
            'postcss-loader?sourceMap=true',
          ],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      hot: true,
      contentBase: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
      host: '0.0.0.0',
      port: 8080,
    },
  });
}

if (isProd) {
  module.exports = merge(commonConfig, {
    entry: [
      path.resolve(process.cwd(), 'src/index.js')
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?modules=true&localIdentName=[local]__[hash:base64:5]',
              'postcss-loader',
            ],
          }),
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'main.[hash].css',
        ignoreOrder: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          dead_code: true,
          drop_debugger: true,
          unused: true,
          warnings: false,
        },
      }),
    ],
  });
}
