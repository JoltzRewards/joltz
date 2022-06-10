import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StxAddressInput } from './StxAddressInput'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Components/StxAddressInput',
  component: StxAddressInput,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof StxAddressInput>

export const Overview: ComponentStory<typeof StxAddressInput> = () => <StxAddressInput />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
  componentSubtitle: 'Text input with STX wallet address validation',
}
