import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>

export const Variants: ComponentStory<typeof Button> = (args) => (
  <Button variant={args.variant}>Cancel</Button>
)

Variants.parameters = {
  badges: [STATUS_BADGES.BETA],
  docs: {
    page: null,
    source: {
      code: 'Your code snippet goes here.',
      language: 'jsx',
      type: 'auto',
    },
  },
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
