import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { darkTheme } from '../theming'

import { ThemeProvider } from './ThemeProvider'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'ThemeProvider',
  component: ThemeProvider,
} as ComponentMeta<typeof ThemeProvider>

export const Primary: ComponentStory<typeof ThemeProvider> = () => (
  <ThemeProvider theme={darkTheme}>
    <h1>Wee</h1>
  </ThemeProvider>
)
