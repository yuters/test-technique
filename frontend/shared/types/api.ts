export type ValidationErrors = Record<string, string[]>

export type ValidationErrorResponse = {
  data?: {
    errors?: ValidationErrors
    message?: string
  }
  errors?: ValidationErrors
  message?: string
}
