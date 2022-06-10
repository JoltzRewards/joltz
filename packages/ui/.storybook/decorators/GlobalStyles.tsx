import { DecoratorFn, StoryFn } from '@storybook/react'
import { globalCss } from '../../src'

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontDisplay: 'swap',
      src: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap',
    },
  ],
  '*, *:before, *:after': {
    boxSizing: 'border-box',
  },
  'body, html': {
    fontFamily: 'Rubik, sans-serif',
    lineHeight: '1.5em',
    fontSize: '14px',
  },
})

export const GlobalStylesDecorator: DecoratorFn = (storyFn: (...a: any[]) => any) => {
  globalStyles()

  return storyFn()
}
