import * as IconPrimitives from '@radix-ui/react-icons'
import React from 'react'

import { AvailableDarkColors, AvailableLightColors } from '../theme'

export type AvailableIcons = keyof typeof IconPrimitives
export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: AvailableDarkColors | AvailableLightColors
}

export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>

export const Icon = Object.keys(IconPrimitives).reduce((acc, currentValue) => {
  return {
    ...acc,
    /* @ts-ignore */
    [currentValue]: IconPrimitives[currentValue as AvailableIcons],
  }
}, {} as Record<AvailableIcons, IconComponent>)

Icon.toString = () => '.icon'
