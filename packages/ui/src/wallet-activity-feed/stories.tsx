import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletActivityFeed } from './WalletActivityFeed'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Components/WalletActivityFeed',
  component: WalletActivityFeed,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof WalletActivityFeed>

export const Overview: ComponentStory<typeof WalletActivityFeed> = () => <WalletActivityFeed />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
