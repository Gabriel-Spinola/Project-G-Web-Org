/** !SECTION
 * Helpful functions for database actions
 */

import { ModelsApiCode } from './table.types'

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
    `/api/services/find-unique/?id=${rowID}&modelCode=${modelCode}`,
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
    ? `/api/handlers/CreateProjectFormHandler/?id=${id}`
    : '/api/handlers/CreateProjectFormHandler/'

  // 'Put': Database updating
  // 'Post: Database inserting
  return await fetch(url, {
    method: id ? 'PUT' : 'POST',
    body: formData,
  })
}
