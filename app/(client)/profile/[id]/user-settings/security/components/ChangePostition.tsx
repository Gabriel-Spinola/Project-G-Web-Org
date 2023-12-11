import { prisma } from '@/lib/database/prisma'
import { $Enums } from '@prisma/client'
import React from 'react'

type Props = { id: string }

export default function ChangePosition({ id }: Props) {
  async function handleChange(formData: FormData) {
    'use server'

    const userPos = formData.get('userPosition')?.toString()
    console.log(userPos)

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { position: userPos as $Enums.Positions },
      })

      console.log(updatedUser)
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <form
      action={handleChange}
      className="flex w-full justify-start items-end gap-8"
    >
      <div className="flex">
        <input
          type="radio"
          id="defaultUser"
          name="userPosition"
          value={$Enums.Positions.DefaultUser}
        />
        <label htmlFor="defaultUser">Usuário Padrão</label>
      </div>

      <div className="flex">
        <input
          type="radio"
          id="professionalUser"
          name="userPosition"
          value={$Enums.Positions.Professional}
        />
        <label htmlFor="defaultUser">Usuário Profissional</label>
      </div>

      <div className="flex">
        <input
          type="radio"
          id="office"
          name="userPosition"
          value={$Enums.Positions.Office}
        />
        <label htmlFor="defaultUser">Conta de escritório</label>
      </div>

      <input type="submit" value="submit" />
    </form>
  )
}
