---
to: <%= h.paths.components %>/<%= h.kebobCase(name) %>/__tests__/render.tests.tsx
---
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { <%= h.componentCase(name) %> } from '../<%= h.componentCase(name) %>'

describe(<%= h.componentCase(name) %>, () => {
  test('should render without issue', () => {
    render(<<%= h.componentCase(name) %> />)

    expect(true).toBeTruthy()
  })
})
