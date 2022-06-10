import React, { useCallback, useState } from 'react'
import merge from 'lodash.merge'

import { defaultTheme } from '../stitches.config'
import type { Theme } from '../stitches.config'

type ThemeProviderContextValue = {
  theme: Theme
  isDark: boolean
  toggleDarkMode: () => void
  extendTheme: (t: Theme) => void
  replaceTheme: (t: Theme) => void
}

export type ThemeProviderProps = {
  theme?: Partial<Theme>
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
  const [useDarkMode, setUseDarkMode] = useState(false)
  const toggleDarkMode = useCallback(() => setUseDarkMode((s) => !s), [])
  const [selectedTheme, setSelectedTheme] = useState(theme || defaultTheme)
  const replaceTheme = useCallback((t: Theme) => setSelectedTheme(t), [])
  const extendTheme = useCallback(
    (t: Theme) => {
      const updatedTheme = merge(t, theme)

      setSelectedTheme(updatedTheme)
    },
    [theme],
  )
  const value = React.useMemo(
    () => ({
      theme: selectedTheme as Theme,
      extendTheme,
      replaceTheme,
      toggleDarkMode,
      isDark: useDarkMode !== false,
    }),
    [selectedTheme, extendTheme, replaceTheme, toggleDarkMode, useDarkMode],
  )
  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}
