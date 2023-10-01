const path = require("path");

module.exports = {
  entry: {
    "client": "./dist/client.js",
    "frontoffice": "./dist/frontoffice.js",
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/lib")
  }
};