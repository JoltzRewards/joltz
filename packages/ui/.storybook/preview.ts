import { slateDark, cyanDark, purpleDark, orangeA } from '@radix-ui/colors'
import { themes } from '@storybook/theming'

import { TrubitThemeProviderDecorator, GlobalStylesDecorator, StoryWrapper } from './decorators'
import { STATUS_BADGES } from './constants'

const commonBadgeStyles = {
  paddingBlock: '4px',
  paddingInline: '6px',
  fontSize: '10px',
}

export const decorators = [GlobalStylesDecorator, TrubitThemeProviderDecorator, StoryWrapper]
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: themes.dark,
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
      select: /(variant)$/i,
    },
  },
  badgesConfig: {
    [STATUS_BADGES.BETA]: {
      title: 'Beta',
      styles: {
        backgroundColor: slateDark.slate12,
        color: slateDark.slate9,
        borderColor: slateDark.slate12,
        ...commonBadgeStyles,
      },
    },
    [STATUS_BADGES.EXPERIMENTAL]: {
      title: 'Experimental',
      styles: {
        backgroundColor: purpleDark.purple12,
        color: purpleDark.purple9,
        borderColor: purpleDark.purple12,
        ...commonBadgeStyles,
      },
    },
    [STATUS_BADGES.STABLE]: {
      title: 'Stable',
      styles: {
        backgroundColor: cyanDark.cyan12,
        color: cyanDark.cyan9,
        borderColor: cyanDark.cyan12,
        ...commonBadgeStyles,
      },
    },
    // alpha: {},
    // beta: {},
    // stable: {}
  },
}
