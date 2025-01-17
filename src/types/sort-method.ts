export type SortMethod = 'id' | 'wins' | 'time' | undefined

export const isSortMethod = (
  value: unknown
): value is SortMethod =>
  value === 'id' ||
  value === 'wins' ||
  value == 'time' ||
  value === undefined
