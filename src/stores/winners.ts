import { winnersAmountPerPage } from '@/constants/winners-amount-per-page'
import {
  paginateWinnerCars,
  winners as winnersApi
} from '@/services/winners'
import type {
  CreateWinnerDto,
  WinnerCar
} from '@/types/winners'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWinnersStore = defineStore(
  'winners',
  () => {
    const page = ref(0)
    const winners = ref<WinnerCar[]>([])

    // TODO: rename `CreateWinnerDto`
    const add = (dto: CreateWinnerDto) =>
      winnersApi.post(dto)

    const loadWinners = async () => {
      const response = await paginateWinnerCars(
        page.value,
        winnersAmountPerPage
      )

      winners.value = response.data
    }

    return { add, loadWinners, page }
  }
)
