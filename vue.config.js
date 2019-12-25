const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "app", "assets", "javascripts", "dist"),
  filenameHashing: false,
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    entry: path.resolve(__dirname, "frontend", "src", "scripts", "main.js")
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
