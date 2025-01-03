<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import AppCar from '@/components/AppCar.vue'
import CreateCarForm from '@/components/CreateCarForm.vue'
import type { Car } from '@/types/car'
import { ref, computed, reactive, provide } from 'vue'
import Pagination from '@/components/Pagination.vue'
import type { RaceInfo } from '@/types/race-info'
import { RACE_INFO_KEY } from '@/constants/race-info-key'
import { resetAbortReason } from '@/constants/reset-abort-reason'

const carsAmountPerPage = 7

const selectedCar = ref<Car>()

const garage = useGarageStore()

const currentPage = ref(0)

const finishers: Car[] = []

const raceInfo = reactive<RaceInfo>({
  isRacing: false,
  finish: car => {
    if (finishers.length === 0) {
      console.log(`${car.name} finished first!`)
    }
    finishers.push(car)
  }
})

// TODO: rename this dumb race info key
provide(RACE_INFO_KEY, raceInfo)

garage.loadCars()

const cars = computed(() =>
  garage.paginateCars(currentPage.value, carsAmountPerPage)
)

const generateRandomCars = async () => {
  await garage.generateRandomCars()

  await garage.loadCars()
}

const deleteCar = (id: number) =>
  garage.deleteCar(id).then(garage.loadCars)

const selectCar = (car: Car) => (selectedCar.value = car)

const startRace = () => {
  raceInfo.isRacing = true
  raceInfo.controller = new AbortController()
}

const reset = () => {
  if (!raceInfo.controller) {
    return
  }

  raceInfo.controller.abort(resetAbortReason)

  raceInfo.isRacing = false
}
</script>

<template>
  <div class="garage-container">
    <div class="controls">
      <create-car-form :selected-car />

      <div>
        <button
          @click="generateRandomCars()"
          title="generates 100 random cars"
          class="btn"
        >
          Create random cars
        </button>

        <pagination v-model="currentPage" />

        <button class="btn race" @click="startRace">
          Race
        </button>

        <button class="btn" @click="reset">Reset</button>
      </div>
    </div>

    <div class="car-list">
      <h2>
        {{ garage.getCarsAmount() }} Cars ({{
          carsAmountPerPage
        }}
        per page)
      </h2>

      <app-car
        v-for="car of cars"
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

.controls {
  display: flex;
  align-items: start;
  margin: 2rem 0;
  gap: 1rem;
}

.btn {
  margin: 0.6rem 0;
  margin-right: 0.4rem;
}
</style>
