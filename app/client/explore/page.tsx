/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */
import UpperSection from '@/components/Explore/UpperSection'

export default async function ExplorePage() {
  return (
    <main className="flex min-h-screen max-h-screen justify-around flex-col bg-darker-white">
      <section className="flex flex-col">
        <UpperSection />
      </section>
    </main>
  )
}
