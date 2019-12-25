const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "app", "assets", "javascripts", "dist"),
  filenameHashing: false,
  configureWebpack: {
    entry: path.resolve(__dirname, "frontend", "src", "scripts", "main.js")
  },
  chainWebpack: config => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        Object.assign(options, { fallback: { name: 'fonts/1.[ext]' } })
      })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "${path.resolve(
          __dirname,
          "frontend",
          "src",
          "styles",
          "global.scss"
        )}";`
      }
    }
  }
};
