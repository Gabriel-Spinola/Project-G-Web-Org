import Link from 'next/link'

export const RegisterButton = () => {
  return (
    <Link href="/auth/register/" style={{ marginRight: 10 }}>
      Register
    </Link>
  )
}
