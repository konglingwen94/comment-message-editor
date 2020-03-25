module.exports = {
  lintOnSave: 'warning',
  publicPath:"./",
  runtimeCompiler: true,
  css: { extract: false },
  chainWebpack(config) {
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: Infinity }))
  },
}
