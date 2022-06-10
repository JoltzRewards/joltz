import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { CodeBlock } from '../CodeBlock'

describe(CodeBlock, () => {
  test('should render without issue', () => {
    render(<CodeBlock />)

    expect(true).toBeTruthy()
  })
})
