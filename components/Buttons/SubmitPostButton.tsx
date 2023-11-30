import React from 'react'

export default function SubmitPostButton({
  isLoading,
}: {
  isLoading: boolean
}) {
  return (
    <div>
      <input
        disabled={isLoading}
        type="submit"
        className="p-2 w-[240px] rounded-sm cursor-pointer bg-darker-white text-medium-primary hover:bg-medium-primary hover:text-darker-white"
        value={isLoading ? 'Carregando...' : 'Enviar'}
      />
    </div>
  )
}
