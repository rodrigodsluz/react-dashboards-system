const { override, addLessLoader } = require('customize-cra');

const theme = require('./src/theme/theme.json');

const supportMjs = () => (webpackConfig) => {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });
  return webpackConfig;
};

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@base-color': theme.primary.main },
    },
  }),
  supportMjs(),
);
