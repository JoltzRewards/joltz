import {
  slateDark,
  whiteA,
  crimsonDark,
  amberDark,
  tealDark,
  indigoDark,
  purpleDark,
  blueDark,
} from '@radix-ui/colors'

export const colors = {
  hiContrast: slateDark.slate12,
  loContrast: whiteA.whiteA12,
  error: crimsonDark.crimson7,
  warning: amberDark.amber7,
  success: tealDark.teal9,
  info: indigoDark.indigo9,
  panel: 'hsl(0 0% 93%)',
  // branding
  primary: purpleDark.purple7,
  accent: tealDark.teal7,
  secondary: indigoDark.indigo7,
  highlight: blueDark.blue7,
  muted: slateDark.slate7,
  // // Semantic colors
  // hiContrast: '$slate12',
  // loContrast: '$slate1',
  // canvas: 'hsl(0 0% 15%)',
  // panel: '$slate3',
  // transparentPanel: 'hsl(0 100% 100% / 97%)',
  // shadowLight: 'hsl(206 22% 7% / 35%)',
  // shadowDark: 'hsl(206 22% 7% / 20%)',
}

/**
 * @name AvailableDarkColors
 * @description all available dark colors provided
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
export type AvailableDarkColors = keyof typeof colors
