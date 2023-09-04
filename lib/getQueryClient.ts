/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

// LINK: https://github.com/wpcodevo/nextjs13-react-query/blob/main/src/utils/getQueryClient.ts

import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
