<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import AppCar from '@/components/AppCar.vue'
import CreateCarForm from '@/components/CreateCarForm.vue'

const garage = useGarageStore()

garage.loadCars()
</script>

<template>
  <create-car-form />
  <div class="car-list">
    <app-car
      v-for="car of garage.cars"
      :key="car.id"
      v-bind="car"
    />
  </div>
</template>

<style scoped>
.car-list {
  display: flex;
  flex-direction: column;
}
</style>
