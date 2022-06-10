import React from 'react'
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
  height: '100%',
  borderRadius: '$3 !important',
  // overflow: 'hidden !important',
  overflowX: 'scroll',
})

const Code = styled('code', {
  width: '80%',
  '@mdMax': {
    width: '100%',
  },
})

export const CodeBlock: React.FC<CodeBlockProps> = ({ value, title, language, ...props }) => {
  return (
    <Flex direction="column" {...props}>
      {title ? (
        <Text size="3" css={{ fontWeight: '$bold' }}>
          {title}
        </Text>
      ) : null}
      <SyntaxHighlighter
        startingLineNumber={1}
        lineNumberStyle={{ paddingRight: 16 }}
        CodeTag={Code}
        showLineNumbers
        PreTag={Pre}
        language={language}
        style={duotoneDark}
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </Flex>
  )
}
