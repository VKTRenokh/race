<script setup lang="ts">
import type { WinnerCar } from '@/types/winners'
import Car from '@/components/AppCar.vue'

const props = defineProps<WinnerCar>()
</script>

<template>
  <div class="winner">
    {{ props.id }} {{ props.name }} -
    {{ props.time.toFixed(2) }} - {{ props.wins }} wins

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
