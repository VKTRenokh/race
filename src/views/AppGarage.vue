<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'

const garage = useGarageStore()
</script>

<template>
  <h2>Garage</h2>

  <button @click="garage.log">button</button>
</template>
