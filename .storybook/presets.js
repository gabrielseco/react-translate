/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = [
  {
    name: "@storybook/preset-typescript",
    options: {
      tsLoaderOptions: {
        configFile: path.resolve(__dirname, "../tsconfig.json")
      },
      tsDocgenLoaderOptions: {
        tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
      },
      include: [path.resolve(__dirname, "../src")]
    }
  },
  {
    name: "@storybook/preset-scss",
    options: {
      cssLoaderOptions: {
        modules: {
          localIdentName: "[name]__[local]--[hash:base64:5]"
        }
      }
    }
  }
];
