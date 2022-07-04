---
id: setup
title: Setup
slug: /
description: Setup the providers and configure your theme
---

## Install Library

```bash npm2yarn
npm install @trubittech/ui
```

## Install Needed encies

```bash npm2yarn
npm install react react-dom
```

---

## Setup ThemeProvider

:::info `ThemeProvider` takes a set of optional theme overrides via the `theme` prop.

[Configuring Themes](/getting-started/theming)
:::

or rely on the minimal styles that ship with the library.

```tsx
import { ThemeProvider } from '@trubittech/ui'

const App = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="wrapper">{children}</div>
    </ThemeProvider>
  )
}
```
