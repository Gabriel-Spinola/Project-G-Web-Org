/**
 * @author Gabriel Spinola Mendes da Silva | gabrielspinola77@gmail.com
 * @author Lucas Vinicius Pereira Martis | lucasvinipessoal@gmail.com
 *
 * @project Project G
 * @version main-release
 * @license i.e. MIT
 */

/** SECTION
 * Helpful functions for database actions
 */

import { API_ENDPOINTS, API_URL } from '../apiConfig'

export type ResponseError = {
  data: {
    errorType: string
    error: unknown
  }
}

export type ResponseData = {
  data: unknown
}

/**
 * @returns A response from a database action (i.e. the new data if response ok), this response contains not only the row data,
 * but also fetch information
 */
export async function createNewProjectApiCall(
  id: string | null,
  formData: FormData,
): Promise<Response | null> {
  try {
    // If id is true then we're updating the project
    const url = id
      ? `${API_URL}${API_ENDPOINTS.handlers.createProject}?id=${id}`
      : `${API_URL}${API_ENDPOINTS.handlers.createProject}`

    // 'Put': Database updating
    // 'Post: Database inserting
    return await fetch(url, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'X-API-Key': process.env.API_SECRET as string,
      },
      body: formData,
      cache: 'no-cache',
    })
  } catch (error: unknown) {
    return null
  }
}
