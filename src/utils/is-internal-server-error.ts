export const isInternalServerError = (
  value: unknown
): value is Error =>
  value instanceof Error &&
  value.message === 'Internal Server Error'
