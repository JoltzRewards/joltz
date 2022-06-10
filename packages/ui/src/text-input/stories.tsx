import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextInput } from './TextInput'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Primitives/TextInput',
  component: TextInput,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TextInput>

export const Overview: ComponentStory<typeof TextInput> = () => <TextInput />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
