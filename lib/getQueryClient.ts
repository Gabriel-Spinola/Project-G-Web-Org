// LINK: https://github.com/wpcodevo/nextjs13-react-query/blob/main/src/utils/getQueryClient.ts

import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
