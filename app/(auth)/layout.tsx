import Image from 'next/image'

export default function AuthPagesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-w-full flex max-w-full h-[calc(100vh-70px)] mt-[88px] items-center justify-center bg-darker-white">
      <Image
        className="absolute w-full h-full object-cover"
        src="/assets/explore/hin-bong-yeung-jF946mh5QrA-unsplash.jpg"
        alt="imagem"
        fill
      />

      {children}
    </main>
  )
}
