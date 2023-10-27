/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

import { checkIfAuthorized } from '@/lib/auth/actions'
import { $Enums } from '@prisma/client'

export default async function Dashboard() {
  if (await checkIfAuthorized($Enums.Positions.Admin)) {
    return <main>Dashboard</main>
  }

  return <h1>Not permitted </h1>
}
