import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'
import { STATUS_BADGES } from '../../.storybook'
import { Flex } from '../layout'

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

export const Variants: ComponentStory<typeof Button> = () => (
  <Flex wrap="wrap">
    <Button variant="primary" full css={{ mb: '$1' }}>
      Primary
    </Button>
    <Button variant="secondary" full css={{ mb: '$1' }}>
      Secondary
    </Button>
    <Button variant="tertiary" full css={{ mb: '$1' }}>
      Tertiary
    </Button>
    <Button variant="transparentBlack" full css={{ mb: '$1' }}>
      Transparent Black
    </Button>
    <Button variant="transparentWhite" full css={{ mb: '$1' }}>
      Transparent White
    </Button>
  </Flex>
)

Variants.parameters = {
  badges: [STATUS_BADGES.BETA],
}

export const Sizes: ComponentStory<typeof Button> = () => (
  <>
    <Button variant="transparentBlack" size="1">
      Deny
    </Button>
    <Button variant="transparentBlack" size="2">
      Deny
    </Button>
    <Button variant="transparentBlack" size="3">
      Deny
    </Button>
  </>
)
