import React from 'react'
import * as Primitive from '@radix-ui/react-dialog'

import { fade, scale } from '../animations'
import { styled } from '../stitches.config'

export type ModalProps = React.ComponentProps<typeof Root>
export type ModalTriggerProps = React.ComponentProps<typeof Trigger>
export type ModalContentProps = React.ComponentProps<typeof Content>
export type ModalCloseProps = React.ComponentProps<typeof Close>
export type ModalPortalProps = React.ComponentProps<typeof Portal>
export type ModalOverlayProps = React.ComponentProps<typeof Overlay>
export type ModalTitleProps = React.ComponentProps<typeof Title>
export type ModalDescriptionProps = React.ComponentProps<typeof Description>

const Root = styled(Primitive.Root, {
  maxWidth: '150px',
})
const Trigger = styled(Primitive.Trigger, {})
const Content = styled(Primitive.Content, {
  transformOrigin: 'var(--radix-modal-content-transform-origin)',
  // animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // animationFillMode: 'forwards',
  backgroundColor: '$panel',
  position: 'relative',
  padding: '$3',
  borderRadius: '$3',
  zIndex: '$max',
  '&[data-state="open"]': {
    animationDuration: '0.3s',
    animation: `${scale._in} 0.25s ease-out forwards`,
  },
  '&[data-state="closed"]': {
    animationDuration: '0.15s',
    animation: `${fade._out} 0.15s ease-out forwards`,
  },
})
const Close = styled(Primitive.Close, {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
})
const Portal = styled(Primitive.Portal, {})
const Overlay = styled(Primitive.Overlay, {
  '&[data-state="open"]': {
    animationDuration: '0.3s',
    animation: `${fade._in} 0.25s ease-out forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${fade._out} 0.25s ease-out forwards`,
  },
  background: 'rgba(0 0 0 / 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'grid',
  placeItems: 'center',
  overflowY: 'hidden',
  overflowX: 'hidden',
})
const Title = styled(Primitive.Title, {})
const Description = styled(Primitive.Description, {})

interface Modal {
  Root: typeof Root
  Trigger: typeof Trigger
  Content: typeof Content
  Close: typeof Close
  Portal: typeof Portal
  Overlay: typeof Overlay
  Title: typeof Title
  Description: typeof Description
}

export const Modal: Modal = {
  Root,
  Trigger,
  Content,
  Close,
  Portal,
  Overlay,
  Title,
  Description,
}
