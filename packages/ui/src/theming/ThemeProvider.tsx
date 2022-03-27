import { createContext } from 'react'
import { defaultTheme, darkTheme } from './stitches'

const ThemeProviderContext = createContext(null)

type AvailableThemes = {
  [s: string]: string
}

const availableThemes: AvailableThemes = {
  dark: darkTheme.className,
  default: defaultTheme.className,
}
