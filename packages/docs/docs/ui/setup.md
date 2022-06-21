---
id: setup
title: Setup & Configuration
description: Setup the providers and configure your theme
---

## Install Library

```bash npm2yarn
npm install @trubittech/ui
```

## Install Needed Dependencies

```bash npm2yarn
npm install react react-dom
```

---

## Add ThemeProvider

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

1. Import UIProvider from '@trubittech/ui'
2. Wrap the root of your application with it
3. Create a theme object and pass it to the provider
