// LINK: https://github.com/wpcodevo/nextjs13-react-query/blob/main/src/utils/hydrate.client.tsx

'use client'

import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query'

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />
}

export default Hydrate
