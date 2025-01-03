import type { Car } from './car'

export interface RaceInfo {
  isRacing: boolean
  controller?: AbortController
  finish: (car: Car) => void
}
