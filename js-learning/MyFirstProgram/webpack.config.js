const path = require('path');
module.exports = {
    entry: "./scripts/MainFrame.js",
    output: {
        path: path.resolve(__dirname, './scripts'),
        filename: "MainFrame.build.js"
    },
    watch: true
}