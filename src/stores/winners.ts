import { winnersAmountPerPage } from '@/constants/winners-amount-per-page'
import {
  paginateWinnerCars,
  updateWinner,
  winners as winnersApi
} from '@/services/winners'
import type { SortMethod } from '@/types/sort-method'
import type { SortOrder } from '@/types/sort-order'
import type {
  CreateWinnerDto,
  WinnerCar
} from '@/types/winners'
import { isInternalServerError } from '@/utils/is-internal-server-error'
import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useWinnersStore = defineStore(
  'winners',
  () => {
    const page = ref(0)
    const data = ref<WinnerCar[]>([])

    const sortMethod = ref<SortMethod>()
    const sortOrder = ref<SortOrder>()

    const loadWinners = async () => {
      const response = await paginateWinnerCars(
        page.value,
        winnersAmountPerPage,
        { method: sortMethod.value, order: sortOrder.value }
      )

      data.value = response.data
    }

    const update =
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
        .catch(update(dto))

    const setSortMethod = async (value: SortMethod) => {
      sortMethod.value = value
      await loadWinners()
    }

    const setSortOrder = async (value: SortOrder) => {
      sortOrder.value = value
      await loadWinners()
    }

    return {
      add,
      loadWinners,
      page,
      data,
      sortMethod: readonly(sortMethod),
      sortOrder: readonly(sortOrder),
      setSortMethod,
      setSortOrder
    }
  }
)
