import React from 'react'
import { ThemeProvider, defaultTheme, Theme } from '../../src'

export const TrubitThemeProviderDecorator = (storyFn: any) => {
  const theme: Theme = {
    ...defaultTheme,
    fonts: {
      sans: 'Rubik, -apple-system, system-ui, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
  }
  return <ThemeProvider theme={defaultTheme}>{storyFn()}</ThemeProvider>
}
