<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Car } from '../types/car'
import { startEngine, driveCar } from '@/services/engine'

const props = defineProps<Car & { controls?: boolean }>()

const car = ref<HTMLElement>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()

const style = reactive({ backgroundColor: props.color })

const start = async () => {
  const info = await startEngine(props.id)

  const time = info.distance / info.velocity

  const x = await driveCar(props.id)
}
</script>

<template>
  <div>
    <h3>{{ props.name }}</h3>
    <div class="car" :style ref="car"></div>
  </div>
  <div class="controls" v-if="props.controls">
    <button @click="emit('edit')">Edit</button>
    <button @click="emit('delete')">Delete</button>
    <button @click="start">Start</button>
  </div>
</template>

<style scoped>
.car {
  width: 50px;
  height: 50px;
  border-radius: 25%;
}
</style>
