import type { Car } from '@/types/car'
import { baseUrl } from '@/utils/base-url'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGarageStore = defineStore('garage', () => {
  const cars = ref<Car[]>([])
  const error = ref<unknown>()

  const loadCars = () =>
    fetch(baseUrl('/garage'))
      .then(x => x.json())
      .then(console.log)

  return { loadCars, cars }
})
