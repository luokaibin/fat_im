module.exports = {
  publicPath: "/",
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  configureWebpack: {
    externals: {
      socket_io: "io", // '包名':'全局变量'
      iview: "iview", // '包名':'全局变量'
      dexie: "Dexie"
    }
  },
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  //     .set('_c', resolve('src/components'))
  //     .set('_p', resolve('src/components/public'))
  //     .set('style', resolve('src/assets/style'))
  // },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: true,
    port: 7989,
    host: "0.0.0.0"
  }
};
