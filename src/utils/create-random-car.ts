import type { CarDto } from '@/types/car'
import { randomCarName } from './random-car-name'
import { randomHexColor } from './random-hex-color'

export const createRandomCar = (): CarDto => ({
  name: randomCarName(),
  color: randomHexColor()
})
