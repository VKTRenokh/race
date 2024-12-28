<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import AppCar from '@/components/AppCar.vue'
import CreateCarForm from '@/components/CreateCarForm.vue'
import { createRandomCar } from '@/utils/create-random-car'
import type { Car } from '@/types/car'
import { ref } from 'vue'

const selectedCar = ref<Car>()

const garage = useGarageStore()

garage.loadCars()

const generateRandomCars = async () => {
  await Promise.allSettled(
    Array.from({ length: 100 }, () =>
      garage.postCar(createRandomCar())
    )
  )

  await garage.loadCars()
}

const deleteCar = (id: number) =>
  garage.deleteCar(id).then(garage.loadCars)

const selectCar = (car: Car) => (selectedCar.value = car)
</script>

<template>
  <div class="garage-container">
    <create-car-form :selected-car />

    <button
      @click="generateRandomCars()"
      title="generates 100 random cars"
      class="btn"
    >
      Create random cars
    </button>

    <div class="car-list">
      <app-car
        v-for="car of garage.cars"
        :key="car.id"
        v-bind="car"
        controls
        @delete="deleteCar(car.id)"
        @edit="selectCar(car)"
      />
    </div>
  </div>
</template>

<style scoped>
.car-list {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}
</style>
