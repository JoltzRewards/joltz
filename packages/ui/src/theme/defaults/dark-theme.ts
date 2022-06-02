import {
  grayDark,
  mauveDark,
  slateDark,
  sageDark,
  oliveDark,
  sandDark,
  tomatoDark,
  redDark,
  crimsonDark,
  pinkDark,
  plumDark,
  purpleDark,
  violetDark,
  indigoDark,
  blueDark,
  skyDark,
  mintDark,
  cyanDark,
  tealDark,
  greenDark,
  grassDark,
  limeDark,
  yellowDark,
  amberDark,
  orangeDark,
  brownDark,
  bronzeDark,
  goldDark,
  grayDarkA,
  mauveDarkA,
  slateDarkA,
  sageDarkA,
  oliveDarkA,
  sandDarkA,
  tomatoDarkA,
  redDarkA,
  crimsonDarkA,
  pinkDarkA,
  plumDarkA,
  purpleDarkA,
  violetDarkA,
  indigoDarkA,
  blueDarkA,
  skyDarkA,
  mintDarkA,
  cyanDarkA,
  tealDarkA,
  greenDarkA,
  grassDarkA,
  limeDarkA,
  yellowDarkA,
  amberDarkA,
  orangeDarkA,
  brownDarkA,
  bronzeDarkA,
  goldDarkA,
} from '@radix-ui/colors'

export const darkColors = {
  ...grayDark,
  ...mauveDark,
  ...slateDark,
  ...sageDark,
  ...oliveDark,
  ...sandDark,
  ...tomatoDark,
  ...redDark,
  ...crimsonDark,
  ...pinkDark,
  ...plumDark,
  ...purpleDark,
  ...violetDark,
  ...indigoDark,
  ...blueDark,
  ...skyDark,
  ...mintDark,
  ...cyanDark,
  ...tealDark,
  ...greenDark,
  ...grassDark,
  ...limeDark,
  ...yellowDark,
  ...amberDark,
  ...orangeDark,
  ...brownDark,
  ...bronzeDark,
  ...goldDark,

  // Semantic colors
  hiContrast: '$slate12',
  loContrast: '$slate1',
  canvas: 'hsl(0 0% 15%)',
  panel: '$slate3',
  transparentPanel: 'hsl(0 100% 100% / 97%)',
  shadowLight: 'hsl(206 22% 7% / 35%)',
  shadowDark: 'hsl(206 22% 7% / 20%)',
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
export type AvailableDarkColors = keyof typeof darkColors
