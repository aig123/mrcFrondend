const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
webpack( {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'nb': path.resolve(__dirname, 'http://vmccsyswfdeweb.faw-vw.in:9000/JsNameSpace.jsx')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  devtool: '#eval-source-map',
}, (err, stats) => {
  if (err) throw err
  if (stats.hasErrors()) {
   // console.log(stats)
  }
})
