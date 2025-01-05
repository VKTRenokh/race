import { carsAmountPerPage } from '@/constants/cars-amount-per-page'
import { garage, paginateCars } from '@/services/garage'
import type { Car, CarDto } from '@/types/car'
import { createRandomCar } from '@/utils/create-random-car'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGarageStore = defineStore('garage', () => {
  const cars = ref<Car[]>([])
  const error = ref<unknown>()

  const page = ref(0)
  const total = ref<number>()

  const handleError = (err: unknown) => (error.value = err)

  const loadCars = () =>
    paginateCars(page.value, carsAmountPerPage)
      .then(data => {
        cars.value = data.cars
        total.value = data.total
      })
      .catch(handleError)

  const postCar = (car: CarDto) =>
    garage.post(car).catch(handleError)

  const deleteCar = (id: number) =>
    garage.delete(`/${id}`).catch(handleError)

  const editCar = (id: number, car: Partial<CarDto>) =>
    garage
      .put(`/${id}`, car)
      .then(loadCars)
      .catch(handleError)

  const generateRandomCars = () =>
    Promise.allSettled(
      Array.from({ length: 100 }, () =>
        postCar(createRandomCar())
      )
    )

  return {
    loadCars,
    postCar,
    deleteCar,
    editCar,
    generateRandomCars,
    cars,
    page,
    total
  }
})
