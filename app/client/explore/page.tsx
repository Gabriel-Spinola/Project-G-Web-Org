/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import BottomSection from '@/components/Explore/BottomSection'
import UpperSection from '@/components/Explore/UpperSection'

export default async function ExplorePage() {
  return (
    <main className="flex flex-col bg-darker-white">
      <section className="flex align-top flex-col">
        <UpperSection />
        <BottomSection />
      </section>
    </main>
  )
}
