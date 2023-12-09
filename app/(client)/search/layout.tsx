import Searchbar from '@/components/Searchbar'

export default function SearchPagesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="bg-darker-white min-h-[calc(100vh-88px)] mt-[88px]">
      <section className="w-full flex flex-col items-center justify-center p-8">
        <div className="w-[95%] md:w-[70%] x1:w-[50%] h-12">
          <Searchbar />
        </div>
        {children}
      </section>
    </main>
  )
}
