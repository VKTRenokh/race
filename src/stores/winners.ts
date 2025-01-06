import { winners } from '@/services/winners'
import { getCar } from '@/services/garage'
import type { CreateWinnerDto } from '@/types/winners'
import { defineStore } from 'pinia'

export const useWinnersStore = defineStore(
  'winners',
  () => {
    const add = (dto: CreateWinnerDto) => winners.post(dto)

    // TODO: rename `CreateWinnerDto`
    const loadWinners = async () => {
      const data = await winners.get<CreateWinnerDto[]>()

      const fullData = await Promise.all(
        data.map(async winner => {
          const car = await getCar(winner.id)

          return { ...winner, ...car }
        })
      )

      return fullData
    }

    return { add, loadWinners }
  }
)
