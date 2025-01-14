<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'
import Car from '@/components/AppCar.vue'

const winners = useWinnersStore()

winners.loadWinners()
</script>

<template>
  <div>
    <div
      class="winner"
      v-for="winner of winners.data"
      :key="winner.id"
    >
      {{ winner.id }} {{ winner.name }} -
      {{ winner.time.toFixed(2) }} - {{ winner.wins }} wins
      <Car v-bind="winner" />
    </div>
  </div>
</template>

<style scoped>
.winner {
  border-top: var(--color-background-soft) 5px solid;
  margin-top: 10px;
  padding-top: 4px;
}
</style>
