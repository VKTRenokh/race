<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'

const garage = useGarageStore()

garage.loadCars()
</script>

<template>
  <h2>Garage</h2>
</template>
