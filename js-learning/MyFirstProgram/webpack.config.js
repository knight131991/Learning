/* eslint-disable */

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

    // for React
    {
        entry: "./src_react/index.js",
        mode: "development",
        module: {
            rules: [
                {
                    // To be safe, you can use enforce: 'pre' section to check source files, not modified by other loaders (like babel-loader)
                    enforce: "pre",
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|scripts)/,
                    loader: "eslint-loader",
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|scripts)/,
                    // loader is a shorthand for the use property
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        // These options change how modules are resolved.
        resolve: {
            // allows us to specify which extensions Webpack will resolve — this allows us to import modules without needing to add their extensions.
            extensions: [".js", ".jsx"]
        },
        output: {
            path: path.resolve(__dirname, "dist_react/"),
            //  The publicPath property specifies what directory the bundle should go in, and also tells webpack-dev-server where to serve files from.
            publicPath: "/dist_react/",
            filename: "bundle.js"
        },
        devServer: {
            contentBase: path.join(__dirname, "public/"),
            port: 3000,
            publicPath: "http://localhost:3000/dist_react/",
        }
    }
]