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

let animation: number | null = null
let startTime: number | null = null
let duration: number | null = null

const moveCar = (left: number) => {
  if (!car.value) {
    return
  }

  car.value.style.transform = `translateX(${left}px)`
}

const animate = (time: number) => {
  if (!startTime) {
    startTime = time
  }

  const runTime = time - startTime

  if (!duration) {
    return
  }

  const progress = runTime / duration

  const left = window.innerWidth * Math.min(progress, 1)

  moveCar(left)

  if (runTime > duration) {
    return
  }

  animation = requestAnimationFrame(animate)
}

const start = async () => {
  const info = await startEngine(props.id)

  duration = info.distance / info.velocity

  animation = requestAnimationFrame(animate)

  try {
    await driveCar(props.id)
    cancelAnimationFrame(animation)
  } catch (e) {
    console.error(e)
    cancelAnimationFrame(animation)
  }
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
