import React from 'react'
import { useTheme } from '../theme'

export const ColorPrinter = () => {
  const { theme } = useTheme()

  if (!theme.colors) return null

  return (
    <>
      {Object.keys(theme.colors).map((color) => (
        <span key={color}>
          {color}: {theme.colors![color]}
        </span>
      ))}
    </>
  )
}
