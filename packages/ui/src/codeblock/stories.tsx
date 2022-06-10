import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CodeBlock } from './CodeBlock'
import { STATUS_BADGES } from '../../.storybook'
import { Flex } from '..'

export default {
  title: 'Primitives/CodeBlock',
  component: CodeBlock,
  argTypes: {
    ref: { table: { disable: false } },
    showLineNumbers: {
      control: 'boolean',
    },
    language: {
      options: ['ts', 'tsx', 'js', 'jsx', 'css'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof CodeBlock>

const storybookExample = `export default {
  title: 'Primitives/CodeBlock',
  component: CodeBlock,
  argTypes: {
    ref: { table: { disable: true } },
    showLineNumbers: {
      control: { type: 'checkbox' },
    },
    language: {
      options: ['ts', 'tsx', 'js', 'jsx', 'css'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof CodeBlock>`

const importExample = `import { Button, ThemeProvider } from '@trubittech/ui'`

const componentExample = `import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Text } from '../text'
import { Flex } from '../layout'
import { styled } from '../stitches.config'

type CodeBlockProps = Omit<SyntaxHighlighterProps, 'language'> & {
  language: 'ts' | 'tsx' | 'js' | 'jsx' | 'css'
  title?: string
}

const Pre = styled('pre', {
  width: '100% !important',
  height: '100%',
  borderRadius: '$3 !important',
  overflow: 'hidden !important',
})

const Code = styled('code', {
  width: '100%',
})

export const CodeBlock: React.FC<CodeBlockProps> = ({ value, title, language, ...props }) => {
  return (
    <Flex direction="column">
      {title ? (
        <Text size="3" css={{ fontWeight: '$bold' }}>
          {title}
        </Text>

      ) : null}
      <SyntaxHighlighter
        CodeTag={Code}
        PreTag={Pre}
        language={language}
        style={duotoneDark}
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </Flex>
  )
}`

export const Overview: ComponentStory<typeof CodeBlock> = () => (
  <Flex direction="column">
    <CodeBlock my={4} value={importExample} language="tsx" />
    <CodeBlock my={1} value={storybookExample} language="tsx" title="Storybook Example" />
    <CodeBlock my={1} value={componentExample} language="tsx" />
  </Flex>
)

Overview.parameters = {
  badges: [STATUS_BADGES.BETA],
}
