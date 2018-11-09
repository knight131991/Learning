const path = require('path');

module.exports = 
[
    {
        entry: "./scripts/MainFrame.js",
        output: {
            path: path.resolve(__dirname, './scripts'),
            filename: "MainFrame.build.js"
        },
        optimization: {
            minimize: false
        },
        watch: true,
    }, 

    {
        entry: "./scripts/SVGCanvas_temp.js",
        output: {
            path: path.resolve(__dirname, './scripts'),
            filename: "SVGCanvas_temp.build.js"
        },
        optimization: {
            minimize: false
        },
        watch: true,
    }, 


    {
        entry: 
            [
            "./scripts/Snake/SnakeSVGCanvas.js",
             "./scripts/Snake/Model.js",
             "./scripts/Snake/Control.js"
            ],
        output: {
            path: path.resolve(__dirname, './scripts/Snake'),
            filename: 'SnakeSVGCanvas.build.js'
        },
        optimization: {
            minimize: false
        },
        watch: true,
    },

    {
        entry: ["./styles/ImportingSass.scss", "./scripts/ImportingSass.js"],
        output: {
            path: path.resolve(__dirname, './scripts'),
            filename: "ImportingSass.build.js"
        },
        optimization: {
            minimize: false
        },
        watch: true,
        

        module: {
            rules:
            [
                {
                    test: /\.(scss|sass)$/,
                    use:[ 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
                }
            ]
        }
    },
]