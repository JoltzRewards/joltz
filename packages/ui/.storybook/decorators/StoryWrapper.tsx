import { Flex } from '../../src'

export const StoryWrapper = (storyFn, props) => {
  return (
    <Flex align="center" justify="center" {...props}>
      {storyFn()}
    </Flex>
  )
}
