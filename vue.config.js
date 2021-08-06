
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 修改 src 为 examples
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  chainWebpack(config) {
    // 配置svg
    config.module
      .rule('svg')
      .exclude.add(resolve('packages/x6/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('packages/x6/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
};
