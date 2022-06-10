import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Icon } from './Icon'
import { STATUS_BADGES } from '../../.storybook'
import { Grid } from '../layout'
import { AvailableIcons } from '.'

export default {
  title: 'Primitives/Icon',
  component: Icon.AccessibilityIcon,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Icon.AccessibilityIcon>

export const Overview: ComponentStory<typeof Icon.AccessibilityIcon> = () => {
  return (
    <Grid columns="4" gap="5" css={{ padding: '$8' }} style={{ width: '600px' }}>
      {Object.keys(Icon).map((name: string) => {
        const Component = Icon[name as AvailableIcons]

        return <Component key={name} />
      })}
    </Grid>
  )
}

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
  componentSubtitle: '15 x 15 iconset by Radix',
}
