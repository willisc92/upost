// entry -> output

const path = require("path"); // imports path
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// if (process.env.NODE_ENV === "test") {
//     require("dotenv").config({ path: ".env.test" });
// } else if (process.env.NODE_ENV === "development") {
//     require("dotenv").config({ path: ".env.development" });
// }

module.exports = (env) => {
    const isProduction = env === "production";
    const CSSExtract = new ExtractTextPlugin("styles.css");

    return {
        entry: ["babel-polyfill", "./src/app.js"], // file to input
        output: {
            path: path.join(__dirname, "..", "backend", "frontendapp", "static", "frontend"), // concatenates current path with 'public' - requires absolute path
            filename: "bundle.js" // output file name
        }, // file to output
        module: {
            rules: [
                {
                    loader: "babel-loader", // allows babel to be run under certain conditions - to convert ES6 to ES5 classes, and JSX to Javascript
                    test: /\.js$/, // Regular expression for files ending in .js
                    exclude: /node_modules/ // excludes imported production code
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        }, // module used to setup loaders
        plugins: [CSSExtract],
        devtool: isProduction ? "source-map" : "inline-source-map", // enable source map in browser
        devServer: {
            contentBase: [
                path.join(__dirname, "..", "backend", "frontendapp", "templates", "frontend"),
                path.join(__dirname, "public")
            ], // enable dev server
            historyApiFallback: true, // Allows for client-side routing - should return index.html for all 404's.
            publicPath: "/dist/"
        }
    };
};
