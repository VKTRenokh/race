import {
  paginateWinnerCars,
  winners
} from '@/services/winners'
import type { CreateWinnerDto } from '@/types/winners'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWinnersStore = defineStore(
  'winners',
  () => {
    const page = ref(0)

    // TODO: rename `CreateWinnerDto`
    const add = (dto: CreateWinnerDto) => winners.post(dto)

    const loadWinners = async () =>
      paginateWinnerCars(page.value, 10)

    return { add, loadWinners, page }
  }
)
