import { Post, Project } from '@prisma/client'

/**
 * @template DataType - The type of data that the response can hold.
 * @template CustomError - Optional custom implementation for errors. (if not defined = string)
 *
 * @description
 * The `ESResponse` type represents a common response pattern, where the response can either indicate success with valid data or failure with an error message. This pattern is denoted by "ES," which stands for Error/Success.
 *
 * @example
 * // Example usage of ESResponse with user data:
 * const response: ESResponse<UserData> = {
 *   data: {
 *     id: 1,
 *     name: "John Doe",
 *     email: "john@example.com"
 *   },
 *   error: null
 * };
 *
 * // Example usage of ESResponse with an error message:
 * const errorResponse: ESResponse<UserData> = {
 *   data: null,
 *   error: "User not found"
 * };
 *
 * // With custom errors:
 * const customErrorResponse: ESResponse<UserData, CustomError> = {
 *  data: null,
 *  error: AnyCustomErrorImplementationYouMadeOrSomeoneMadeOrIDK()
 * }
 *
 * @author Gabriel Spinola
 */
export type ESResponse<DataType, CustomError = string> =
  | {
      data: DataType
      error: null
    }
  | {
      data: null
      error: CustomError
    }

/**
 * @summary Describes the data that is recurrent in publications
 */
export type PublicationsDefaultData = {
  author: {
    name: string | null
    title: string | null
    location: string | null
    profilePic: string | null
  } | null

  contributor: {
    name: string | null
  }[]

  likes: {
    id: number
    userId: string
  }[]

  comments: {
    id: number
  }[]
}

/**
 * @summary Describes the content of a Post including its author generic data.
 */
export type FullPost = Post & PublicationsDefaultData

/**
 * @summary Describes the content of a Project including its author generic data.
 */
export type FullProject = Project & PublicationsDefaultData
