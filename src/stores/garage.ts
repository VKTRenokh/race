import type { Car, CarDto } from '@/types/car'
import { baseUrl } from '@/utils/base-url'
import { mande } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const api = mande(baseUrl('/garage'))

export const useGarageStore = defineStore('garage', () => {
  const cars = ref<Car[]>([])
  const error = ref<unknown>()

  const handleError = (err: unknown) => (error.value = err)

  const loadCars = () =>
    api
      .get<Car[]>()
      .then(data => (cars.value = data))
      .catch(handleError)

  const createCar = (car: CarDto) =>
    api.post(car).then(loadCars).catch(handleError)

  return { loadCars, createCar, cars }
})
