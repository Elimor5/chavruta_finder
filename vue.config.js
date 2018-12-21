const path = require('path'); 

module.exports = {
    outputDir: path.resolve(__dirname, "app", "assets", "javascripts", "js"),
    configureWebpack: {
        entry: path.resolve(__dirname, 'frontend', 'src', 'main.js')
    }
}