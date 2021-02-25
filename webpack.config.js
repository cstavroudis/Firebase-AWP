module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./public/app.js"], // the starting point for our program
  output: {
    path: __dirname + "/public", // the absolute path for the directory where we want the output to be placed
    filename: "bundle.js", // the name of the file that will contain our output - we could name this whatever we want, but bundle.js is typical
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
