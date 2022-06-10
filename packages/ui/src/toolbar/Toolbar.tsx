import * as Primitive from '@radix-ui/react-toolbar'
import { Button as LibButton } from '..'

import { styled } from '../stitches.config'

const baseStyles = {
  all: 'unset',
  flex: '0 0 auto',
  height: '$2',
  padding: '0 5px',
  borderRadius: 4,
  display: 'inline-flex',
  fontSize: 13,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

const Root = styled(Primitive.Root, {
  display: 'flex',
  padding: '$2',
  width: '100%',
  minWidth: 'max-content',
  borderRadius: '$2',
  backgroundColor: 'white',
  bs: `0 0 10px 10px $shadowLight`,
})

const baseButtonStyles = {
  ...baseStyles,
  fill: '$hiContrast',
  p: '$2',
  color: '$hiContrast',
  '&:hover': {
    backgroundColor: '$slate3',
    color: '$slate11',
  },
  '&:focus': {
    position: 'relative',
    bs: '0 0 0 2px $violet6',
  },
}

const Button = styled(LibButton, baseButtonStyles)

const Link = styled(Primitive.Link, {
  textDecoration: 'underline',
  color: 'purple',
  fontWeight: 'bold',
})

const Separator = styled(Primitive.Separator, {
  ...baseStyles,
  background: '$primary',
  borderColor: '$primary',
  width: '500px',
  height: '100%',
})
const ToggleGroup = styled(Primitive.ToggleGroup, {})
const ToggleItem = styled(Primitive.ToggleItem, baseButtonStyles)

interface Toolbar {
  Root: typeof Root
  Button: typeof Button
  Link: typeof Link
  Separator: typeof Separator
  ToggleGroup: typeof ToggleGroup
  ToggleItem: typeof ToggleItem
}

export const Toolbar: Toolbar = {
  Root,
  Button,
  Link,
  Separator,
  ToggleGroup,
  ToggleItem,
}
