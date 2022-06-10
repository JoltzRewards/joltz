import { boxModelVariants } from '../common'
import { styled } from '../stitches.config'

export const Box = styled('div', {
  // Reset
  boxSizing: 'border-box',
  maxWidth: '100%',
  variants: {
    ...boxModelVariants,
    full: {
      true: {
        width: '100%',
      },
    },
  },
})
