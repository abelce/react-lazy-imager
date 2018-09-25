const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {
  mode: isDev() ? "development" : "production",
  devtool: isDev() ? "cheap-module-eval-source-map" : false,
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
    hot: true,
    port: 3000,
    contentBase: __dirname + "/dist",
    historyApiFallback: true,
  },
  entry: {
    app: __dirname + "/src/app.jsx",
    imager: __dirname + "/src/components/imageLoader/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: `${process.env.PUBLIC || "/"}`,
    filename: isDev() ? "[name].[hash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$|\.tsx$|\.ts$/,
        include: /src/,
        exclude: [/node_modules/, /src\/assets/],
        loader: "babel-loader",
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["app"],
      template: __dirname + "/src/assets/index.ejs",
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js", ".jsx", ".css"],
  },
  optimization: {
    minimize: isDev() ? false : true,
  },
};

if (isDev()) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin({}));
}

function isDev() {
  return process.env.NODE_ENV === "development";
}
module.exports = config;

