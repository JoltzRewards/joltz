import {
  Button as TButton,
  Root as TRoot,
  Separator as TSeparator,
  ToggleGroup as TToggleGroup,
  ToggleItem as TToggleItem,
  Link as TLink,
} from '@radix-ui/react-toolbar'

import { styled } from '../theming'

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
  // '&:hover': { backgroundColor: violet.violet3, color: violet.violet11 },
  // '&:focus': { position: 'relative', boxShadow: `0 0 0 2px ${violet.violet7}` },
}

const Root = styled(TRoot, {
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
  // backgroundColor: '$canvas',
  // color: '$hiContrast',
  // py: '$1',
  // px: '$3',
  // transition: 'all 0.15s ease-in-out',
  // '&:hover': {
  //   transition: 'all 0.2s ease-in-out',
  //   backgroundColor: '$whiteA10',
  // },
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

const Button = styled(TButton, baseButtonStyles)

const Link = styled(TLink, {
  textDecoration: 'underline',
  color: '$purple3',
  fontWeight: 'bold',
})

const Separator = styled(TSeparator, {
  ...baseStyles,
  background: '$slate12',
  borderColor: '$slate12',
  width: '500px',
  height: '100%',
})
const ToggleGroup = styled(TToggleGroup, {})
const ToggleItem = styled(TToggleItem, baseButtonStyles)

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
