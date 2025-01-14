import { winnersAmountPerPage } from '@/constants/winners-amount-per-page'
import {
  paginateWinnerCars,
  updateWinner,
  winners as winnersApi
} from '@/services/winners'
import type {
  CreateWinnerDto,
  WinnerCar
} from '@/types/winners'
import { isInternalServerError } from '@/utils/is-internal-server-error'
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

      console.log(response.data)
      data.value = response.data
    }

    const ifExistsBranch =
      (dto: CreateWinnerDto) => (error: unknown) => {
        if (!isInternalServerError(error)) {
          return
        }

        return updateWinner(dto.id, dto.time)
      }

    const add = (dto: CreateWinnerDto) =>
      winnersApi
        .post(dto)
        .then(loadWinners)
        .catch(ifExistsBranch(dto))

    return { add, loadWinners, page, data }
  }
)
