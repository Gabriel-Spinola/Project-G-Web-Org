import { prisma } from '@/lib/database/prisma'
import { $Enums } from '@prisma/client'
import React from 'react'
import { FaBuilding, FaSuitcase, FaUser } from 'react-icons/fa'
import styles from './changePositions.module.scss'

type Props = { id: string; currentPosition: $Enums.Positions }

export default function ChangePosition({ id, currentPosition }: Props) {
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
    <form action={handleChange} className={styles.positionForm}>
      <aside className="flex gap-4">
        <label htmlFor="defaultUser">
          <input
            type="radio"
            id="defaultUser"
            name="userPosition"
            value={$Enums.Positions.DefaultUser}
            defaultChecked={currentPosition === $Enums.Positions.Office}
          />
          <FaUser />
        </label>
      </aside>

      <aside className="flex gap-4">
        <label htmlFor="defaultUser">
          <input
            type="radio"
            id="professionalUser"
            name="userPosition"
            value={$Enums.Positions.Professional}
            defaultChecked={currentPosition === $Enums.Positions.Office}
          />
          <FaSuitcase />
        </label>
      </aside>

      <aside className="flex gap-4">
        <label htmlFor="officeUser">
          <input
            type="radio"
            id="officeUser"
            name="userPosition"
            value={$Enums.Positions.Office}
            defaultChecked={currentPosition === $Enums.Positions.Office}
          />
          <FaBuilding />
        </label>
      </aside>
    </form>
  )
}
