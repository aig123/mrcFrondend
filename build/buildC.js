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
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js',
    //   '@': resolve('src'),
    //   'nb': path.resolve(__dirname, 'http://vmccsyswfdeweb.faw-vw.in:9000/JsNameSpace.jsx')
    // }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }

}, (err, stats) => {
  if (err) throw err
  if (stats.hasErrors()) {
   // console.log(stats)
  }
})
