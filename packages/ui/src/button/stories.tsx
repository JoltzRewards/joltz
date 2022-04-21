import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Blue: ComponentStory<typeof Button> = () => <Button variant="blue">Blue</Button>
export const Gray: ComponentStory<typeof Button> = () => <Button variant="gray">Gray</Button>
export const TransparentBlack: ComponentStory<typeof Button> = () => (
  <Button variant="transparentBlack">Transparent Black</Button>
)
