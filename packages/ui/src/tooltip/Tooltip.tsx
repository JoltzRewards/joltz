import * as Primitive from '@radix-ui/react-tooltip'
// import type { TooltipProps as PrimitiveProps } from '@radix-ui/react-tooltip'
import { styled } from '../stitches.config'
import { fade, slide } from '../animations'

// type TooltipProps = PrimitiveProps

const Provider = styled(Primitive.Provider, {})
const Root = styled(Primitive.Root, {})
const Trigger = styled(Primitive.Trigger, {
  display: 'grid',
  gridTemplateColumns: '0.25fr 1fr',
  gridAutoRows: 'minmax(24px, auto)',
  alignItems: 'center',
  columnGap: '0.5rem',
  justifyContent: 'start',

  '& svg': {
    alignSelf: 'center',
    justifySelf: 'center',
  },
})
const Content = styled(Primitive.Content, {
  backgroundColor: '$hiContrast',
  color: '$loContrast',
  fontSize: '$2',
  py: '$1',
  px: '$2',
  borderRadius: '$1',
  transformOrigin: 'var(--radix-tooltip-content-transform-origin)',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  animationDuration: '0s',
  '&[data-side="top"]': { animationName: slide._up },
  '&[data-side="bottom"]': { animationName: slide._down },
  '&[data-state="delayed-open"], &[data-state="open"]': {
    animationDuration: '1.5s',
  },
})
const Arrow = styled(Primitive.Arrow, {
  fill: '$hiContrast',
  animation: `${slide._down} 0.3s ease-out forwards`,
})

interface Tooltip {
  Provider: typeof Provider
  Root: typeof Root
  Trigger: typeof Trigger
  Content: typeof Content
  Arrow: typeof Arrow
}

export const Tooltip: Tooltip = {
  Provider,
  Root,
  Trigger,
  Content,
  Arrow,
}
