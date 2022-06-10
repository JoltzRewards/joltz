import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Popover } from './Popover'
import { STATUS_BADGES } from '../../.storybook'
import { Button } from '../button'
import { Icon } from '..'

export default {
  title: 'Primitives/Popover',
  component: Popover.Root,
  argTypes: {
    ref: { table: { disable: true } },
    variant: {
      options: [],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Popover.Root>

export const Overview: ComponentStory<typeof Popover.Root> = () => {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger
          css={{
            display: 'grid',
            justifyContent: 'center',
            backgroundColor: '$secondary',
            p: '$2',
            borderRadius: '$round',
          }}
        >
          <Icon.TrashIcon />
        </Popover.Trigger>
        <Popover.Content css={{ width: '30ch' }} sideOffset={3}>
          <p>Are you sure?</p>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
    </>
  )
}

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
