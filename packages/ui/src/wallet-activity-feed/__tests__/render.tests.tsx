import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { WalletActivityFeed } from '../WalletActivityFeed'

describe(WalletActivityFeed, () => {
  test('should render without issue', () => {
    render(<WalletActivityFeed />)

    expect(true).toBeTruthy()
  })
})
