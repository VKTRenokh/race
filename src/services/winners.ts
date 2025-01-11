import type {
  CreateWinnerDto,
  WinnerCar
} from '@/types/winners'
import { baseUrl } from '@/utils/base-url'
import { createPagination } from '@/utils/create-pagination'
import { mande } from 'mande'
import { getCar } from './garage'
import type { Paginated } from '@/utils/create-pagination'

export const winners = mande(baseUrl('/winners'))

const paginateWinners =
  createPagination<CreateWinnerDto>(winners)

const mergeWinner = async (
  winner: CreateWinnerDto
): Promise<WinnerCar> => {
  const car = await getCar(winner.id)

  return { ...winner, ...car }
}

export const paginateWinnerCars = async (
  page: number,
  limit: number
): Promise<Paginated<WinnerCar>> => {
  const winners = await paginateWinners(page, limit)

  const cars = await Promise.all(
    winners.data.map(mergeWinner)
  )

  return { total: winners.total, data: cars }
}

export const getWinner = (id: number) =>
  winners.get<CreateWinnerDto>(`/${id}`)

export const updateWinner = async (
  id: number,
  time: number
) => {
  const winner = await getWinner(id)

  return winners.put(`/${id}`, {
    wins: winner.wins + 1,
    time
  })
}
