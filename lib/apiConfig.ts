/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */
export const API_ENDPOINTS = {
  services: {
    findUnique: 'api/services/find-unique/',
    findMany: 'api/services/find-many/',
  },
  handlers: {
    createProject: 'api/handlers/CreateProjectFormHandler/',
    updateUser: 'api/handlers/update-user/',
  },
}

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://projectg2.vercel.app/'
