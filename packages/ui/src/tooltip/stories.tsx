import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tooltip } from './Tooltip'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Tooltip',
  component: Tooltip,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tooltip>

export const Overview: ComponentStory<typeof Tooltip> = () => <Tooltip />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
