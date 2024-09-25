<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import AppCar from '@/components/AppCar.vue'
import CreateCarForm from '@/components/CreateCarForm.vue'

const garage = useGarageStore()

garage.loadCars()
</script>

<template>
  <div class="garage-container">
    <create-car-form />

    <div class="car-list">
      <app-car
        v-for="car of garage.cars"
        :key="car.id"
        v-bind="car"
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
