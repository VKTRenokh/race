export interface Car {
  name: string
  color: string
  id: number
}

export type CarDto = Omit<Car, 'id'>
