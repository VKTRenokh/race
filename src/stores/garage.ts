import { garage } from '@/services/garage'
import type { Car, CarDto } from '@/types/car'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGarageStore = defineStore('garage', () => {
  const cars = ref<Car[]>([])
  const error = ref<unknown>()

  const handleError = (err: unknown) => (error.value = err)

  const loadCars = () =>
    garage
      .get<Car[]>()
      .then(data => (cars.value = data))
      .catch(handleError)

  const postCar = (car: CarDto) =>
    garage.post(car).catch(handleError)

  const deleteCar = (id: number) =>
    garage.delete(`/${id}`).catch(handleError)

  const editCar = (id: number, car: Partial<CarDto>) =>
    garage
      .put(`/${id}`, car)
      .catch(handleError)
      .then(loadCars)

  const paginateCars = (
    page: number,
    carsPerPage: number
  ) => {
    const startIndex = page * carsPerPage

    return cars.value.slice(
      startIndex,
      startIndex + carsPerPage
    )
  }

  return {
    loadCars,
    postCar,
    deleteCar,
    editCar,
    paginateCars,
    cars
  }
})
