const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf')
var failPlugin = require('webpack-fail-plugin');
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
  plugins: [
    failPlugin
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js',
    //   '@': resolve('src'),
    //   'nb': path.resolve(__dirname, 'http://vmccsyswfdeweb.faw-vw.in:9000/JsNameSpace.jsx')
    // }
  },

}, (err, stats) => {
  if (err) throw err
  if (stats.hasErrors()) {
   // console.log(stats)
  }
})
