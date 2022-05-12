import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonGroup } from './ButtonGroup'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ButtonGroup>

export const Overview: ComponentStory<typeof ButtonGroup> = () => <ButtonGroup />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
