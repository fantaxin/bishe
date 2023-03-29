const { defineConfig } = require('@vue/cli-service')
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
})
