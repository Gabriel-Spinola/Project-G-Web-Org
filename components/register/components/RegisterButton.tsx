import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function RegisterButton({ isVerified }: { isVerified: boolean }) {
  // NOTE - Gathers the current form status
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending || !isVerified}
      disabled={pending || !isVerified}
      style={{
        backgroundColor: `${pending ? '#ccc' : '#3446eb'}`,
        color: '#fff',
        padding: '1rem',
        cursor: 'pointer',
      }}
    >
      {pending ? 'Carregando' : 'Registrar'}
    </button>
  )
}
