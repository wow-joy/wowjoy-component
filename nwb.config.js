const path = require("path");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components")
  .default;
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = {
  type: "react-component",
  npm: {
    esModules: false,
    umd: false
  },
  babel: {
    config(config) {
      console.log(config);
      return config;
    }
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
        extensions: [".ts", ".tsx", ".js", ".jsx"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            options: {
              getCustomTransformers: () => ({
                before: [styledComponentsTransformer]
              })
            }
          }
          // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
      }
    }
    // config(config) {
    //   return {
    //     ...config,
    //     externals: {
    //       ...config.externals,
    //       react: "React",
    //       "react-router": "ReactRouter",
    //       "react-router-dom": "ReactRouter-dom"
    //     }
    //   };
    // }
  }
};
