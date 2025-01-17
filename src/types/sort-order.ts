export type SortOrder = 'ASC' | 'DESC' | undefined

export const isSortOrder = (
  value: unknown
): value is SortOrder => value === 'ASC' || value === 'DESC'
