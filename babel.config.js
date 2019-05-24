module.exports = api => {
  console.log(api.env());
  return {
    env: {
      es: {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              modules: false,
              debug: false,
              targets: {
                node: "current"
              }
            }
          ]
        ],
        plugins: [
          "babel-plugin-styled-components",
          "@babel/plugin-proposal-class-properties"
        ]
      },
      lib: {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-react",
          [
            "@babel/preset-env",
            {
              modules: "commonjs",
              debug: false,
              targets: {
                node: "current"
              }
            }
          ]
        ],
        plugins: [
          "babel-plugin-styled-components",
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  };
};
