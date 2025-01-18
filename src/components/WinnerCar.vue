<script setup lang="ts">
import type { WinnerCar } from '@/types/winners'
import Car from '@/components/AppCar.vue'
import { computed } from 'vue'

const props = defineProps<WinnerCar>()

const time = computed(() => props.time.toFixed(2))
</script>

<template>
  <div class="winner">
    <h4>
      <span class="green">{{ props.id }}</span>
      {{ props.name }}
    </h4>
    <span
      >{{ props.wins }} wins - best time {{ time }}</span
    >

    <car
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

  .green {
    padding: 0.1rem;
  }
}
</style>
