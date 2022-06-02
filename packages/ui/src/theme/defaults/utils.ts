import { take, takeRight, remove, drop } from 'lodash'

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
  const foregroundColors = takeRight(scaleSteps, 2)
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
