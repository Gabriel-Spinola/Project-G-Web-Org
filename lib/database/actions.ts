/** !SECTION
 * Helpful functions for database actions
 */

import { ModelsApiCode } from './table.types'

const apiEndpoints = {
  services: {
    findUnique: '/api/services/find-unique/',
    findMany: '/api/services/',
  },
  handlers: {
    createProject: '/api/handlers/CreateProjectFormHandler/',
  },
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
): Promise<Response> {
  return await fetch(
    `${apiEndpoints.services.findUnique}?id=${rowID}&modelCode=${modelCode}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
): Promise<Response> {
  // If id is true then we're updating the project
  const url = id
    ? `${apiEndpoints.handlers.createProject}?id=${id}`
    : apiEndpoints.handlers.createProject

  // 'Put': Database updating
  // 'Post: Database inserting
  return await fetch(url, {
    method: id ? 'PUT' : 'POST',
    body: formData,
  })
}

export type ResponseError = {
  data: {
    errorType: string
    error: unknown
  }
}

export type ResponseData = {
  data: any
}

export async function tryGetUserDataFromApi(
  id: string,
): Promise<ResponseData | ResponseError> {
  try {
    const response = await fetch(
      `http://localhost:3000${apiEndpoints.services.findUnique}?id=${id}&modelCode=${ModelsApiCode.User}`,
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
        error,
      },
    }
  }
}
