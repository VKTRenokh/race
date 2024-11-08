export const selectRandom = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]
