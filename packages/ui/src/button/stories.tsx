import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'
import { STATUS_BADGES } from '../../.storybook'
import { Flex, Box } from '../layout'
import { Icon } from '../icon'

export default {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>

export const Overview: ComponentStory<typeof Button> = () => (
  <Flex direction="column" css={{ width: 'max-content' }}>
    <Box mb="3" css={{ width: 'max-content' }}>
      <Button variant="primary" full css={{ mb: '$2' }}>
        Primary
      </Button>
      <Button variant="subtle" full>
        Secondary
      </Button>
    </Box>
    <Flex>
      <Button round variant="primary">
        <Icon.FontBoldIcon />
      </Button>
      <Button round variant="subtle">
        <Icon.BellIcon />
      </Button>
      <Button round variant="subtle" full>
        <Icon.UploadIcon />
      </Button>
      <Button round loading variant="subtle" full>
        <Icon.ReloadIcon />
      </Button>
    </Flex>
  </Flex>
)

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
