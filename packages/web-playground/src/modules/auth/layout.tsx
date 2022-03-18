import { Flex } from '@stacks/ui'
import { Outlet } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <Flex
      width="100%"
      height="300px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="mx-auto my-auto"
    >
      <Outlet />
    </Flex>
  )
}
