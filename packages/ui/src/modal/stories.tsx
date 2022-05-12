import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Modal, ModalProps } from './Modal'
import { STATUS_BADGES } from '../../.storybook'

export default {
  title: 'Modal',
  component: Modal.Root,
  argTypes: {
    ref: { table: { disable: true } },
  },
} as ComponentMeta<any>

export const Overview: ComponentStory<any> = (args) => (
  <Modal.Root>
    <Modal.Trigger />
    <Modal.Portal>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Close>X</Modal.Close>
        <Modal.Title>Modal Testing</Modal.Title>
        <Modal.Description>Modal Testing</Modal.Description>
      </Modal.Content>
    </Modal.Portal>
  </Modal.Root>
)

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
  docs: {
    page: null,
    source: {
      code: 'Your code snippet goes here.',
      language: 'jsx',
      type: 'auto',
    },
  },
}
