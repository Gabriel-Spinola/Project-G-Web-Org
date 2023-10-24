/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import BottomSection from './components/BottomSection'
import UpperSection from './components/UpperSection'

export default function Explore() {
  return (
    <main className="flex flex-col bg-darker-white">
      <section className="flex align-top flex-col">
        <UpperSection />
        <BottomSection />
      </section>
    </main>
  )
}
