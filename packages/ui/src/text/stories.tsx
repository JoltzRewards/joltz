import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Text } from './Text'
import { Flex } from '..'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Primitives/Text',
  component: Text,
} as ComponentMeta<typeof Text>

export const Showcase: ComponentStory<typeof Text> = () => (
  <Flex direction="column" css={{ width: '75%' }}>
    <Text css={{ mb: '$1' }} size="1">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$2' }} size="2">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$3' }} size="3">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$4' }} size="4">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$5' }} size="5">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$5' }} size="6">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$5' }} size="7">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$6' }} size="8">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
    <Text css={{ mb: '$7' }} size="9">
      Ubermensch law justice right gains ubermensch. Intentions faithful decrepit strong salvation
      inexpedient. Grandeur pious inexpedient ascetic war faithful morality fearful ultimate pious.
    </Text>
  </Flex>
)
