import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="h-[calc(100vh-88px)] mt-[88px] bg-darker-white flex flex-col p-16 gap-16 items-center justify-center">
      <h2>
        <span className="text-xl">ERROR 404</span> - Not Found
      </h2>{' '}
      <p>Não foi possivel encontrar a página solicitada</p>{' '}
      <Link
        href="/"
        className="px-8 py-4 bg-medium-primary hover:brightness-75 rounded-lg text-base font-semibold"
      >
        Return Home
      </Link>{' '}
    </main>
  )
}
