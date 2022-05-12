import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Transition } from './Transition'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Primitives/Transition',
  component: Transition,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Transition>

export const Overview: ComponentStory<typeof Transition> = () => <Transition />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
