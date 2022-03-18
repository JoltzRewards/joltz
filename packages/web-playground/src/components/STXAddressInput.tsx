import React from 'react'
import cx from 'classnames'
import { CheckIcon } from '@heroicons/react/outline'
import { validateStacksAddress } from '@stacks/transactions'

type STXAddressInputProps = {
  id: string
  onChange?: (s: string) => void
  required?: boolean
  valid?: boolean
  initialValue?: string
  placeholder?: string
}

export const STXAddressInput: React.FC<STXAddressInputProps> = ({
  id,
  valid = false,
  required = true,
  onChange,
  initialValue = '',
  placeholder = 'STX9822...',
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue)
  const [isValid, setIsValid] = React.useState(valid)

  React.useEffect(() => {
    if (initialValue) {
      try {
        const results = validateStacksAddress(initialValue)
        setIsValid(results)
      } catch (error) {
        setIsValid(false)
      }
    }
  }, [initialValue])

  const handleOnChange = React.useCallback(
    (e) => {
      setValue(e.target.value)

      try {
        const results = validateStacksAddress(e.target.value)

        setIsValid(results)
      } catch (error) {
        setIsValid(false)
      } finally {
        onChange && onChange(e.target.value)
      }
    },
    [onChange],
  )
  return (
    <>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          required={required}
          placeholder={placeholder}
          type="text"
          name={id}
          value={value}
          id={id}
          onChange={handleOnChange}
          className={cx(
            'block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md',
            {
              'focus:ring-indigo-500 focus:border-indigo-500': isValid,
              'focus:outline-none focus:ring-red-500 focus:border-red-500':
                // block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md
                !isValid && value,
            },
          )}
          aria-describedby="agreement-recipient"
        />
        {isValid && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckIcon aria-hidden className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      {!isValid && value && (
        <p className="mt-1 mb-0 text-sm text-red-600">
          Not a valid STX address
        </p>
      )}
    </>
  )
}
