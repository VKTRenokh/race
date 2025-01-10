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
    const data = ref<WinnerCar[]>([])

    const loadWinners = async () => {
      const response = await paginateWinnerCars(
        page.value,
        winnersAmountPerPage
      )

      data.value = response.data
    }

    const add = (dto: CreateWinnerDto) =>
      winnersApi.post(dto).then(loadWinners)

    return { add, loadWinners, page, data }
  }
)
