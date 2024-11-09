<script setup lang="ts">
import { reactive } from 'vue'
import type { Car } from '../types/car'

const props = defineProps<Car & { controls?: boolean }>()

const style = reactive({ backgroundColor: props.color })
</script>

<template>
  <div>
    <h3>{{ props.name }}</h3>
    <div class="car" :style></div>
  </div>
</template>

<style scoped>
.car {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}
</style>
