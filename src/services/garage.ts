import { type Car } from '@/types/car'
import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'
import { createPagination } from '@/utils/create-pagination'

// TODO: Move this into separate file
export interface PaginationResponse {
  total: number
  cars: Car[]
}

export const garage = mande(baseUrl('/garage'))

export const paginateCars = createPagination<Car>(garage)

export const getCar = (id: number) =>
  garage.get<Car>(`/${id}`)
