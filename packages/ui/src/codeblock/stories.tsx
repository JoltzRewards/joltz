import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Codeblock } from './Codeblock'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Primitives/Codeblock',
  component: Codeblock,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Codeblock>

export const Overview: ComponentStory<typeof Codeblock> = () => <Codeblock />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
