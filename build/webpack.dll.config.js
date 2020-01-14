const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const config = require('../config')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  output: {
    // 将会生成./ddl/lib.js文件
    // path: path.resolve(__dirname, 'ddl'),
    path: path.join(__dirname, '../static/js'),
    // path: config.build.assetsRoot,
    filename: '[name].dll.js',
    library: '[name]_library',

  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  entry: {
    "vendor": [
      'element-ui',
      'parkingos-ui',
    ],
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    }),
  ],
};
