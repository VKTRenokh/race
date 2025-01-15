<script setup lang="ts">
import {
  computed,
  toRefs,
  ref,
  getCurrentInstance,
  inject,
  watchEffect
} from 'vue'
import type { Car } from '../types/car'
import {
  startEngine,
  driveCar,
  type StartEngineResponse
} from '@/services/engine'
import { RACE_INFO_KEY } from '@/constants/race-info-key'
import { resetAbortReason } from '@/constants/reset-abort-reason'

const props = defineProps<Car & { controls?: boolean }>()

const raceInfo = props.controls
  ? inject(RACE_INFO_KEY)
  : null

const isBroken = ref(false)
const isDriving = ref(false)

const left = ref(0)

let controller: AbortController

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()

const carSize = 50

const style = computed(() => ({
  backgroundColor: props.color,
  width: `${carSize}px`,
  height: `${carSize}px`,
  transform: `translate(${left.value}px)`
}))

const instance = getCurrentInstance()

// TODO: refactor this mess
let animation: number | null = null
let startTime: number | null = null
let duration: number | null = null

const calculateLeft = (
  progress: number,
  clientWidth: number
) =>
  (window.innerWidth -
    (window.innerWidth - clientWidth) -
    carSize * 2) *
  Math.min(progress, 1)

const animate = (time: number) => {
  if (!startTime) {
    startTime = time
  }

  const runTime = time - startTime

  if (!duration) {
    return
  }

  const progress = runTime / duration

  if (!instance?.parent?.vnode?.el) {
    return
  }

  const element = instance.parent.vnode.el

  left.value = calculateLeft(progress, element.clientWidth)

  if (runTime > duration) {
    return
  }

  animation = requestAnimationFrame(animate)
}

const reset = () => {
  controller.abort(resetAbortReason)
  handleReset()

  if (!animation) {
    return
  }

  cancelAnimationFrame(animation)
}

const handleReset = () => {
  left.value = 0

  isBroken.value = false
  isDriving.value = false

  animation = null
  startTime = null
  duration = null
}

const handleError = (e: unknown) => {
  if (!animation) {
    return
  }

  cancelAnimationFrame(animation)

  if (e === resetAbortReason) {
    handleReset()
    return
  }

  isBroken.value = true
}

const handleFinish = () => {
  if (!raceInfo?.isRacing || !duration) {
    return
  }

  raceInfo.finish(props, duration / 1000)
}

const calculateDuration = (response: StartEngineResponse) =>
  response.distance / response.velocity

const start = async () => {
  controller = raceInfo?.controller ?? new AbortController()

  isDriving.value = true

  const response = await startEngine(props.id)

  duration = calculateDuration(response)

  animation = requestAnimationFrame(animate)

  try {
    await driveCar(props.id, controller.signal)

    cancelAnimationFrame(animation)

    handleFinish()
  } catch (e) {
    handleError(e)
  } finally {
    isDriving.value = false
  }
}

watchEffect(() => {
  if (!raceInfo) {
    return
  }

  const info = toRefs(raceInfo)

  if (!info.isRacing.value) {
    handleReset()
    return
  }

  start()
})
</script>

<template>
  <div :class="{ broken: isBroken }">
    <h3 v-if="props.controls" class="car-name">
      {{ props.name }}
    </h3>
    <div class="car" :style />
  </div>
  <div
    class="controls"
    :style="{ opacity: raceInfo?.isRacing ? 0 : undefined }"
    v-if="props.controls"
  >
    <button
      class="btn"
      :enabled="isDriving"
      @click="emit('edit')"
    >
      Edit
    </button>
    <button class="btn" @click="emit('delete')">
      Delete
    </button>
    <button
      class="btn"
      :disabled="isDriving"
      @click="start"
    >
      Start
    </button>
    <button class="btn" @click="reset">Reset</button>
  </div>
</template>

<style scoped>
.car {
  border-radius: 25%;
  margin: 0.2rem 0;
}

.controls {
  display: flex;
  gap: 0.3rem;
  margin: 0.5rem 0;
  transition: opacity ease 0.3s;

  .btn {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

.broken {
  .car-name {
    color: rgba(194, 15, 15, 1);
  }
}
</style>
