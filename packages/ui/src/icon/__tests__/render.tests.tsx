import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Icon } from '../Icon'

describe('Icon', () => {
  test('should render without issue', () => {
    render(<Icon.AccessibilityIcon />)

    expect(true).toBeTruthy()
  })
})
