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

import { API_ENDPOINTS, API_URL, ModelsApiCode } from '../apiConfig'

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
 * @param rowID A String storing the unique cuid of the row
 * @param modelCode A unique string of numbers that store the model "id". i.e. "0": Project Model; "1": Post Model
 * @returns a response from database, this response contains not only the row data,
 * but also fetch information
 */
export async function getRowDataFromAPI(
  rowID: string,
  modelCode: ModelsApiCode,
  signal: AbortSignal | null | undefined = null,
): Promise<Response> {
  return await fetch(
    `${API_URL}${API_ENDPOINTS.services.findUnique}?id=${rowID}&modelCode=${modelCode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    },
  )
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
      body: formData,
      cache: 'no-cache',
    })
  } catch (error: unknown) {
    return null
  }
}

export async function tryGetUserDataFromApi(
  id: string,
): Promise<ResponseData | ResponseError> {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS.services.findUnique}?id=${id}&modelCode=${ModelsApiCode.User}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Response in not OK ${response.json()}`)
    }

    return response.json()
  } catch (error: unknown) {
    return {
      data: {
        errorType: 'Failed to get response',
        error: process.env.NODE_ENV === 'development' ? error : '',
      },
    }
  }
}
