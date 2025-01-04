import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'

export const garage = mande(baseUrl('/garage'))

export const paginateCars = (
  page: number,
  perPage: number
) => {
  garage.get({
    query: {
      _page: page,
      _limit: perPage
    }
  })
}
