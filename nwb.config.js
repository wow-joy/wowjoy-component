const path = require("path");

module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    aliases: {
      "@src": path.resolve("src"),
      "@lib": path.resolve("lib"),
      "@es": path.resolve("es"),
      "@media": path.resolve("src/media")
    },
    // cssPreprocessors: {
    //   sass: {
    //     test: /\.s[ac]ss$/,
    //     loader: require.resolve('sass-loader'),
    //     defaultConfig: 'sassLoader'
    //   }
    // },
    extra: {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  // 使用CSS Modules
                  modules: true,
                  localIdentName: "[local]-[hash:base64:6]-[hash:base32:4]",
                  sourceMap: true
                }
              },
              "sass-loader"
            ]
          }
        ]
      }
    },
    rules: {
      // 'sass-css': {
      //   modules: true,
      //   localIdentName: '[name]__[local]__[hash:base64:5]'
      // },
      svg: {
        use: ["svgr/webpack", "url-loader"]
      }
    }
  }
};
