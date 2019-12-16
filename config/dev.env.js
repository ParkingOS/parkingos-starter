'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://test.bolink.club/cloud"',
  SERVER_API: '"http://test.bolink.club"',
  BOLINK_API:'"https://beta.bolink.club/web"'
})
