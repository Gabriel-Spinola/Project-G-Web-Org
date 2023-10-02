import { Post } from '@prisma/client'

/**
 * @template DataType - The type of data that the response can hold.
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
 * @author Gabriel Spinola
 */
export type ESResponse<DataType> =
  | {
      data: DataType
      error: null
    }
  | {
      data: null
      error: string
    }

/**
 * @summary Describes the content of a Post including its author data.
 */
export type FullPost = {
  author: {
    name: string | null
    title: string | null
    location: string | null
  } | null
} & Post
