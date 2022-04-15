import React from 'react'
import cx from 'classnames'
import { Dots } from 'react-activity'

enum ButtonTypes {
  'button',
  'submit',
  'reset',
  undefined,
}

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  loading?: boolean
  onClick?: (a: any) => void
  disabled?: boolean
  type?: ButtonTypes
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const defaultStyles = React.useRef({ minWidth: 64 }).current
  const buttonType = props.type || 'submit'
  return (
    <button
      type={buttonType}
      style={defaultStyles}
      className={cx(
        'inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        {
          disabled: props.disabled,
        },
      )}
      onClick={props.onClick}
      {...props}
    >
      {props.loading ? (
        <Dots speed={1.25} color="#dadaff" animating={props.loading} size={13} />
      ) : (
        children
      )}
    </button>
  )
}
