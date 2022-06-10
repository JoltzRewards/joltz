import { styled } from '../stitches.config'
import React, { InputHTMLAttributes } from 'react'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

const Primitive = ({ onChange, value, ...props }: TextInputProps) => {
  return <input type="text" {...props} />
}

export const TextInput = styled(Primitive, {
  appearance: 'none',
  width: 'stretch',
  border: 'none',
  borderRadius: '$2',
  padding: '$3',
  fontSize: '$3',
  '&:focus': {
    borderColor: 'purple',
    outlineColor: '$primary',
  },
})
