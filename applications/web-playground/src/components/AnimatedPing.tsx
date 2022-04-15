import cx from 'classnames'

export const AnimatedPing: React.FC<{
  className?: string
  animating?: boolean
  size?: string
  color?: string
}> = ({ animating, className, ...props }) => {
  const size = props.size || 2.5
  const sizeClasses = `w-${size} h-${size}`
  const color = props.color || 'green-400'
  const colorClass = `bg-${color}`

  return (
    <>
      <span
        className={cx(
          sizeClasses,
          colorClass,
          'absolute bottom-0.5 right-0.5 block rounded-full ring-2 ring-white',
          {
            'animate-ping': animating,
          },
        )}
      />
      <span
        className={cx(
          sizeClasses,
          colorClass,
          'absolute bottom-0.5 right-0.5 block rounded-full ring-3 ring-white',
        )}
      />
    </>
  )
}
