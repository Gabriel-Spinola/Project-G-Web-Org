/**
 * @author Gabriel Spinola
 *
 * ES stands for error/success response,
 * meaning that: it either returns an error with data being null
 * or the other way around.
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
