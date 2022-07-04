import React from 'react'

export const Highlight = ({ children }) => {
  return (
    <span
      style={{
        backgroundColor: '#FFA737',
        color: 'black',
        fontWeight: 500,
        padding: '0.05rem 0.25rem',
        borderRadius: 3,
      }}
    >
      {children}
    </span>
  )
}
