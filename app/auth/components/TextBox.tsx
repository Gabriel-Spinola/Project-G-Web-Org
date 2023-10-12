import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string
  htmlForId?: string
  error?: string
  children?: React.ReactNode
}

const TextBox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      children,
      labelText,
      type = 'text',
      htmlForId,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className + ' relative'}>
        {labelText && (
          <label
            className="block text-medium-white  mb-2 text-xs lg:text-sm x1:text-xl underline underline-offset-4"
            htmlFor={htmlForId}
          >
            {labelText}
          </label>
        )}
        <div className="flex w-full">
          <input
            autoComplete="off"
            name={htmlForId}
            className={`border border-slate-400 disabled:border-slate-100 w-full block outline-none py-4 px-2 transition-all text-xs lg:text-sm x1:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500
              ${error && 'border-red-500 border  animate-shake'} ${
                children ? 'rounded-r-md' : 'rounded-md'
              }`}
            {...props}
            ref={ref}
            type={type}
          ></input>

          <div className="flex">{children}</div>
        </div>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </div>
    )
  },
)

TextBox.displayName = 'TextBox'
export default TextBox
