import Image from 'next/image'
import scssVariables from './styles/variables.module.scss'

console.log(scssVariables.primaryColor)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, World!</h1>
    </main>
  )
}
