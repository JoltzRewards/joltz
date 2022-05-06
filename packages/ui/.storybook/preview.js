const { TrubitThemeProviderDecorator } = require('./decorators/ThemeProvider')

export const decorators = [TrubitThemeProviderDecorator]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
