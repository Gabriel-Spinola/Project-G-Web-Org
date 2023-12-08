import StaticImage from '@/components/Image'

export default function AuthPagesLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-w-full flex max-w-full h-[calc(100vh-88px)] mt-[88px] items-center justify-center bg-darker-white">
      <StaticImage
        className="absolute w-full h-full object-cover"
        url="/assets/explore/photo-1591874204276-1ebd20fb8db6.webp"
        alt="imagem"
        fill={true}
      />

      {children}
    </main>
  )
}
