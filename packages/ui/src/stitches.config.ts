import { createStitches } from '@stitches/react'
import type { ConfigType } from '@stitches/react/types/config'
import type * as Stitches from '@stitches/react'
export type {
  VariantProps,
  PropertyValue,
  ComponentProps,
  ScaleValue,
  DefaultThemeMap,
  CSSProperties,
} from '@stitches/react'
import type * as PrimitiveTypes from '@radix-ui/react-primitive'
export type { PrimitiveTypes }

import { theme } from './theme'

export const {
  styled,
  css,
  theme: defaultTheme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
  reset,
} = createStitches(theme)

export type Theme = ConfigType.Theme

export type CSS = Stitches.CSS<typeof config>
