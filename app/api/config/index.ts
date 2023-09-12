/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { NextResponse } from 'next/server'

export type PrismaData = Record<string, any> | null
export type APIErrorResponse = NextResponse<{ data: { error: string } }>
