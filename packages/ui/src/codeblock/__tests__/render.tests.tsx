import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Codeblock } from '../Codeblock'

describe(Codeblock, () => {
  test('should render without issue', () => {
    render(<Codeblock />)

    expect(true).toBeTruthy()
  })
})
