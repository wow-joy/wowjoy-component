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
    rules: {
      svg: {
        use: ["@svgr/webpack", "url-loader"]
      }
    },
    extra: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
    // config(config) {
    //   return {
    //     ...config,
    //     externals: {
    //       "styled-components": {
    //         commonjs: "styled-components",
    //         commonjs2: "styled-components",
    //         amd: "styled-components"
    //       }
    //     }
    //   };
    // }
  }
};
