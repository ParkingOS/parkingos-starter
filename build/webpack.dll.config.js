const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');
const config = require('../config')
module.exports = {
  output: {
    // 将会生成./ddl/lib.js文件
    // path: path.resolve(__dirname, 'ddl'),
    path: path.join(__dirname, '../static/js'),
    // path: config.build.assetsRoot,
    filename: '[name].dll.js',
    library: '[name]_library',

  },
  entry: {
    "vendor": [
      'vue/dist/vue.esm.js',
      'element-ui'
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
