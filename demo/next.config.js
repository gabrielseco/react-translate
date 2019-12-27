// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const RESOLVERS_REACT_DEVELOPMENT =
  process.env.NODE_ENV === 'development'
    ? {
        'react': path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom')
      }
    : {};
module.exports = {
  webpack(config) {
    return config;
  }
};
