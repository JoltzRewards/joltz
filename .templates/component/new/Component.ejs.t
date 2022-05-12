---
to: <%= h.paths.components %>/<%= h.kebobCase(name) %>/<%= h.componentCase(name) %>.tsx
---
import { styled } from '../stitches.config'

type <%= h.componentCase(name) %>Props = {}

export const <%= h.componentCase(name) %> = styled('div', {
  /*
   * # https://stitches.dev/docs/styling#base-styles
   * # backgroundColor: '$primary',
   * # color: '$hiContrast'
   */
})
