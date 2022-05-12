import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Tooltip } from '../Tooltip'

describe(Tooltip, () => {
  test('should render without issue', () => {
    render(<Tooltip />)

    expect(true).toBeTruthy()
  })
})
