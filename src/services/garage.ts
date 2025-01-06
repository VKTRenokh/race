import { type Car } from '@/types/car'
import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'

// TODO: Move this into separate file
export interface PaginationResponse {
  total: number
  cars: Car[]
}

export const garage = mande(baseUrl('/garage'))

const totalCarsHeaderKey = 'X-Total-Count'

export const paginateCars = async (
  page: number,
  perPage: number
): Promise<PaginationResponse> => {
  const response = await garage.get<Car[], 'response'>({
    responseAs: 'response',
    query: {
      _page: page,
      _limit: perPage
    }
  })

  const cars = await response.json()

  const total = +(
    response.headers.get(totalCarsHeaderKey) ?? 0
  )

  return {
    cars,
    total
  }
}

export const getCar = (id: number) =>
  garage.get<Car>(`/${id}`)
