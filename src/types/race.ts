import type { Car } from './car'

export interface Race {
  isRacing: boolean
  controller?: AbortController
  finish: (car: Car, time: number) => void
}
