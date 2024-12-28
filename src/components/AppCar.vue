<script setup lang="ts">
import { reactive } from 'vue'
import type { Car } from '../types/car'

const props = defineProps<Car & { controls?: boolean }>()
const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()

const style = reactive({ backgroundColor: props.color })
</script>

<template>
  <div>
    <h3>{{ props.name }}</h3>
    <div class="car" :style></div>
  </div>
  <div class="controls" v-if="props.controls">
    <button @click="emit('edit')">Edit</button>
    <button @click="emit('delete')">Delete</button>
  </div>
</template>

<style scoped>
.car {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}
</style>
