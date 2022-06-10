import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tooltip } from './Tooltip'
import { STATUS_BADGES } from '../../.storybook'
import { Box, Icon, Text } from '..'

export default {
  title: 'Primitives/Tooltip',
  component: Tooltip.Root,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tooltip.Root>

export const Overview: ComponentStory<typeof Tooltip.Root> = () => (
  <Tooltip.Provider delayDuration={100}>
    <Tooltip.Root>
      <Tooltip.Trigger>
        <Icon.BackpackIcon />
        <Box css={{ width: '100%' }}>
          <Text>Inventory</Text>
        </Box>
      </Tooltip.Trigger>
      <Tooltip.Content sideOffset={2}>
        Manage Your Equipment
        <Tooltip.Arrow width={8} height={4} />
      </Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
)

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
