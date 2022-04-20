import React from 'react'
import { Sentry } from 'react-activity'
import 'react-activity/dist/Sentry.css'
import { DocumentReportIcon } from '@heroicons/react/outline'
import cx from 'classnames'
import { NETWORK } from '../lib/constants'

type STXBlockHeightInputProps = {
  id: string
  onChange?: (s: string) => void
  initialValue?: string
  placeholder?: string
}

export const STXBlockHeightInput: React.FC<STXBlockHeightInputProps> = ({
  id,
  onChange,
  placeholder = '',
  ...props
}) => {
  const [value, setValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  // const [currentBlockHeight, setCurrentBlockHeight] = React.useState(null)

  React.useEffect(() => {
    async function fetchInfo() {
      const results = await fetch(NETWORK.getInfoUrl())

      // Useful for styling loading state
      await new Promise((resolve) => setTimeout(resolve, 2500))

      return results.json()
    }

    fetchInfo().then((response) => {
      setValue(response.stacks_tip_height)
    })
  }, [])

  React.useEffect(() => {
    if (value && value !== '') {
      setIsLoading(false)
    }
  }, [value])

  const handleOnChange = React.useCallback((e) => {
    setValue(e.target.value)
  }, [])

  return (
    <>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Sentry animating size={11} />
          ) : (
            <DocumentReportIcon className="h-5 w-5 text-gray-400" aria-hidden />
          )}
        </div>
        <input
          placeholder={placeholder}
          type="text"
          name={id}
          value={value}
          id={id}
          onChange={handleOnChange}
          disabled={isLoading}
          className={cx('block w-full pl-10 sm:text-sm border-gray-300 rounded-md', {
            'focus:ring-indigo-500 focus:border-indigo-500': true,
          })}
          aria-describedby="agreement-recipient"
        />
      </div>
    </>
  )
}
