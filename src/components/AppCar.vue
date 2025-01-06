<script setup lang="ts">
import {
  reactive,
  toRefs,
  ref,
  getCurrentInstance,
  inject,
  watchEffect
} from 'vue'
import type { Car } from '../types/car'
import { startEngine, driveCar } from '@/services/engine'
import { RACE_INFO_KEY } from '@/constants/race-info-key'
import { resetAbortReason } from '@/constants/reset-abort-reason'

const props = defineProps<Car & { controls?: boolean }>()

const car = ref<HTMLElement>()

const raceInfo = inject(RACE_INFO_KEY)

const isBroken = ref(false)
const isDriving = ref(false)

let controller: AbortController

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'edit'): void
}>()

const carSize = 50

const style = reactive({
  backgroundColor: props.color,
  width: `${carSize}px`,
  height: `${carSize}px`
})

const instance = getCurrentInstance()

// TODO: refactor this mess
let animation: number | null = null
let startTime: number | null = null
let duration: number | null = null

const moveCar = (left: number) => {
  if (!car.value) {
    return
  }

  car.value.style.transform = `translateX(${left}px)`
}

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

  moveCar(calculateLeft(progress, element.clientWidth))

  if (runTime > duration) {
    return
  }

  animation = requestAnimationFrame(animate)
}

const reset = () => {
  controller.abort(resetAbortReason)

  if (!animation) {
    return
  }

  cancelAnimationFrame(animation)
}

const handleReset = () => {
  moveCar(0)

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
  if (!raceInfo?.isRacing) {
    return
  }

  raceInfo.finish(props)
}

const start = async () => {
  controller = raceInfo?.controller ?? new AbortController()

  isDriving.value = true

  const info = await startEngine(props.id)

  duration = info.distance / info.velocity

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
    <h3 class="car-name">{{ props.name }}</h3>
    <div class="car" :style ref="car"></div>
  </div>
  <div
    class="controls"
    :style="{ opacity: raceInfo?.isRacing ? 0 : undefined }"
    v-if="props.controls"
  >
    <button :enabled="isDriving" @click="emit('edit')">
      Edit
    </button>
    <button @click="emit('delete')">Delete</button>
    <button :disabled="isDriving" @click="start">
      Start
    </button>
    <button @click="reset">Reset</button>
  </div>
</template>

<style scoped>
.car {
  border-radius: 25%;
  margin: 0.2rem 0;
}

.broken {
  .car-name {
    color: rgba(194, 15, 15, 1);
  }
}
</style>
