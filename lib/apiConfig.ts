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
    posts: 'api/services/posts/',
    users: 'api/services/users/',
    comments: 'api/services/comments/',
    findUnique: 'api/services/find-unique/',
    findMany: 'api/services/find-many/',
  },
  handlers: {
    createProject: 'api/handlers/CreateProjectFormHandler/',
    updateUser: 'api/handlers/update-user/',
  },
}

export const SUPABASE_STORAGE_URL = `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://projectg2.vercel.app/'

export type APIResponse = Promise<
  | {
      data: string
      error: null
    }
  | {
      data: null
      error: string
    }
>
