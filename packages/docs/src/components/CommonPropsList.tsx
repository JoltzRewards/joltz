import React from 'react'
// import { CSS } from '@trubittech/ui'

export const CommonPropsList = () => {
  return (
    <table
      style={{
        width: '100%',
        textAlign: 'left',
        borderCollapse: 'collapse',
        borderBottom: '1px solid hsl(0 0% 20.5%)',
        padding: '0.5rem',
      }}
    >
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>css</td>
          <td>
            <code>Stitches.CSS</code>
          </td>
          <td>undefined</td>
        </tr>
        <tr>
          <td>backgroundColor</td>
          <td>
            <code>{`Stitches.PropertyValue<'backgroundColor'>`}</code>
          </td>
          <td>undefined</td>
        </tr>
        <tr>
          <td>color</td>
          <td>
            <code>{`Stitches.PropertyValue<'color'>`}</code>
          </td>
          <td>undefined</td>
        </tr>
        <tr>
          <td>borderColor</td>
          <td>
            <code>{`Stitches.PropertyValue<'borderColor'>`}</code>
          </td>
          <td>undefined</td>
        </tr>
      </tbody>
    </table>
  )
}
