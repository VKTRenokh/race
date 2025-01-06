import type { MandeInstance } from 'mande'
import { totalCount } from '../constants/total-count'

export interface Paginated<T> {
  total: number
  data: T[]
}

export const createPagination =
  <T>(mande: MandeInstance) =>
  async (
    page: number,
    limit: number
  ): Promise<Paginated<T[]>> => {
    const response = await mande.get<T[], 'response'>({
      responseAs: 'response',
      query: { _page: page, _limit: limit }
    })

    const total = +(response.headers.get(totalCount) ?? 0)

    const data = await response.json()

    return {
      data,
      total
    }
  }
