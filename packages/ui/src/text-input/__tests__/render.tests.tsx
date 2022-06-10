import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TextInput } from '../TextInput'

describe(TextInput, () => {
  test('should render without issue', () => {
    render(<TextInput />)

    expect(true).toBeTruthy()
  })
})
