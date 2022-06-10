import { defaultThemeMap as defaultStitchesThemeMap } from '@stitches/react'
import { colors } from './light-theme'
import { utils } from './utils'

export const breakpoints = {
  xs: '650px',
  sm: '960px',
  md: '1280px',
  lg: '1400px',
  xl: '1920px',
}

export const fonts = {
  sans: 'Rubik, -apple-system, system-ui, sans-serif',
  mono: 'Söhne Mono, menlo, monospace',
}

export const spacing = {
  1: '5px',
  2: '10px',
  3: '15px',
  4: '20px',
  5: '25px',
  6: '35px',
  7: '45px',
  8: '65px',
  9: '80px',
}

export const widths = {
  1: '25px',
  2: '50px',
  3: '100px',
  4: '200px',
  5: '400px',
  6: '800px',
  7: '1200px',
  8: '1600px',
  9: '100%',
}

export const sizes = {
  1: '5px',
  2: '10px',
  3: '15px',
  4: '20px',
  5: '25px',
  6: '35px',
  7: '45px',
  8: '65px',
  9: '80px',
}

export const lineHeights = {
  1: 1,
  2: 1.25,
  3: 1.5,
  4: 1.625,
  5: 1.75,
}

export const fontSizes = {
  1: '12px',
  2: '13px',
  3: '15px',
  4: '17px',
  5: '19px',
  6: '21px',
  7: '27px',
  8: '35px',
  9: '59px',
}

export const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const transitions = {
  all: 'all 250ms ease',
  background:
    'background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s',
  shadow: 'box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
  opacity: 'opacity 0.25s ease 0s, background 0.25s ease 0s',
  transform: 'transform 0.25s ease 0s, box-shadow 0.25s ease 0s',
}

export const radii = {
  1: '4px',
  2: '6px',
  3: '8px',
  4: '12px',
  squared: '33%',
  round: '50%',
  pill: '9999px',
}

export const zIndices = {
  1: '100',
  2: '200',
  3: '300',
  4: '400',
  5: '500',
  10: '1000',
  max: '9999',
}

export const media = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  xsMax: `(max-width: ${breakpoints.xs})`,
  smMax: `(max-width: ${breakpoints.sm})`,
  mdMax: `(max-width: ${breakpoints.md})`,
  lgMax: `(max-width: ${breakpoints.lg})`,
  xlMax: `(max-width: ${breakpoints.xl})`,
  motion: '(prefers-reduced-motion)',
  safari: 'not all and (min-resolution:.001dpcm)',
  hover: '(any-hover: hover)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
}

export const tokens = {
  colors,
  fonts,
  space: spacing,
  widths,
  sizes,
  lineHeights,
  fontSizes,
  fontWeights,
  letterSpacings,
  transitions,
  radii,
  zIndices,
  media,
  breakpoints,
}

export const themeMap = {
  ...defaultStitchesThemeMap,
  width: 'widths',
  height: 'space',
  minWidth: 'space',
  maxWidth: 'space',
  minHeight: 'space',
  maxHeight: 'space',
  flexBasis: 'space',
  lineHeight: 'lineHeights',
  gridTemplateColumns: 'space',
  gridTemplateRows: 'space',
  blockSize: 'space',
  minBlockSize: 'space',
  maxBlockSize: 'space',
  inlineSize: 'space',
  minInlineSize: 'space',
  maxInlineSize: 'space',
}

export const theme = {
  prefix: 'trubit-ui',
  theme: tokens,
  utils,
}
