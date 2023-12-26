const path = require('path');

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['styles'] = path.resolve(__dirname, 'styles');
    // Adicione mais aliases conforme necessário

    return config;
  },
};
