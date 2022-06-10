import React from 'react'
import { Flex } from '../../src/layout'

export const StoryWrapper = (storyFn: any, props: any) => {
  // return storyFn()
  return (
    <Flex align="center" justify="center" {...props} css={{ p: '$3' }}>
      {storyFn()}
    </Flex>
  )
}
