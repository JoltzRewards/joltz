import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Popover } from '../Popover'

describe(Popover, () => {
  test('should render without issue', () => {
    render(<Popover />)

    expect(true).toBeTruthy()
  })
})
