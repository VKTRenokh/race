import type { Car } from './car'

export interface CreateWinnerDto {
  id: number
  wins: number
  time: number
}

export type WinnerCar = CreateWinnerDto & Car
