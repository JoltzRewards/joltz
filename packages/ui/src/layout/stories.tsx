import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { STATUS_BADGES } from '../../.storybook'
import { Box } from './Box'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Primitives/Box',
  component: Box,
} as ComponentMeta<typeof Box>

export const Showcase: ComponentStory<typeof Box> = () => <Box />

Showcase.parameters = {
  badges: [STATUS_BADGES.BETA],
}
