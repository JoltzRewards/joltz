import { keyframes } from '../stitches.config'

export const _in = keyframes({
  '0%': { transform: 'scale(0.85)' },
  '100%': { transform: 'scale(1)' },
})

export const _out = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
})
