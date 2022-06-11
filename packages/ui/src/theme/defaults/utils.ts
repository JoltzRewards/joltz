import type * as Stitches from '@stitches/react'
import take from 'lodash.take'

type ColorDictionaryKey<identifier extends string> =
  | `${identifier}100`
  | `${identifier}200`
  | `${identifier}300`
  | `${identifier}400`
  | `${identifier}500`
  | `${identifier}600`
  | `${identifier}700`
  | `${identifier}800`

type ColorDictionary<identifier extends string> = {
  bg: { 100: string; 200: string }
  fg: Record<number, string>
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
}

/**
 * @name buildColorDictionary
 * @description takes a scale from @radix-ui/colors and returns a dictionary with better keys
 * @returns
 * {
 *  bg: { 100: 'hsl(322, 100%, 99.4%)', 200: 'hsl(323, 100%, 98.4%)' },
    fg: { 100: 'hsl(322, 75.0%, 46.0%)', 200: 'hsl(320, 70.0%, 13.5%)' },
    pink100: 'hsl(323, 86.3%, 96.5%)',
    pink200: 'hsl(323, 78.7%, 94.2%)',
    pink300: 'hsl(323, 72.2%, 91.1%)',
    pink400: 'hsl(323, 66.3%, 86.6%)',
    pink500: 'hsl(323, 62.0%, 80.1%)',
    pink600: 'hsl(323, 60.3%, 72.4%)',
    pink700: 'hsl(322, 65.0%, 54.5%)',
    pink800: 'hsl(322, 63.9%, 50.7%)'
  }
 */
export function buildColorDictionary<id extends string>(scale: Record<string, string>) {
  const scaleSteps = Object.keys(scale) // name of steps in color scale e.g. pink1, ..., pink12
  const startingPoint = scaleSteps[0] // first color in scale e.g. pink1
  const [identifier] = startingPoint.match(/[a-z]+|[^a-z]+/gi) || [] // ['pink', ...]
  const backgroundColors = take(scaleSteps, 2)
  const foregroundColors = take(scaleSteps, 2)
  // const foregroundColors = takeRight(scaleSteps, 2)
  const remainingColors = scaleSteps.slice(2, -2) // color names without colors intended for foreground and background

  const colors = remainingColors.reduce((acc, current, idx) => {
    return {
      ...acc,
      /* @ts-ignore */
      [100 * ++idx]: scale[current],
    }
  }, {} as ColorDictionary<id>)

  return {
    ...colors,
    bg: {
      100: scale[backgroundColors[0]],
      200: scale[backgroundColors[1]],
    },
    fg: {
      100: scale[foregroundColors[0]],
      200: scale[foregroundColors[1]],
    },
  }
}

export const utils = {
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
