import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { StxAddressInput } from '../StxAddressInput'

describe(StxAddressInput, () => {
  test('should render without issue', () => {
    render(<StxAddressInput />)

    expect(true).toBeTruthy()
  })
})
