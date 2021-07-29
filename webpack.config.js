const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [{
  mode: 'production',
  entry:{
    top: './src/assets/js/top.js',
    about: './src/assets/js/about.js',
  },
  devtool: 'inline-source-map',
  output:{
    path: path.join(__dirname, './dist/assets/js'),
    filename:'[name].bundle.js',
    publicPath:'/dist/assets/js/'
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env']
            },
          }
        ],
      },
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '/src/assets/img/'),
          to: path.join(__dirname, '/dist/assets/img/'),
        },
        {
          from: path.join(__dirname, '/src/assets/js/lib/'),
          to: path.join(__dirname, '/dist/assets/js/lib/'),
        },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist')
  }
},
{
  mode: 'production',
  entry:{
    top: './src/assets/scss/top.scss',
  },
  output:{
    path: path.join(__dirname, './dist/assets/css'),
    filename:'[name].css',
    publicPath:'/dist/assets/css/'
  },
  module:{
    rules:[
      {
        test:/\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url-loader',
        options: {
          limit: 2048,
          name: '[path][name].[ext]',
          outputPath: function (path,resourcePath,context) {
            return '../../' + path.replace('src/', '');
          },
          publicPath: function (path,resourcePath,context) {
            return '../../' + path.replace('src/', '');
          }
        }
      },
    ],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
  optimization: {
    minimize: true,
    // minimizer: [
    //   new CssMinimizerPlugin(),
    // ],
  },
},
];
