import ExploreHighlight from './components/ExploreHighlights'

export default function BottomSection() {
  return (
    <section className="bg-darker-white min-w-full flex flex-col items-center">
      <h1 className="m-16 text-xl">VEJA O QUE ESTÁ EM ALTA</h1>
      <ExploreHighlight />
    </section>
  )
}
