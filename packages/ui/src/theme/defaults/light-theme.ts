import { defaultTokens } from './common'

export const lightColors = {
  // hiContrast: '$slate12',
  // loContrast: 'white',
  error: defaultTokens.colors.crimson[600],
  warning: defaultTokens.colors.amber[400],
  success: '$teal9',
  info: '$indigo9',
  panel: 'hsl(0 0% 93%)',
  // branding
  primary: defaultTokens.colors.purple[400],
  accent: defaultTokens.colors.teal[400],
  secondary: defaultTokens.colors.indigo[200],
  highlight: defaultTokens.colors.blue[400],
  muted: defaultTokens.colors.slate[700],

  // transparentPanel: 'hsl(0 0% 0% / 97%)',
  // shadowLight: 'hsl(206 22% 7% / 35%)',
  // shadowDark: 'hsl(206 22% 7% / 20%)',
}

/**
 * @name AvailableLightColors
 * @description all available colors provided
 * @see https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#use-cases
 *
 * 1: App background
 *
 * 2: Subtle background
 *
 * 3: UI element background
 *
 * 4: Hovered UI element background
 *
 * 5: Active/Selected UI element background
 *
 * 6: Subtle borders and separators
 *
 * 7: UI element border and focus rings
 *
 * 8: Hovered UI element border
 *
 * 9: Solid backgrounds
 *
 * 10: Hovered solid backgrounds
 *
 * 11: Low-contrast text
 *
 * 12: High-contrast text
 */
export type AvailableLightColors = keyof typeof lightColors
