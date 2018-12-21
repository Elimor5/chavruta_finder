const path = require('path'); 

module.exports = {
    outputDir: path.resolve(__dirname, "app", "assets", "javascripts", "dist"),
    configureWebpack: {
        entry: path.resolve(__dirname, 'frontend', 'src', 'main.js')
    }
}