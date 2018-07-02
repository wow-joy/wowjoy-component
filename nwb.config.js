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
    }
  }
};
