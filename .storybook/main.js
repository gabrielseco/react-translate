// eslint-disable-next-line
const path = require('path');

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        }
      }
    },
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-viewport'
  ]
};
