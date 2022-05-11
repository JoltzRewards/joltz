import { styled } from '../stitches.config'

export const Button = styled('button', {
  cursor: 'pointer',
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',

  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  height: '$5',
  px: '$2',
  fontFamily: '$untitled',
  fontSize: '$2',
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
        boxShadow: 'inset 0 0 0 1px $colors$blue7',
        color: '$blue11',
        // '@hover': {
        //   '&:hover': {
        //     boxShadow: 'inset 0 0 0 1px $colors$blue8'
        //   },
        // },                  ``````````````````````````````````````````````````````````````````````````````````
        '&:active': {
          backgroundColor: '$blue9',
          boxShadow: 'inset 0 0 0 1px $colors$blue8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$blue8, 0 0 0 1px $colors$blue8',
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
        color: '$green11',
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
      transparentWhite: {
        backgroundColor: 'hsla(0,100%,100%,.2)',
        color: 'white',
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
      transparentBlack: {
        backgroundColor: 'hsla(0,0%,0%,.08)',
        color: 'black',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,0%,0%,.1)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,0%,0%,.15)',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px hsla(0,0%,0%,.3), 0 0 0 1px hsla(0,0%,0%,.3)',
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
