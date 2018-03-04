const DominoBuildUtils = require('@domino/build-utils');

module.exports = (config, configType) => {
  config = DominoBuildUtils.createStorybookWebpackConfig(config, configType);

  return config;
};
