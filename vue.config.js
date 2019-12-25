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
      .test(/\.(woff2)(\?.*)?$/)
      .use('url-loader')
      .loader('file-loader') // not url-loader but file-loader !
      .tap(options => { // not .option() but .tap(options...)
        // modify the options...
        options.name = 'fonts/[name].[ext]'
        return options
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
