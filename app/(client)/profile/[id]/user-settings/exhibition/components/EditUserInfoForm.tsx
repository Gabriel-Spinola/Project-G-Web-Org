'use client'

import { UserData } from '@/lib/types/common'
import UserInfoPreview from './UserInfoPreview'
import { FormEvent, useState } from 'react'
import { User } from '@prisma/client'
import { updateUserInfo } from '@/app/(client)/profile/_actions'
import { toast } from 'react-toastify'

interface Params {
  user: Partial<UserData> | null
}

export function EditUserInfoForm({ user }: Params) {
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
    <article className="w-full p-4 lg:p-8 flex justify-between gap-8">
      <form
        onSubmit={handleFormSubmission}
        className="flex flex-col w-full gap-8"
      >
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Área:
          </label>
          <textarea
            id="area"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Localização:
          </label>
          <textarea
            id="lcation"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <div className="w-full h-[2px] bg-medium-gray/75 rounded-xl" />
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Linkedin:
          </label>
          <textarea
            id="linkedin"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Site:
          </label>
          <textarea
            id="site"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Email:
          </label>
          <textarea
            id="email"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="name-conent-input" className="text-xl">
            Telefone:
          </label>
          <textarea
            id="phone"
            rows={1}
            cols={30}
            className="resize-none justify-center text-2xl px-4 py-2 rounded-t-md border-b-2 border-medium-primary"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-medium-primary text-darker-white rounded-md hover:brightness-75"
        >
          {isLoading ? 'Enviando...' : 'Salvar'}
        </button>
      </form>
      <UserInfoPreview
        params={{
          description: '',
          title: '',
          location: '',
          linkedin: '',
          site: '',
          email: '',
          collegeImg:
            'https://drupalprodblob.blob.core.windows.net/stanford/branding/stanford-university-logo_1.png',
        }}
      />
    </article>
  )
}
