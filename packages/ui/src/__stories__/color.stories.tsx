import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { defaultTheme } from '../stitches.config'
import { Grid, Flex, Box } from '../layout'
import { Text } from '../text'

const ColorScaleSwatches = () => {
  const baseColorNames = Object.keys(defaultTheme.colors)
  // const darkColorNames = Object.keys(baseColors)

  return (
    <Grid align="center" gapY="3" gapX="4" columns="12" css={{ paddingBlock: '$3' }}>
      {baseColorNames.map((color) => {
        const [identifier, scaleStep] = color.match(/[a-z]+|[^a-z]+/gi) || []

        return (
          <Flex
            key={color}
            direction="column"
            css={{
              position: 'relative',
              width: 64,
              height: 80,
            }}
          >
            <Box
              css={{
                borderRadius: '$2',
                width: '100%',
                height: '100%',
                backgroundColor: `$${color}`,
                mb: '$1',
              }}
            />
            <Text size="1" css={{ textAlign: 'center', fontWeight: 500 }} color="black">
              {identifier}
              {/* {scaleStep} */}
            </Text>
          </Flex>
        )
      })}
    </Grid>
  )
}

export default {
  title: 'Design System/Colors',
  component: ColorScaleSwatches,
  argTypes: {
    ref: { table: { disable: true } },
  },
} as ComponentMeta<typeof ColorScaleSwatches>

export const Overview: ComponentStory<typeof ColorScaleSwatches> = () => <ColorScaleSwatches />

Overview.parameters = {
  docs: {
    // page:
    //   'https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#use-cases',
    source: {
      code: 'Your code snippet goes here.',
      language: 'jsx',
      type: 'auto',
    },
  },
}
