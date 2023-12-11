import React from 'react'

export default function ChangePostition() {
  return (
    <form className="flex w-full justify-start items-end gap-8">
      <aside className="flex">
        <input
          type="radio"
          id="defaultUser"
          name="userPosition"
          value="defaultUser"
        />
        <label htmlFor="defaultUser">Usuário Padrão</label>
      </aside>
      <aside className="flex">
        <input
          type="radio"
          id="professionalUser"
          name="userPosition"
          value="professionalUser"
        />
        <label htmlFor="defaultUser">Usuário Profissional</label>
      </aside>
      <aside className="flex">
        <input
          type="radio"
          id="defaultUser"
          name="userPosition"
          value="defaultUser"
        />
        <label htmlFor="defaultUser">Conta de escritório</label>
      </aside>
    </form>
  )
}
