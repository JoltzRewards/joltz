import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ButtonGroup } from '../ButtonGroup'

describe(ButtonGroup, () => {
  test('should render without issue', () => {
    render(<ButtonGroup />)

    expect(true).toBeTruthy()
  })
})
