'use client'

import { updateUserInfo } from '@/app/(client)/profile/_actions'
import { UserData } from '@/lib/types/common'
import { User } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface Params {
  user: UserData | null
}

export default function ChangePasswordForm({ user }: Params) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleFormSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newName = formData.get('name')?.toString()

    const newUserInfo: Partial<User> = {
      id: user?.id,
      name: newName,
    }

    setIsLoading(true)

    const { error } = await toast.promise(updateUserInfo(newUserInfo), {
      pending: 'Editando perfil',
    })

    setIsLoading(false)

    if (error) {
      toast.error('Falha ao atualizar suas informações 😔')

      return
    }

    toast.success('Suas informações foram atualizadas com sucesso! 👌')
  }

  return (
    <form
      onSubmit={handleFormSubmission}
      className="flex flex-col w-full justify-between items-end gap-8"
    >
      <h1 className="text-2xl w-full text-center">Trocar Senha</h1>
      <div className="flex w-full justify-between">
        <label htmlFor="name-conent-input" className="text-xl">
          Nova Senha:
        </label>
        <input
          id="area"
          type="email"
          className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
        />
      </div>
      <div className="flex w-full justify-between">
        <label htmlFor="name-conent-input" className="text-xl">
          Confirmar Nova Senha:
        </label>
        <input
          id="area"
          type="email"
          className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
        />
      </div>
      <div className="flex w-full justify-between">
        <label htmlFor="name-conent-input" className="text-xl">
          Senha atual:
        </label>
        <input
          id="area"
          type="password"
          className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-medium-primary w-[256px] text-darker-white rounded-md hover:brightness-75"
      >
        {isLoading ? 'Enviando...' : 'Salvar'}
      </button>
    </form>
  )
}
