import { keyframes } from '../stitches.config'

export const _down = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-0.625em)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const _up = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0.625em)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})
