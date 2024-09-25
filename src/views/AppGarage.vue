<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import AppCar from '@/components/AppCar.vue'

const garage = useGarageStore()

garage.loadCars()
</script>

<template>
  <h2>Garage</h2>

  <div v-for="car of garage.cars" :key="car.id">
    <app-car v-bind="car" />
  </div>
</template>
