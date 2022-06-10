import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Toolbar } from './Toolbar'
import { Icon } from '../icon'
import { Box } from '../layout'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/Toolbar',
  // component: Toolbar.Root,
  // subcomponents: [
  //   Toolbar.Button,
  //   Toolbar.Link,
  //   Toolbar.Root,
  //   Toolbar.Separator,
  //   Toolbar.ToggleGroup,
  //   Toolbar.ToggleItem,
  // ],
}

export const Showcase: ComponentStory<typeof Toolbar.Root> = () => (
  <Toolbar.Root>
    <Toolbar.ToggleGroup type="single">
      <Toolbar.ToggleItem value="normal">
        <Icon.FontFamilyIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem value="bold">
        <Icon.FontBoldIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem value="italic">
        <Icon.FontItalicIcon />
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem value="size">
        <Icon.FontSizeIcon />
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
    <Toolbar.Separator />
    <Box css={{ ml: 'auto' }}>
      <Toolbar.Link
        href="#"
        style={{ padding: '8px', color: '#0a0a0a', fontSize: 13, fontWeight: 500 }}
      >
        Documents
      </Toolbar.Link>
      <Toolbar.Button>
        <Icon.UploadIcon />
      </Toolbar.Button>
      <Toolbar.Button>
        <Icon.EnterFullScreenIcon />
      </Toolbar.Button>
    </Box>
  </Toolbar.Root>
)
