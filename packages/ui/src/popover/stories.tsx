import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Popover } from './Popover'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Primitives/Popover',
  component: Popover,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Popover>

export const Overview: ComponentStory<typeof Popover> = () => <Popover />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
