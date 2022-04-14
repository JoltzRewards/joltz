import * as React from 'react'

export const Button: React.FC<{
  children?: React.ReactNode
  onClick: (e: any) => void
}> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>
}
