module.exports = {
  stories: ['../stories/**/*.stories.jsx'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    config.esbuild = {
      ...config.esbuild,
      loader: 'jsx',
      include: /src\/.*\.js$|stories\/.*\.js$/,
    };

    return config;
  },
};
