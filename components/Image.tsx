import Image from 'next/image'

interface Params {
  url: string
  alt: string
  className?: string
}

export default function StaticImage(params: Params) {
  return (
    <Image
      className={params.className}
      src={params.url}
      alt={params.alt}
      loading="lazy"
      blurDataURL={params.url}
      placeholder="blur"
    />
  )
}
