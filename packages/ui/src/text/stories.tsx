import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Text } from './Text'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Primitives/Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const Showcase: ComponentStory<typeof Text> = () => (
  <Text size="9">
    Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
    inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
  </Text>
)
