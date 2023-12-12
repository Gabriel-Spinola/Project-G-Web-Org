'use client'

import { updateUserInfo } from '@/app/(client)/profile/_actions'
import EditableAvatar from '@/app/(client)/profile/components/EditableAvatar'
import { UserData } from '@/lib/types/common'
import { getProfilePicURL } from '@/lib/uiHelpers/profilePicActions'
import { User } from '@prisma/client'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'

interface Params {
  user: Partial<UserData> | null
}

export default function UpdateNameImage({ user }: Params) {
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
      className="flex flex-col gap-8 justify-end items-end"
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <label htmlFor="name-conent-input" className="text-xl">
            Nome:
          </label>
          <textarea
            id="name"
            defaultValue={user?.name}
            rows={1}
            cols={30}
            className="resize-none h-full justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <EditableAvatar
          profileId={user?.id as string}
          profilePicUrl={
            getProfilePicURL({
              profilePic: user?.profilePic as string | null,
              image: user?.image as string | null,
            }) ?? ''
          }
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-medium-primary text-darker-white rounded-md hover:brightness-75"
      >
        {isLoading ? 'Enviando...' : 'Salvar'}
      </button>
    </form>
  )
}
