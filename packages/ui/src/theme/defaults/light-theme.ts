import {
  greenA,
  slate,
  whiteA,
  violet,
  crimson,
  amber,
  teal,
  indigo,
  purple,
  blue,
  orange,
} from '@radix-ui/colors'

import * as swatches from './palettes'

export const colors = {
  primary: '#501EF6',
  secondary: '#3D15D3',
  info: '#00CBFF',
  success: '#86de13',
  warning: '#FFAA00',
  error: '#FF3426',
  muted: '#e2e6ea',
  panel: 'hsl(0 0% 97%)',
  slate: '#03071e',
  white: 'hsl(0 0% 100%)',

  // Black and White
  // primary: '#000814',
  // secondary: '#f4f3ee',
  // muted: '#f4f3ee',
  // panel: 'hsl(0 0% 97%)',

  // accent: swatches.hero.highlight,
  loContrast: '#f4f3ee',
  hiContrast: '#000814',

  // error: crimson.crimson7,
  // warning: amber.amber7,
  // success: teal.teal9,
  // info: indigo.indigo9,
  // panel: 'hsl(0 0% 93%)',

  // primary: blue.blue9,
  // secondary: indigo.indigo9,
  // tertiary: violet.violet9,
  // accent: teal.teal9,
  // highlight: orange.orange8,
  // muted: slate.slate8,
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
export type AvailableLightColors = keyof typeof colors
