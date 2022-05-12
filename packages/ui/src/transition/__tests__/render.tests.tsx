import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Transition } from '../Transition'

describe(Transition, () => {
  test('should render without issue', () => {
    render(<Transition />)

    expect(true).toBeTruthy()
  })
})
