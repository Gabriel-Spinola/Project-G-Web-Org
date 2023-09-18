/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import React from 'react'

// FIXME - This FormField implementation does not have the native input field props like (id, name, etc...).

type Props = {
  type?: string
  title: string
  state: string
  placeholder: string
  isTextArea?: boolean
  setState: (value: string) => void
}

function FormField({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  )
}

export default FormField
