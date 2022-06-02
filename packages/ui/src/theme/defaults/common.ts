import { defaultThemeMap as defaultStitchesThemeMap } from '@stitches/react'
import type * as Stitches from '@stitches/react'
import {
  crimson,
  plum,
  purple,
  blue,
  indigo,
  teal,
  slate,
  gray,
  amber,
  orange,
} from '@radix-ui/colors'
// import { ConfigType } from '@stitches/react/types/config'
// import { buildColorDictionary } from './utils'
// import { lightColors } from '.'

const defaultBreakpoints = {
  xs: '650px',
  sm: '960px',
  md: '1280px',
  lg: '1400px',
  xl: '1920px',
}

export const defaultTokens = {
  colors: {
    ...slate,
    ...gray,
    ...crimson,
    ...plum,
    ...purple,
    ...amber,
    ...blue,
    ...indigo,
    ...teal,
    ...orange,
  },
  fonts: {
    untitled: 'Untitled Sans, -apple-system, system-ui, sans-serif',
    mono: 'Söhne Mono, menlo, monospace',
  },
  space: {
    1: '5px',
    2: '10px',
    3: '15px',
    4: '20px',
    5: '25px',
    6: '35px',
    7: '45px',
    8: '65px',
    9: '80px',
  },
  sizes: {
    1: '5px',
    2: '10px',
    3: '15px',
    4: '20px',
    5: '25px',
    6: '35px',
    7: '45px',
    8: '65px',
    9: '80px',
  },
  lineHeights: {
    1: 1,
    2: 1.25,
    3: 1.5,
    4: 1.625,
    5: 1.75,
  },
  fontSizes: {
    1: '12px',
    2: '13px',
    3: '15px',
    4: '17px',
    5: '19px',
    6: '21px',
    7: '27px',
    8: '35px',
    9: '59px',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  transitions: {
    all: 'all 250ms ease',
    background:
      'background 0.25s ease 0s, color 0.25s ease 0s, border-color 0.25s ease 0s, box-shadow 0.25s ease 0s, transform 0.25s ease 0s, opacity 0.25s ease 0s',
    shadow: 'box-shadow 0.25s ease 0s, opacity 0.25s ease 0s',
    opacity: 'opacity 0.25s ease 0s, background 0.25s ease 0s',
    transform: 'transform 0.25s ease 0s, box-shadow 0.25s ease 0s',
  },
  radii: {
    1: '4px',
    2: '6px',
    3: '8px',
    4: '12px',
    squared: '33%',
    round: '50%',
    pill: '9999px',
  },
  zIndices: {
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    5: '500',
    10: '1000',
    max: '9999',
  },
  media: {
    xs: `(min-width: ${defaultBreakpoints.xs})`,
    sm: `(min-width: ${defaultBreakpoints.sm})`,
    md: `(min-width: ${defaultBreakpoints.md})`,
    lg: `(min-width: ${defaultBreakpoints.lg})`,
    xl: `(min-width: ${defaultBreakpoints.xl})`,
    xsMax: `(max-width: ${defaultBreakpoints.xs})`,
    smMax: `(max-width: ${defaultBreakpoints.sm})`,
    mdMax: `(max-width: ${defaultBreakpoints.md})`,
    lgMax: `(max-width: ${defaultBreakpoints.lg})`,
    xlMax: `(max-width: ${defaultBreakpoints.xl})`,
    motion: '(prefers-reduced-motion)',
    safari: 'not all and (min-resolution:.001dpcm)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  breakpoints: defaultBreakpoints,
}

export const defaultUtils = {
  p: (value: Stitches.PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: Stitches.PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
    marginBottom: value,
  }),
  ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),
  fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({
    flexDirection: value,
  }),
  fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),
  ai: (value: Stitches.PropertyValue<'alignItems'>) => ({
    alignItems: value,
  }),
  ac: (value: Stitches.PropertyValue<'alignContent'>) => ({
    alignContent: value,
  }),
  jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({
    justifyContent: value,
  }),
  as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
  fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
  fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({
    flexShrink: value,
  }),
  fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),
  bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
    backgroundColor: value,
  }),
  br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
    borderRadius: value,
  }),
  btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
    borderTopLeftRadius: value,
  }),
  bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),
  lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({
    lineHeight: value,
  }),
  ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
  oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),
  pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({
    pointerEvents: value,
  }),
  us: (value: Stitches.PropertyValue<'userSelect'>) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),
  appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
    WebkitAppearance: value,
    appearance: value,
  }),
  backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
  maxSize: (value: Stitches.PropertyValue<'width'>) => ({ maxWidth: value, maxHeight: value }),
  minSize: (value: Stitches.PropertyValue<'width'>) => ({
    minWidth: value,
    minHeight: value,
    height: value,
    width: value,
  }),
  size: (value: Stitches.PropertyValue<'width'>) => ({ width: value, height: value }),
  d: (value: Stitches.PropertyValue<'display'>) => ({ display: value }),
  scale: (value: Stitches.PropertyValue<'scale'>) => ({ transform: `scale(${value})` }),
  linearGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
  textGradient: (value: Stitches.PropertyValue<'backgroundImage'>) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '&::selection': {
      WebkitTextFillColor: '$colors$text',
    },
  }),
}

export const defaultThemeMap = {
  ...defaultStitchesThemeMap,
  width: 'space',
  height: 'space',
  minWidth: 'space',
  maxWidth: 'space',
  minHeight: 'space',
  maxHeight: 'space',
  flexBasis: 'space',
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
  theme: defaultTokens,
}
