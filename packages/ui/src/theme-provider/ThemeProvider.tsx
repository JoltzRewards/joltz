import React from 'react'

import { defaultTheme } from '../theming'

type ThemeProviderContextValue = {
  theme: typeof defaultTheme
  toggleDarkMode: () => void
}

type ThemeProviderProps = {
  theme?: typeof defaultTheme
}

const ThemeProviderContext = React.createContext<ThemeProviderContextValue | null>(null)

export const useTheme = () => {
  const theme = React.useContext(ThemeProviderContext)

  if (!theme) {
    throw new Error('No ThemeProvider found. Cannot use theming hooks.')
  }

  return theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  const [useDarkMode, setUseDarkMode] = React.useState(false)
  const toggleDarkMode = React.useCallback(() => setUseDarkMode((s) => !s), [])
  const value = React.useMemo(
    () => ({
      theme: theme || defaultTheme,
      toggleDarkMode,
      selectedTheme: useDarkMode ? 'dark' : 'default',
    }),
    [theme, toggleDarkMode, useDarkMode],
  )
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}
