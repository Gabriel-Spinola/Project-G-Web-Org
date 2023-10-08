export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  variant?: 'primary' | 'success' | 'warning'
  square?: boolean
  paddingLess?: boolean
}
const Button = ({
  className,
  children,
  variant,
  square,
  paddingLess,
  type = 'button',
  ...props
}: IButtonProps) => {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-violet-500 hover:bg-violet-700 text-white'
      case 'success':
        return 'bg-green-500 hover:bg-green-700 text-white '
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-700 text-white '
      default:
        return 'bg-violet-500 hover:bg-violet-700 hover:bg-gra text-white shadow shadow-violet-600/25 hover:shadow-violet-600/75'
    }
  }
  return (
    <button
      {...props}
      type={type}
      className={`
        ${getVariant()}  transition duration-500  ${
          !paddingLess && 'py-2 px-4'
        }  ${!square && 'rounded-md'} active:scale-95 ${className} `}
    >
      {children}
    </button>
  )
}

export default Button
