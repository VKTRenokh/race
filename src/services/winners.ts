import type { CreateWinnerDto } from '@/types/winners'
import { baseUrl } from '@/utils/base-url'
import { createPagination } from '@/utils/create-pagination'
import { mande } from 'mande'

export const winners = mande(baseUrl('/winners'))

const paginateWinners =
  createPagination<CreateWinnerDto>(winners)

const paginateWinnerCars = async (
  page: number,
  limit: number
) => {
  const winners = await paginateWinners(page, limit)
}
