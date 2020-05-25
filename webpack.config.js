/* eslint-disable no-undef */
const glob = require("glob");
const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const root = path.resolve(__dirname, "src");
const output = path.resolve(__dirname, "dist");
const outputRemovePath = new RegExp(`${root}/`);
// bundle index.js of each directories
const pattern = `${root}/**/+(index.js|index.ts)`;
const targets = glob.sync(pattern);
const entries = targets
  .map((path) => {
    const key = path.replace(outputRemovePath, "").replace(/(\.ts|\.js)/, "");
    return { [key]: path };
  })
  .reduce((accumulator, value) => {
    return Object.assign(accumulator, value);
  });

module.exports = {
  entry: entries,
  output: {
    path: output,
    filename: "[name].js",
    chunkFilename: `[name].bundle.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src/')
    },
    extensions: [".ts", ".js"],
  },
  plugins: [new MinifyPlugin()],
};
