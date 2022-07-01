/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['getting-started/setup', 'getting-started/custom-themes', 'getting-started/styling'],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Configuration',
      items: ['getting-started/theming'],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/button',
        'components/codeblock',
        'components/icon',
        {
          type: 'category',
          label: 'Layout',
          collapsed: true,
          items: ['components/layout/box', 'components/layout/flex', 'components/layout/grid'],
        },
        'components/popover',
        'components/text-input',
        'components/text',
        'components/tooltip',
      ],
      // items: [
      //   {
      //     type: 'category',
      //     label: 'Primitives',
      //     collapsed: false,
      //     collapsible: true,
      //     items: [
      //       'components/button',
      //       'components/codeblock',
      //       'components/icon',
      //       {
      //         type: 'category',
      //         label: 'Layout',
      //         collapsed: true,
      //         items: ['components/layout/box', 'components/layout/flex', 'components/layout/grid'],
      //       },
      //       'components/popover',
      //       'components/text-input',
      //       'components/text',
      //       'components/tooltip',
      //     ],
      //   },
      //   // {
      //   //   type: 'category',
      //   //   label: 'Other',
      //   //   items: ['ui/components/stx-address-input', 'ui/components/wallet-activity-feed'],
      //   // },
      // ],
    },
  ],
}

module.exports = sidebars
