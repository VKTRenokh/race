import { defineStore } from 'pinia'

export const useGarageStore = defineStore('garage', () => {
  const log = () => console.log('hello')

  return { log }
})
