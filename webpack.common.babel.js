import webpack from "webpack";
import path from "path";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/public/build/",
    publicPath: "/public/build/",
    filename: "bundle.js"
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@assets": path.resolve(__dirname, "src/assets/")
    },
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};
