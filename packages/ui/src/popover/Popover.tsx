import * as Primitive from '@radix-ui/react-popover'
import type { PopoverProps as PrimitiveProps } from '@radix-ui/react-popover'
import { styled } from '../stitches.config'
import { slide, scale } from '../animations'

export type PopoverProps = PrimitiveProps

const Root = styled(Primitive.Popover, {})
const Arrow = styled(Primitive.Arrow, {
  fill: '$panel',
})
const Content = styled(Primitive.Content, {
  borderRadius: '$2',
  backgroundColor: '$panel',
  padding: '$4',
  fontSize: '$3',
  transformOrigin: 'var(--radix-popover-content-transform-origin)',
  animation: `${scale._in} 0.5s ease-out forwards`,
  animationDuration: '0.6s',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  animationFillMode: 'forwards',
  '&[data-side="top"]': { animationName: slide._up() },
  '&[data-side="bottom"]': { animationName: slide._down() },
})
const Trigger = styled(Primitive.Trigger, {
  appearance: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
})
const Anchor = styled(Primitive.Anchor, {})
const Close = styled(Primitive.Close, {
  all: 'unset',
  width: 'fit-content',
})

interface Popover {
  Root: typeof Root
  Arrow: typeof Arrow
  Content: typeof Content
  Trigger: typeof Trigger
  Anchor: typeof Anchor
  Close: typeof Close
}

export const Popover: Popover = {
  Root,
  Arrow,
  Content,
  Trigger,
  Anchor,
  Close,
}
