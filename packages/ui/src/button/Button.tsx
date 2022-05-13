import { styled } from '../stitches.config'

export const Button = styled('button', {
  all: 'unset',
  userSelect: 'none',
  cursor: 'pointer !important',
  justifyContent: 'center',

  px: '$2',
  fontFamily: '$untitled',
  fontSize: '$sizes$2 !important',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',

  '&:disabled': {
    backgroundColor: '$slate2',
    boxShadow: 'inset 0 0 0 1px $colors$slate7',
    color: '$slate8',
    pointerEvents: 'none',
  },

  // Inline icons
  '& svg': {
    display: 'inline-block',
    verticalAlign: 'bottom',
    height: '13px',
    marginLeft: '5px',
  },

  variants: {
    full: {
      true: {
        width: '100%',
      },
    },
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        px: '$3',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$4',
        lineHeight: '$sizes$7',
      },
    },
    variant: {
      primary: {
        backgroundColor: '$primary',
        boxShadow: 'inset 0 0 0 1px $slate7',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate2',
          boxShadow: 'inset 0 0 0 1px $colors$slate8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
        },
        // '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
        //   {
        //     backgroundColor: '$slate4',
        //     boxShadow: 'inset 0 0 0 1px $colors$slate8',
        //   },
      },
      secondary: {
        backgroundColor: '$colors$secondary',
        // boxShadow: 'inset 0 0 0 1px $colors$secondaryDarkCompliment',
        color: '$colors$purple3',
        // '@hover': {
        //   '&:hover': {
        //     boxShadow: 'inset 0 0 0 1px $colors$blue8'
        //   },
        // },                  ``````````````````````````````````````````````````````````````````````````````````
        '&:active': {
          backgroundColor: '$colors$purple10',
          boxShadow: 'inset 0 0 0 1px $colors$purple8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$purple8, 0 0 0 1px $colors$purple8',
        },
        '&:hover': {
          backgroundColor: '$colors$purple10',
        },
        // '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
        //   {
        //     backgroundColor: '$blue4',
        //     boxShadow: 'inset 0 0 0 1px $colors$blue8',
        //   },
      },
      tertiary: {
        backgroundColor: '$colors$tertiary',
        boxShadow: 'inset 0 0 0 1px $colors$green7',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$green8',
          },
        },
        '&:active': {
          backgroundColor: '$green3',
          boxShadow: 'inset 0 0 0 1px $colors$green8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$green8, 0 0 0 1px $colors$green8',
        },
        // '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
        //   {
        //     backgroundColor: '$green4',
        //     boxShadow: 'inset 0 0 0 1px $colors$green8',
        //   },
      },
      subtle: {
        backgroundColor: 'hsla(0,100%,100%,.2)',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,100%,100%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,100%,100%,.3)',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px hsla(0,100%,100%,.35), 0 0 0 1px hsla(0,100%,100%,.35)',
        },
      },
    },
    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: '$slate11',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: 'transparent',
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$slate8',
        },
      },
    },
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
    variant: 'blue',
  },
})
