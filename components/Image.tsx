import Image from 'next/image'

interface Params {
  url: string
  alt: string
  className?: string
  fill?: boolean
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
      width={!params.fill ? 100 : undefined}
      height={!params.fill ? 100 : undefined}
      fill={params.fill}
      quality={100}
      style={{ objectFit: 'fill' }} // The point is right there!
    />
  )
}
