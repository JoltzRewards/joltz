module.exports = {
  stories: ['../src/**/stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@geometricpanda/storybook-addon-badges',
  ],
  framework: '@storybook/react',
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    return config
  },
}
