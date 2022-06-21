// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'
import Highlight from '@site/src/components/Highlight'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "highlight" tag to our <Highlight /> component!
  // `Highlight` will receive all props that were passed to `highlight` in MDX
  highlight: Highlight,
  pre: ({ children, theme, showLineNumbers }) => (
    <Pre theme={theme} showLineNumbers={showLineNumbers}>
      {children}
    </Pre>
  ),
  code: ({ children, id, collapsible }) => {
    const isCollapsible = typeof collapsible !== 'undefined'
    const [isOpen, setIsOpen] = React.useState(!isCollapsible)
    const content = <code children={children} id={id} />
    return isCollapsible ? (
      <Collapsible.Root defaultOpen={isOpen} onOpenChange={(newOpen) => setIsOpen(newOpen)}>
        <Collapsible.Button>{isOpen ? 'Hide' : 'Show'} code</Collapsible.Button>
        <Collapsible.Content>{content}</Collapsible.Content>
      </Collapsible.Root>
    ) : (
      content
    )
  },
  RegisterLink: ({ id, index, href }) => {
    const isExternal = href.startsWith('http')

    React.useEffect(() => {
      const codeBlock = document.getElementById(id)
      if (!codeBlock) return

      const allHighlightWords = codeBlock.querySelectorAll('.highlight-word')
      const target = allHighlightWords[index - 1]
      if (!target) return

      target.replaceWith(
        Object.assign(document.createElement('a'), {
          href,
          innerHTML: target.innerHTML,
          className: target.className,
          ...(isExternal ? { target: '_blank', rel: 'noopener' } : {}),
        }),
      )
    }, [])

    return null
  },
  H: ({ id, index, ...props }) => {
    const triggerRef = React.useRef < HTMLElement > null

    React.useEffect(() => {
      const trigger = triggerRef.current

      const codeBlock = document.getElementById(id)
      if (!codeBlock) return

      const allHighlightWords = codeBlock.querySelectorAll('.highlight-word')
      const targetIndex = rangeParser(index).map((i) => i - 1)
      if (Math.max(...targetIndex) >= allHighlightWords.length) return

      const addClass = () => targetIndex.forEach((i) => allHighlightWords[i].classList.add('on'))
      const removeClass = () =>
        targetIndex.forEach((i) => allHighlightWords[i].classList.remove('on'))

      trigger.addEventListener('mouseenter', addClass)
      trigger.addEventListener('mouseleave', removeClass)

      return () => {
        trigger.removeEventListener('mouseenter', addClass)
        trigger.removeEventListener('mouseleave', removeClass)
      }
    }, [])

    return <code ref={triggerRef} {...props} />
  },
}
