import { Toolbar, Icon } from '@trubittech/ui'

export const UIShowcase = () => {
  return (
    <Toolbar.Root>
      <Toolbar.ToggleGroup type="single">
        <Toolbar.ToggleItem value="normal">
          <Icon.FontFamilyIcon />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem value="bold">
          <Icon.FontBoldIcon />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator />
      <Toolbar.Button>
        <Icon.UploadIcon />
      </Toolbar.Button>
    </Toolbar.Root>
  )
}
