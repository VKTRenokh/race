<script setup lang="ts">
import type { WinnerCar } from '@/types/winners'
import Car from '@/components/AppCar.vue'
import { computed } from 'vue'

const props = defineProps<WinnerCar>()

const time = computed(() => props.time.toFixed(2))
</script>

<template>
  <div class="winner">
    {{ props.id }} {{ props.name }} - {{ time }} -
    {{ props.wins }} wins

    <Car
      :name="props.name"
      :color="props.color"
      :id="props.id"
    />
  </div>
</template>

<style scoped>
.winner {
  border-top: var(--color-background-soft) 5px solid;
  margin-top: 10px;
  padding-top: 4px;
}
</style>
