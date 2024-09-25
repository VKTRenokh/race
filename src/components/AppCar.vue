<script setup lang="ts">
import type { Car } from '../types/car'

const props = defineProps<Car>()
</script>

<template>
  <div>
    <h3>{{ props.name }}</h3>
    <div
      class="car"
      :style="{ backgroundColor: props.color }"
    ></div>
  </div>
</template>

<style scoped>
.car {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}
</style>
