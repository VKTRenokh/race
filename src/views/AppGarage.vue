<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import { useWinnersStore } from '@/stores/winners'
import AppCar from '@/components/AppCar.vue'
import CreateCarForm from '@/components/CreateCarForm.vue'
import type { Car } from '@/types/car'
import {
  ref,
  reactive,
  provide,
  watch,
  computed
} from 'vue'
import Pagination from '@/components/Pagination.vue'
import type { RaceInfo } from '@/types/race-info'
import { RACE_INFO_KEY } from '@/constants/race-info-key'
import { resetAbortReason } from '@/constants/reset-abort-reason'
import { carsAmountPerPage } from '@/constants/cars-amount-per-page'

const selectedCar = ref<Car>()

const garage = useGarageStore()
const winners = useWinnersStore()

const finishers = ref<Car[]>([])

const winner = computed(() => finishers.value[0])

const raceInfo = reactive<RaceInfo>({
  isRacing: false,
  finish: car => {
    finishers.value.push(car)

    if (finishers.value.length !== 1) {
      return
    }

    winners.add({ id: car.id, wins: 1, time: 1 })
  }
})

provide(RACE_INFO_KEY, raceInfo)

garage.loadCars()

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

  finishers.value = []

  raceInfo.isRacing = false
}

watch(
  () => garage.page,
  () => {
    garage.loadCars()
    reset()
  }
)
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

        <pagination v-model="garage.page" />

        <button
          class="btn"
          @click="startRace"
          :disabled="raceInfo.isRacing"
        >
          Race
        </button>

        <button class="btn" @click="reset">Reset</button>
      </div>
    </div>

    <div class="car-list">
      <h2>
        {{ garage.total }} Cars ({{ carsAmountPerPage }}
        per page)
      </h2>

      <div v-if="winner" class="text-important">
        {{ winner.name }} came first!
      </div>

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
