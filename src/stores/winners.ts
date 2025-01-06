import { winners } from '@/services/winners'
import type { CreateWinnerDto } from '@/types/winners'
import { defineStore } from 'pinia'

export const useWinnersStore = defineStore(
  'winners',
  () => {
    const add = (dto: CreateWinnerDto) => winners.post(dto)

    const loadWinners = () => winners.get()

    return { add, loadWinners }
  }
)
