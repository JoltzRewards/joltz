import { ThemeProvider, defaultTheme } from '../../src'

export const TrubitThemeProviderDecorator = (storyFn) => {
  return <ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>
}
