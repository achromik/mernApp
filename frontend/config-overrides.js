const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config, env) {
    config = addWebpackAlias({
        ['Components']: path.resolve(__dirname, 'src', 'components'),
        ['Common']: path.resolve(__dirname, 'src', 'common'),
        ['@src']: path.resolve(__dirname, 'src'),
    })(config);

    return config;
};
