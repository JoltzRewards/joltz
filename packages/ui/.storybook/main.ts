export default {
  stories: ['../src/**/stories.@(ts|tsx|mdx)', '../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    // '@storybook/addon-interactions',
    '@geometricpanda/storybook-addon-badges',
  ],
  framework: '@storybook/react',
  features: {
    storyStoreV7: true,
  },
  webpackFinal: (config: any) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    })

    return config
  },
}
