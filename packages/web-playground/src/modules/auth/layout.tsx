import { Flex } from '@stacks/ui'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Outlet />
    </Flex>
  )
}
