const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['styles'] = path.resolve(__dirname, 'styles');
    // Adicione mais aliases conforme necessário

    return config;
  },
};
