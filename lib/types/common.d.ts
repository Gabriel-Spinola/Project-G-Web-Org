import { Comment, Like, Post, Project, User } from '@prisma/client'

/**
 * @template DataType - The type of data that the response holds.
 * @template CustomError - Optional custom implementation for errors. (if not defined = string)
 *
 * @description
 * The `ESResponse` type represents a common response pattern, where the response can either indicate success with valid data or failure with an error message. This pattern is denoted by "ES," which stands for Error/Success.
 *
 * @example
 * // With user data:
 * const response: ESResponse<UserData> = {
 *   data: {
 *     id: 1,
 *     name: "John Doe",
 *     email: "john@example.com"
 *   },
 *   error: null
 * };
 *
 * // With error message:
 * const errorResponse: ESResponse<UserData> = {
 *   data: null,
 *   error: "User not found"
 * };
 *
 * if (errorResponse.error) {
 *   return
 * }
 *
 * // With custom error implementation:
 * const customErrorResponse: ESResponse<UserData, CustomError> = {
 *  data: null,
 *  error: AnyCustomErrorImplementationYouMadeOrSomeoneMadeOrIDK()
 * }
 *
 * if (errorResponse.error) {
 *   return
 * }
 *
 * @author Gabriel Spinola
 */
export type ESResponse<DataType, CustomError = string | unknown> =
  | {
      data: DataType
      error: null
    }
  | {
      data: null
      error: CustomError
    }

export type PublicationAuthor = Pick<User, 'name' | 'image' | 'profilePic'>

export type UserData = Partial<User> & {
  _count: {
    followers: number
    following: number
  }
}

export type Likes = Pick<Like, 'id' | 'userId'>[]

export type PublicationComment = Comment & {
  author: PublicationAuthor
  replies: (Comment & {
    author: PublicationAuthor
  })[]
}

type TDisplayComment = Comment & {
  author: PublicationAuthor
  likes: Likes

  replies: (Comment & {
    author: PublicationAuthor
    likes: Likes
  })[]
}

/**
 * REVIEW - usage of _count for comments
 * @summary Describes the data that is recurrent in publications
 */
export type PublicationsDefaultData = {
  author: PublicationAuthor | null
  contributor: Pick<User, 'name'>[]
  comments: TDisplayComment[]
  likes: Likes
}

/**
 * @summary Describes the content of a Post including its author generic data.
 */
export type FullPost = Post & PublicationsDefaultData

/**
 * @summary Describes the content of a Project including its author generic data.
 */
export type FullProject = Project & PublicationsDefaultData
