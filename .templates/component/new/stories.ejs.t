---
to: <%= h.paths.components %>/<%= h.kebobCase(name) %>/stories.tsx
---
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { <%= h.componentCase(name) %> } from './<%= h.componentCase(name) %>'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: '<%= h.componentCase(name) %>',
  component: <%= h.componentCase(name) %>,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof <%= h.componentCase(name) %>>

export const Overview: ComponentStory<typeof <%= h.componentCase(name) %>> = () => <<%= h.componentCase(name) %> />

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
