import tinycolor from 'tinycolor2'

import { styled, config } from '../stitches.config'
import { Icon } from '../icon'

export const Button = styled('button', {
  all: 'unset',
  p: '$1',
  borderRadius: '$2',
  userSelect: 'none',
  cursor: 'pointer !important',
  fontSize: '$5',
  transition: '$all',

  fontFamily: '$sans',
  fontWeight: '$medium',
  textAlign: 'center',
  boxShadow: '0 0 0 3px $$borderColor',
  fontVariantNumeric: 'tabular-nums',

  '&:disabled': {
    opacity: 0.7,
    pointerEvents: 'none',
    // color: '$hiContrast',
    // backgroundColor: '$muted',
    // boxShadow: 'inset 0 0 0 1px $muted',
  },

  // Inline icons
  '& svg': {
    // display: 'inline-block',
    // verticalAlign: 'bottom',
    // height: '13px',
    // marginLeft: '5px',
  },

  '&:hover': {
    backgroundColor: '$$hoverBackground',
  },

  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
    loading: {
      true: {
        pointerEvents: 'none',
      },
    },
    rounded: {
      true: {
        borderRadius: '$4',
      },
    },
    round: {
      true: {
        width: '$6',
        height: '$6',
        minWidth: '$6',
        minHeight: '$6',
        padding: 0,
        borderRadius: '$round',

        '& svg': {
          blockSize: '100%',
          margin: 0,
        },
      },
    },
    size: {
      '1': {
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      '2': {
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      '3': {
        fontSize: '$4',
        lineHeight: '$sizes$7',
      },
    },
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$loContrast',
        '&:focus': {
          $$borderColor: tinycolor(config.theme.colors.primary).darken(10).setAlpha(0.4),
        },
        '&:hover': {
          $$hoverBackground: tinycolor(config.theme.colors.primary).darken(2.5).toString(),
        },
      },
      subtle: {
        backgroundColor: '$muted',
        '&:hover': {
          $$hoverBackground: tinycolor(config.theme.colors.muted).darken(4).toString(),
        },
        '&:focus': {
          $$borderColor: tinycolor(config.theme.colors.muted).darken(25).setAlpha(0.4),
        },
      },
    },
    // state: {
    //   active: {
    //     backgroundColor: '$slate4',
    //     boxShadow: 'inset 0 0 0 1px $colors$slate8',
    //     color: '$slate11',
    //     '@hover': {
    //       '&:hover': {
    //         backgroundColor: '$slate5',
    //         boxShadow: 'inset 0 0 0 1px $colors$slate8',
    //       },
    //     },
    //     '&:active': {
    //       backgroundColor: '$slate5',
    //     },
    //     '&:focus': {
    //       boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
    //     },
    //   },
    //   waiting: {
    //     backgroundColor: '$slate4',
    //     boxShadow: 'inset 0 0 0 1px $colors$slate8',
    //     color: 'transparent',
    //     pointerEvents: 'none',
    //     '@hover': {
    //       '&:hover': {
    //         backgroundColor: '$slate5',
    //         boxShadow: 'inset 0 0 0 1px $colors$slate8',
    //       },
    //     },
    //     '&:active': {
    //       backgroundColor: '$slate5',
    //     },
    //     '&:focus': {
    //       boxShadow: 'inset 0 0 0 1px $colors$slate8',
    //     },
    //   },
    // },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        border: '$colors$primary 1px solid',
        borderRadius: '50%',
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'primary',
    round: false,
    full: false,
  },
})
