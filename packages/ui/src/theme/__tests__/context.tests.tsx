import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ThemeProvider, ThemeProviderProps } from '../ThemeProvider'
import { ColorPrinter } from '../../__testing__'

const customRenderer = (
  ui: React.ReactNode,
  { providerProps, ...options }: { providerProps?: ThemeProviderProps } & Record<string, unknown>,
) => {
  return render(<ThemeProvider {...providerProps}>{ui}</ThemeProvider>, options)
}

describe('ThemeProvider', () => {
  test('should support taking theme via props', () => {
    const themeOverrides = {
      colors: {
        primary: '#000',
        secondary: '#ff0000',
      },
    }

    customRenderer(<ColorPrinter />, {
      providerProps: { theme: themeOverrides },
    })

    expect(screen.getByText(/^primary:/)).toHaveTextContent(themeOverrides.colors.primary)
    expect(screen.getByText(/^secondary:/)).toHaveTextContent(themeOverrides.colors.secondary)
  })
})
